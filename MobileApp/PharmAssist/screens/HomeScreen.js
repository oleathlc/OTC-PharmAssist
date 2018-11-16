import React from 'react';
import { Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity,View,} from 'react-native';
import MyMeds from '../components/MyMeds';
import { MonoText } from '../components/StyledText';
import moment from 'moment';
import { Notifications } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'PharmAssist'
  };
  constructor(props){
    super(props);
    this.state = {
    }
  }
  async componentDidMount() {
    Notifications.addListener(this._handleNotification);
  }
  _handleNotification = ({ origin, data }) => {
    console.info(`Notification (${origin}) with data: ${JSON.stringify(data)}`);
  };
  parseCode(code) {
    //Splits the long code into each separate drug code and for each one gets the drug name, dose and times taken each day. Each drug is added into an array which is then returned
    const drugList = ["Ibuprofen 200mg","Citalopram 10mg","Diclofenac 25mg","Atorvastatin 40mg","Amoxicillin 250mg","Paracetamol 500mg","Amlodipine 5mg","Metformin 850mg","Codeine 15mg","Bisoprolol 2.5mg","Aspirin 75mg"];
    var medList = code.split(",")
    console.log(medList);
    var medArray = []
    medList.map((item) => {
        var split = item.split("-")
        var drugCode = parseInt(split[0].substring(0,2))
        medArray.push(drugList[drugCode]+"\n"+this.getTimes(split[1]))
    })
    return medArray;
  }
  parseDictCode(code) {
    //Creates a dictionary of drugs and times etc. in order of time of day
    const drugList = ["Ibuprofen 200mg","Citalopram 10mg","Diclofenac 25mg","Atorvastatin 40mg","Amoxicillin 250mg","Paracetamol 500mg","Amlodipine 5mg","Metformin 850mg","Codeine 15mg","Bisoprolol 2.5mg","Aspirin 75mg"];
    var medList = code.split(",")
    var medsDict = {};
    medList.map((item) => { //AM meds added
        var split = item.split("-")
        var drugCode = parseInt(split[0].substring(0,2))
        if (split[1].substring(0,1) == '1'){
          medsDict[item+"1"] = {Drug: drugList[drugCode],Times: 3,Taken: false}
        }
      })
    medList.map((item) => { //Afternoon meds added
        var split = item.split("-")
        var drugCode = parseInt(split[0].substring(0,2))
        if (split[1].substring(1,2) == '1'){
          medsDict[item+"2"] = {Drug: drugList[drugCode],Times: 4,Taken: false}
        }
      })
    medList.map((item) => { //Evening meds added
        var split = item.split("-")
        var drugCode = parseInt(split[0].substring(0,2))
        if (split[1].substring(2,3) == '1'){
          medsDict[item+"3"] = {Drug: drugList[drugCode],Times: 5,Taken: false}
        }
      })
    medList.map((item) => { //PM meds added
        var split = item.split("-")
        var drugCode = parseInt(split[0].substring(0,2))
        if (split[1].substring(3,4) == '1'){
          medsDict[item+"4"] = {Drug: drugList[drugCode],Times: 6,Taken: false}
        }
      })
    console.log(medsDict);
    return medsDict;
  }
  getTimes(code) {
    //Depending on what the code is, returns an appropriate message for when the med is taken
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
  createNotifications(array,settings){
    // loop through the the meds and set up a notification object for each one and add it to an array which is then returned
    // Time is hardcoded
    notifications = []
    for(key in array){
      var notification = {
        title: 'Medication due!',
        body: 'Time to take your ' + array[key].Drug, // (string) — body text of the notification.
        ios: { // (optional) (object) — notification configuration specific to iOS.
          sound: settings[0] // (optional) (boolean) — if true, play a sound. Default: false.
        },
        android: // (optional) (object) — notification configuration specific to Android.
        {
          sound: settings[0], // (optional) (boolean) — if true, play a sound. Default: false.
          priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
          sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
          vibrate: settings[1] // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
          // link (optional) (string) — external link to open when notification is selected.
        }
      }
      var getSec = moment(settings[array[key].Times], "hh:mm a").valueOf() - moment().startOf('day').valueOf()//Time of day in ms
      var today = new Date(new Date().setHours(0,0,0,0))
      var setTime = today.getTime() + getSec
      var now = new Date().getTime()
      var alertTime = (setTime > now) ? setTime: setTime + 86400000 //If current time is after the alert time - pushes it to next day
      console.log(alertTime)
      var schedulingOptions = {
        time: alertTime,
        //(new Date()).getTime() + 5000, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
        repeat: 'day',
      };
      notifications.push({message: notification, time: schedulingOptions})
    }
    //console.log(notifications);
    return notifications
  };
  render() {
    var qrCode = this.props.navigation.getParam('qrCode', null); //Set to null if QR code not passed from scanner
    var notificationSettings = this.props.navigation.getParam('Settings', null); //Set to null if settings not saved
    //A view to prompt the user to scan in a QR code (contains a touch button to bring them to the scanner screen instead of pressing the icon at the bottom of screen)
    var promptToScan = <View><Text style={styles.noCode}>Please scan a QR code to add your prescription
    information and set up reminders for your medication {"\n"} To scan a QR code, click</Text>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Links')}>
        <Text style={styles.link}>Here</Text></TouchableOpacity>
      <Text style={styles.noCode}>or alternatively, click the 'Scanner' button at the bottom of the screen</Text></View>;

    // User will be greeted with either a request to modify notification settings or the prompt to scan a QR code
    var initialScreen = (notificationSettings != null) ? promptToScan :
      <View><Text style={styles.noSettings}>Welcome to the PharmAssist App!{"\n"}
      Before reminders can be created, please personalise how you would like
      them to appear by clicking</Text>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
        <Text style={styles.link}>Here</Text></TouchableOpacity>
      <Text style={styles.noSettings}>or alternatively, click the 'Settings' button at
      the bottom of the screen</Text></View>;

    var numDays = (qrCode != null) ? // Gets the prescription timeframe from the code
        parseInt(qrCode.substring(0,2)) : null;
    const endDate = moment(new Date).add(numDays,'days')//.format('DD-MM-YY') // Sets the end date for the notifications
    var medList = (qrCode != null) ? //Cuts out the list of drug codes from the QR code
        qrCode.substring(3,qrCode.length-1) : null;
    var medArray = (qrCode != null) ? //Calls the parseCode function to get the information for each drug
        this.parseCode(medList) : null;
    var medDict = (qrCode != null) ? //Calls the parseCode function to get the information for each drug
        this.parseDictCode(medList) : null;
    //Displays each drug and the associated information on screen once a QR code has been scanned in
    var patientView = (qrCode != null) ?
    <View style={styles.medsContainer}>
    {/* //First scrollbox */}
    <Text>My meds</Text>
    <View style={styles.upcomingContainer1}>
        <ScrollView style={styles.meds}>
        {(medDict != null) ? Object.keys(medDict).map(function(item) {
        console.log(medDict[item]);
        //These need to be sorted, currently order in dict
        return <Text style={styles.item}>{medDict[item].Drug+" "+notificationSettings[medDict[item].Times]}</Text>
        }) : null}
        </ScrollView>
      </View>
      {/* //Second scrollbox */}
      <Text>My prescription</Text>
    <View style={styles.upcomingContainer2}>
        <ScrollView style={styles.meds}><Text>{qrCode}</Text>
        <Text>Prescription End Date: {endDate.format('DD-MM-YY')}</Text>
        {(medArray != null) ? medArray.map((item) => {
          return <Text key={item} style={styles.item}>{item}</Text>
        }) : null}
        </ScrollView>
      </View>
      </View> : null;
        console.log(medArray);
        console.log(notificationSettings);
    // Once a QR code is scanned in, the below code sets up notifications for each medication which will be active until the prescription end date
    var localNotifications = []
    let t = new Date();
    if (qrCode != null){
      //var notificationArray = this.parseNotifications(medList);
      if (t < endDate){
        localNotifications = this.createNotifications(medDict, notificationSettings)
        localNotifications.map((item) => {
          Notifications.scheduleLocalNotificationAsync(item.message, item.time);
        })
      }
    }
    if (t > endDate){
      Notifications.cancelAllScheduledNotificationsAsync();
    }

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
  medsContainer: {
    flex: 1,
    paddingTop: 30,
  },
  upcomingContainer1: {
    paddingRight: 20,
    paddingLeft: 20,
    height: 200,
  },
  upcomingContainer2: {
    paddingRight: 20,
    paddingLeft: 20,
    height: 200,
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
