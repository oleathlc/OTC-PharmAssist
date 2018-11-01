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
    var numDays = (qrCode != null) ? 
        parseInt(qrCode.substring(0,2)) : null;
    const endDate = moment(new Date).add(numDays,'days').format('DD-MM-YY')
    var medList = (qrCode != null) ? 
        qrCode.substring(3,qrCode.length-1) : null;
    var medArray = (qrCode != null) ?
        this.parseCode(medList) : null;
    var patientView = (qrCode != null) ?
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}><Text>{qrCode}</Text><Text>Prescription End Date: {endDate}</Text>
        {(medArray != null) ? medArray.map((item) => {
          return <Text key={item} style={styles.item}>{item}</Text>
        }) : null}
        </ScrollView> : <Text style={styles.noCode}>Please scan a QR code to add your prescription information and to set up reminders for your medication</Text> ;
    return (
      <View style={styles.container}>
        {patientView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  noCode: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    flexDirection: 'column',
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
      backgroundColor: '#d2f7f1'
   }
});
