import React from 'react';
import { Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity,View,} from 'react-native';
import { MonoText } from '../components/StyledText';
import moment from 'moment';
import { Notifications } from 'expo';


export default class AlertScreen extends React.Component {
  static navigationOptions = {
    title: 'Reminder',
  };
  render() {
    return (
      <View>
      <Text> Alert area </Text>
      <Button
            color='#15b23a'
            title="I have taken my medication"
            onPress={() => this.props.navigation.navigate('Home'
          )}/>
      <Button
            color='#ed952a'
            title="I will take my medication later"
            onPress={() => this.props.navigation.navigate('Home'
          )}/>
      </View>
    );
  };
}
