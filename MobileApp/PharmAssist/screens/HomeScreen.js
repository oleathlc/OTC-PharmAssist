import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MyMeds from '../components/MyMeds';
import { MonoText } from '../components/StyledText';
import moment from 'moment';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'PharmAssist'
  };
  constructor(props){
    super(props);
    const currentDate = moment(new Date);

    this.state = {
    }
  }

  render() {
    const qrCode = this.props.navigation.getParam('qrCode', null);
    const patientView = (qrCode != null) ?
        <View><MyMeds qrCode={qrCode}/><Text>{qrCode}</Text></View> : null ;
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
  contentContainer: {
    paddingTop: 30,
  },
  
});
