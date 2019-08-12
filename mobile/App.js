import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function App(){
  return(
    <View style={styles.container}>
      <Text style={styles.centered_text}>Hello, World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  centered_text: {
    color: '#ffffff',
    fontWeight: "bold",
    fontSize: 20
  }
});

