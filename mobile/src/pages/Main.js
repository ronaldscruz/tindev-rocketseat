import React, {useEffect, useState} from 'react';
import {
   SafeAreaView,
   View,
   Image,
   TouchableOpacity,
   StyleSheet,
   Text
} from 'react-native';

import api from '../services/api';
// import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';

import logo from "../assets/logo.png";
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from "../assets/itsamatch.png";

export default function Main({navigation}){
   const [devs, setDevs] = useState([]);
   const [matchDev, setMatchDev] = useState(null);

   const user_id = navigation.getParam("user_id");

   useEffect(() => {
      async function loadDevs(){
         const api_response = await api.get("devs", {
            headers: {
               user_id
            }
         });
   
         setDevs(api_response.data);
      }

      loadDevs();
   }, [user_id]);

   useEffect(() => {
      const socket = io("http://localhost:3333", {
         query: { user_id: user_id }
      });

      socket.on("match", dev => {
         setMatchDev(dev);
      });

   }, [user_id]);

   async function handleLike(){
      const [ dev, ...rest ] = devs;

      if(dev && rest){
         await api.post(`devs/${dev._id}/likes`, null, {
            headers: {
               user_id
            }
         })

         setDevs(rest);
      }
      
   }

   async function handleDislike(){
      const [ dev, ...rest ] = devs;

      if(dev && rest){
         await api.post(`devs/${dev._id}/dislikes`, null, {
            headers: {
               user_id
            }
         })

         setDevs(rest);
      }

      setDevs(rest);
   }

   async function handleLogout(){
      // AsyncStorage.clear();
      navigation.navigate('Login');
   }

   return(
      <SafeAreaView style={styles.main_container} >
         <TouchableOpacity onPress={handleLogout}>
            <Image style={styles.logo} source={logo} />
         </TouchableOpacity>

         <View style={styles.cards_container}>
            {
               devs.length > 0 ? 
               (
                  devs.map((dev, index) => (
                     <View style={[styles.card, {zIndex: devs.length - index }]} key={dev._id} >
                        <Image style={styles.avatar} source={{uri: dev.avatar}}/>
                        <View style={styles.footer}>
                           <Text style={styles.name}>{dev.name}</Text>
                           <Text style={styles.bio} numberOfLines={3} >{dev.bio}</Text>
                        </View>
                     </View>
                  ))
               )
               :
               (
                  <Text style={styles.empty}>Acabou :(</Text>
               )
            }
         </View>
         
         <View style={styles.buttons_container} >
            <TouchableOpacity style={styles.button} onPress={handleLike} >
               <Image source={like}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDislike} >
               <Image source={dislike}/>
            </TouchableOpacity>
         </View>

         {matchDev && (
            <View style={styles.match_container}>
               <Image style={styles.itsamatch_img} source={itsamatch}/>
               <Image style={styles.match_avatar} source={{uri: matchDev.avatar}}/>
               <Text style={styles.match_name}>{matchDev.name}</Text>
               <Text style={styles.match_bio}>{matchDev.bio}</Text>
               <TouchableOpacity onPress={() => setMatchDev(null)}>
                  <Text style={styles.close_match}>LEGAL!</Text>
               </TouchableOpacity>
            </View>
         )}
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      alignItems: "center",
      justifyContent: "space-between",
   }, 

   logo: {
      marginTop: 30
   },

   cards_container: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      maxHeight: 500
   },

   card: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      margin: 30,
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
   },

   avatar: {
      flex: 1,
      height: 300,
      backgroundColor: "#fff"
   },

   footer: {
      backgroundColor: "#fff",
      paddingHorizontal: 15,
      paddingVertical: 15,

   },

   name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "#333"
   },

   bio: {
      fontSize: 14,
      color: "#999",
      marginTop: 5,
      lineHeight: 18
   },

   buttons_container: {
      flexDirection: 'row',
      marginBottom: 30,    
   },

   button: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#fff",
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 2,
      shadowOffset: {
         width: 0,
         height: 2
      }
   },

   empty: {
      alignSelf: "center",
      color: "#999",
      fontSize: 24,
      fontWeight: 'bold'
   },

   match_container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 255,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
   },

   itsamatch_img: {
      height: 60,
      resizeMode: 'contain'
   },

   match_avatar: {
      width: 160,
      height: 160,
      borderRadius: 80,
      borderWidth: 5,
      borderColor: "#fff",
      marginVertical: 30,
      backgroundColor: "#fff",
   },

   match_name: {
      fontSize: 26,
      fontWeight: "bold",
      color: "#fff"
   },

   match_bio: {
      marginTop: 10,
      fontSize: 16,
      color: "rgba(255, 255, 255, 0.8)",
      lineHeight: 24,
      textAlign: "center",
      paddingHorizontal: 30
   },

   close_match: {
      fontSize: 16,
      color: "rgba(255, 255, 255, 0.8)",
      textAlign: "center",
      marginTop: 30,
      fontWeight: 'bold'
   }
})