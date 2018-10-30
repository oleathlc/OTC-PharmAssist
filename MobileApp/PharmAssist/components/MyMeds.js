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
    this.state = {
      days : null,
      qrCode : null
    }
  }

  componentDidUpdate() {
      render()
      this.parseCode(this.props.qrCode);
  }
  
  parseCode(code) {
      var numDays = parseInt(code.substring(0, 2));
      this.setState({
        qrCode:code,
        days:numDays 
      })
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
