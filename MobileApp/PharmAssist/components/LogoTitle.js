import React from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';

export default class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.name1}>Pharm</Text>
      <Image
        source={require('../assets/images/pill2.png')}
        style={styles.image}
      />
      <Text style={styles.name2}>Assist</Text>
      {/*<Image
        source={require('../assets/images/logoText.png')}
        style={styles.image2}
      />*/}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    paddingLeft: '25%',
  },
  name1: {
    fontSize:30,
    color:'#54B864'
  },
  name2: {
    fontSize:30,
    color:'#fff',
    textShadowColor:'black',
    textShadowOffset:{width: 0.25, height: 0.25},
    textShadowRadius: 1,
  },
  image: {
    height: 40,
    width:40,
  },
  image2: {
    height: 40,
  },
})
