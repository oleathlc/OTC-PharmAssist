import React from 'react';
import { Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity,View,} from 'react-native';
import MyMeds from '../components/MyMeds';
import { MonoText } from '../components/StyledText';
import moment from 'moment';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'PharmAssist'
  };
  constructor(props){
    super(props);
    this.state = {
    }
  }
  parseCode(code) {
    const drugList = ["Ibuprofen 200mg","Citalopram 10mg","Diclofenac 25mg","Atorvastatin 40mg","Amoxicillin 250mg","Paracetamol 500mg","Amlodipine 5mg","Metformin 850mg","Codeine 15mg","Bisoprolol 2.5mg","Aspirin 75mg"];
    var medList = code.split(",")
    var medArray = []
    medList.map((item) => {
        var split = item.split("-")
        var drugCode = parseInt(split[0].substring(0,2))
        medArray.push(drugList[drugCode]+"\n"+this.getTimes(split[1]))
    })
    return medArray;
  }
  getTimes(code) {
    var time;
    switch(code){
      case "1000":
        time = "Take once daily in the morning"
        break;
      case "0100":
        time = "Take once daily in the afternoon"
        break;
      case "0010":
        time = "Take once daily in the evening"
        break;
      case "0001":
        time = "Take once daily at night"
        break;
      case "1001":
        time = "Take twice daily in the morning and at night"
        break;
      case "1010":
        time = "Take once daily in the morning and in the evening"
        break;
      case "1100":
        time = "Take twice daily in the morning and in the afternoon"
        break;
      case "0110":
        time = "Take twice daily in the afternoon and in the evening"
        break;
      case "0101":
        time = "Take twice daily in the afternoon and at night"
        break;
      case "0011":
        time = "Take twice daily in the evening and at night"
        break;
      case "1101":
        time = "Take three times daily in the morning, in the afternoon and at night"
        break;
      case "1011":
        time = "Take three times daily in the morning, in the evening and at night"
        break;
      case "1110":
        time = "Take three times daily in the morning, in the afternoon and in the evening"
        break;
      case "0111":
        time = "Take three times daily in the afternoon, in the evening and at night"
        break;
      case "1111":
        time = "Take four times daily in the morning, in the afternoon, in the evening and at night"
        break;
    }
    return time
  }

  render() {
    var qrCode = this.props.navigation.getParam('qrCode', null);
    var notificationSettings = this.props.navigation.getParam('Settings', null);
    var promptToScan = <View><Text style={styles.noCode}>Please scan a QR code to add your prescription
      information and set up reminders for your medication {"\n"} To scan a QR code, click </Text>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Links')}>
        <Text style={styles.link}>Here</Text></TouchableOpacity>
      <Text style={styles.noCode}>or alternatively, click the 'Scanner' button at the bottom of the screen</Text></View>;
    var initialScreen = (notificationSettings != null) ? promptToScan : 
      <View><Text style={styles.noSettings}>Welcome to the PharmAssist App!{"\n"}
      Before reminders can be created, please personalise how you would like
      them to appear by clicking</Text>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
        <Text style={styles.link}>Here</Text></TouchableOpacity>
      <Text style={styles.noSettings}>or alternatively, click the 'Settings' button at
      the bottom of the screen</Text></View>;
    var numDays = (qrCode != null) ? 
        parseInt(qrCode.substring(0,2)) : null;
    const endDate = moment(new Date).add(numDays,'days').format('DD-MM-YY')
    var medList = (qrCode != null) ? 
        qrCode.substring(3,qrCode.length-1) : null;
    var medArray = (qrCode != null) ?
        this.parseCode(medList) : null;
    var patientView = (qrCode != null) ?
        <ScrollView style={styles.meds}><Text>{qrCode}</Text>
        <Text>Prescription End Date: {endDate}</Text>
        {(medArray != null) ? medArray.map((item) => {
          return <Text key={item} style={styles.item}>{item}</Text>
        }) : null}
        </ScrollView> : null;
    return (
      <View style={styles.container}>
        {(qrCode != null)? patientView : initialScreen}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  meds:{
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#00aaff',
    borderRadius: 5,
  },
  noSettings: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Roboto',
  },
  link: {
    textAlign: 'center',
    fontSize: 25,
    color: 'blue',
    fontFamily: 'Roboto',
  },
  noCode: {
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
    fontFamily: 'Roboto',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    fontSize: 20,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#80d4ff',
    fontFamily: 'Roboto',
   }
});
