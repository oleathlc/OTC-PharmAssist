import React from 'react';
import { Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity,View,} from 'react-native';
import { MonoText } from '../components/StyledText';
import moment from 'moment';
import { Notifications } from 'expo';
import LogoTitle from '../components/LogoTitle';


export default class AlertScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#d8d8d8',
    }
  };
  render() {
    var alertInfo = this.props.navigation.getParam('Info', null);
    var snoozeTime = this.props.navigation.getParam('Snooze', null);
    console.log(alertInfo)
    return (
      <View style={styles.medsContainer}>
      <Text style={styles.meddescriptionfont}>It's time to take your {"\n"} {alertInfo.Drug} </Text>
      <View style={{margin:10}}>
      <Button
            color='#15b23a'
            paddingBottom='5'
            title="Thanks, I have taken my medication"
            onPress={() => this.props.navigation.navigate('Home', {
              TakenMed:{Drug:alertInfo.Drug, Taken: true, Times: alertInfo.Times, Ind: alertInfo.Ind}}
          )}/>
      </View>
      <View style={{margin:10}}>
      <Button
            color='#ed952a'
            title="Remind me again later"
            onPress={() => this.props.navigation.navigate('Home', {
              MedInfo: alertInfo,
            })}
              />
      </View>
      </View>
    );
  };
}
const styles = StyleSheet.create({
  medsContainer: {
    flex: 1,
    padding: 50,
  },
  meddescriptionfont: {
    fontSize: 20,
    paddingBottom: 5,
    textAlign: 'center',
  }
});