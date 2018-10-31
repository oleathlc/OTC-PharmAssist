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
      qrCode : null,
    }
  }
  componentDidMount() {
  if (Platform.OS === 'android') {
    Expo.Notifications.createChannelAndroidAsync('reminders', {
          name: 'Reminders',
          priority: 'max',
          vibrate: [0, 250, 250, 250],
          sound: true,
        });
      }
    }
  parseCode(code) {
    const drugList = ["Ibuprofen","Citalopram","Diclofenac","Atorvastatin","Amoxicillin","Paracetamol","Amlodipine","Metformin","Codeine","Bisoprolol","Aspirin"];
    var medList = code.split(",")
    var medArray = []
    medList.map((item) => {
        var split = item.split("-")
        var drugCode = parseInt(split[0].substring(0,2))
        var drugStrength = split[0].substring(2)
        medArray.push(drugList[drugCode] + " " + drugStrength +"mg")
        medArray.push(this.getTimes(split[1]))
    })
    return medArray;
  }
  getTimes(code) {
    var time = "Take ";
    var number = 0;
    for (i=0; i<code.length;i++){
      if (code[i] == "1"){
        number+=1
      }
    }
    if (number == 1){
      time+= "once daily ("
    }
    else if (number == 2){
      time+= "twice daily ("
    }
    else if (number == 3){
      time+= "three times daily ("
    }
    else {
      time+= "four times daily ("
    }
    if (code[0] =='1'){
      time += "-Morning-"
    }
    if (code[1] =='1'){
      time += "-Afternoon-"
    }
    if (code[2] =='1'){
      time += "-Evening-"
    }
    if (code[3] =='1'){
      time += "-Night-"
    }
    time+=")"
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
        <View><Text>{qrCode}</Text><Text>Prescription End Date: {endDate}</Text>
        {(medArray != null) ? medArray.map((item) => {
          return <Text key={item}>{item}</Text>
        }) : null}
        </View> : null ;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {patientView}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
