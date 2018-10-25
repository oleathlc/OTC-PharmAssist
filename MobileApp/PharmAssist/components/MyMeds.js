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
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>My Next Medication</Text>
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
