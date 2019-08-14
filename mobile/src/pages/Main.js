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
import AsyncStorage from '@react-native-community/async-storage';

import logo from "../assets/logo.png";
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function Main({navigation}){
   const [devs, setDevs] = useState([]);

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
      AsyncStorage.clear();
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
   }
})