import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({navigation}){
	const [user, setUser] = useState('');

	async function handleLogin(user){
		const api_response = await api.post('devs', { username: user })
	}

   return(
		  	<KeyboardAvoidingView
				style={styles.login_container}
				behavior="padding"
				enabled={Platform.OS !== 'android'} 
			>
        	<Image source={logo}/>
			<TextInput 
				autoCapitalize="none"
				autoCorrect={false}
            placeholder="Digite seu usuário do GitHub"
            placeholderTextColor="#999"
				style={styles.gituser_input}
				value={user}
				onChange={setUser}
         />
         <TouchableOpacity style={styles.enter_button} onPress={handleLogin}>
				<Text style={styles.enter_button_text}>Entrar</Text>
        	</TouchableOpacity>   
     	</KeyboardAvoidingView> 
   );
}

const styles = StyleSheet.create({
   login_container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
   },

   gituser_input: {
      height: 46,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 4,
      marginTop: 20,
      paddingHorizontal: 15
   },

   enter_button: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#df4723',
		borderRadius: 4,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	
	enter_button_text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16
	}
})