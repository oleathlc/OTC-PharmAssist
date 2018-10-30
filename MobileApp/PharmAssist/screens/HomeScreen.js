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
  // ...
  if (Platform.OS === 'android') {
    Expo.Notifications.createChannelAndroidAsync('reminders', {
          name: 'Reminders',
          priority: 'max',
          vibrate: [0, 250, 250, 250],
          sound: true,
        });
      }
    }

  _createNotificationAsync = () => {
    Expo.Notifications.presentLocalNotificationAsync({
        title: 'Reminder',
        body: 'This is an important reminder!!!!',
        android: {
          channelId: 'reminders',
          color: '#FF0000',
        },
      });
    }
    parseCode(code) {
      const drugList = ["Ibuprofen","","Aspirin","Atorvastatin","Amoxicillin","","","","","Bisoprolol","Paracetamol"];
      var medList = code.split(",")
      var medArray = []
      medList.map((item) => {
          var split = item.split("-")
          var drugCode = parseInt(split[0].substring(0,2))
          var drugStrength = split[0].substring(2)
          medArray.push(drugList[drugCode] + " " + drugStrength +"mg")
          //medArray.push(split[0])
      })
      return medArray;
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
