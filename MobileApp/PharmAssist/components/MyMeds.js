import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import moment from 'moment';

export default class MyMeds extends React.Component {
  
  constructor(props){
    super(props);
    const currentDate = moment(new Date);//.format('DD-MM');
    const setDate = moment(new Date(2018,10,11));
    const timeDiff = setDate.diff(currentDate,'days');

    this.state = {
      days : timeDiff,
      initDate: currentDate.format('DD-MM'),
      endDate: setDate.format('DD-MM'),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>My Next Medication</Text>
        {/* Throw in an if statement below. If remaining days is 0 then
         nothing appears or a message to scan a QR code */}
        <Text>Remaining Days: {this.state.days}</Text>
        </ScrollView>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>My Medication</Text>
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
  contentContainer: {
    paddingTop: 30,
  },
});
