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
    var alertInfo = this.props.navigation.getParam('Info', "Nothing");
    console.log(alertInfo)
    return (
      <View>
      <Text>It is time to take your {alertInfo.Drug} </Text>
      <Button
            color='#15b23a'
            title="Thanks, I have taken my medication"
            onPress={() => this.props.navigation.navigate('Home', {
              TakenMed:{Drug:alertInfo.Drug, Taken: true, Times: alertInfo.Times, Ind: alertInfo.Ind}}
          )}/>
      <Button
            color='#ed952a'
            title="I will take my medication later"
            onPress={() => this.props.navigation.navigate('Home',{
              snoozeReminder: alertInfo,
            }
          )}/>
      </View>
    );
  };
}
