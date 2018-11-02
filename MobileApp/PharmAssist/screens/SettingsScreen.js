import React from 'react';
import {
  Image,
  CheckBox,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Picker,
  TouchableOpacity,
  View,
} from 'react-native';
// From https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props){
    super(props);
    // Settings array with defaults
    this.settings = [false,false,false,10,0,0,0,0];
    this.state = {
      ring:false,
      ping:false,
      vibrate:false,
      snooze:"",
      morning:"",
      afternoon:"",
      evening:"",
      bedtime:"",
      isDateTimePickerVisibleMorning: false,
      isDateTimePickerVisibleAfternoon: false,
      isDateTimePickerVisibleEvening: false,
      isDateTimePickerVisibleBedtime: false,
    }
  }


  // These are parameters for the time pickers (morning, afternoon, evening, bedtime)
  _showDateTimePickerMorning = () => this.setState({ isDateTimePickerVisibleMorning: true });
 
  _hideDateTimePickerMorning = () => this.setState({ isDateTimePickerVisibleMorning: false });
 
  _handleDatePickedMorning = (date) => {
    this.morningSelect(date)
    this._hideDateTimePickerMorning();
  };

  _showDateTimePickerAfternoon = () => this.setState({ isDateTimePickerVisibleAfternoon: true });
 
  _hideDateTimePickerAfternoon = () => this.setState({ isDateTimePickerVisibleAfternoon: false });
 
  _handleDatePickedAfternoon = (date) => {
    this.afternoonSelect(date)
    this._hideDateTimePickerAfternoon();
  };

  _showDateTimePickerEvening = () => this.setState({ isDateTimePickerVisibleEvening: true });
 
  _hideDateTimePickerEvening = () => this.setState({ isDateTimePickerVisibleEvening: false });
 
  _handleDatePickedEvening = (date) => {
    this.eveningSelect(date)
    this._hideDateTimePickerEvening();
  };

  _showDateTimePickerBedtime = () => this.setState({ isDateTimePickerVisibleBedtime: true });
 
  _hideDateTimePickerBedtime = () => this.setState({ isDateTimePickerVisibleBedtime: false });
 
  _handleDatePickedBedtime = (date) => {
    this.bedtimeSelect(date)
    this._hideDateTimePickerBedtime();
  };

  // These functions set values in settings array
  ringCheckbox()
  {
    this.setState({
      ring:!this.state.ring
    })
    this.settings[0] = !this.settings[0]
    // console.log(this.settings);

  }
  pingCheckbox()
  {
    this.setState({
    ping:!this.state.ping
    })
    this.settings[1] = !this.settings[1]
    // console.log(this.settings);
  }
  vibrateCheckbox()
  {
    this.setState({
    vibrate:!this.state.vibrate
    })
    this.settings[2] = !this.settings[2]
    // console.log(this.settings);
  }
  snoozeSelect(itemValue)
  {
    this.settings[3] = parseInt(itemValue)
    // console.log(this.settings);
  }
  morningSelect(date)
  {
    morningtime = moment(date).format('hh:mm a');
    this.settings[4] = morningtime
    // console.log(this.settings);
  }
  afternoonSelect(date)
  {
    afternoontime = moment(date).format('hh:mm a');
    this.settings[5] = afternoontime
    // console.log(this.settings);
  }
  eveningSelect(date)
  {
    eveningtime = moment(date).format('hh:mm a');
    this.settings[6] = eveningtime
    // console.log(this.settings);
  }
  bedtimeSelect(date)
  {
    bedtimetime = moment(date).format('hh:mm a');
    this.settings[7] = bedtimetime
    // console.log(this.settings);
  }
  
  render() {
  	return (
      <View style={styles.contentContainer}>
        <Text style={styles.subheaderfont}>
        Notifications alert
        </Text>
        <Text style={styles.settingsfont}>
        Ring
        </Text>
        <CheckBox value = {this.state.ring} onChange={() => this.ringCheckbox()}/>
        <Text style={styles.settingsfont}>
        Ping
        </Text>
        <CheckBox value = {this.state.ping} onChange={() => this.pingCheckbox()}/>
        <Text style={styles.settingsfont}>
        Vibrate
        </Text>
        <CheckBox value = {this.state.vibrate} onChange={() => this.vibrateCheckbox()}/>
        
        <Text style={styles.settingsfont}>
        Set snooze time
        </Text>
        <Picker
          selectedValue={this.state.snooze}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({snooze: itemValue},this.snoozeSelect(itemValue))}>
          <Picker.Item label="10" value="10" />
          <Picker.Item label="15" value="15" />
          <Picker.Item label="30" value="30" />
        </Picker>
        
        <Text style={styles.subheaderfont}>
        Update medication times
        </Text>

        <View style={styles.timebutton1}>
          <TouchableOpacity onPress={this._showDateTimePickerMorning}>
            <Text>Choose morning time</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisibleMorning}
            onConfirm={this._handleDatePickedMorning}
            onCancel={this._hideDateTimePickerMorning}
            mode={'time'}
          />
        </View>
        <View style={styles.timebutton2}>
          <TouchableOpacity onPress={this._showDateTimePickerAfternoon}>
            <Text>Choose afternoon time</Text>
          </TouchableOpacity>
          <DateTimePicker style={styles.timebutton}
            isVisible={this.state.isDateTimePickerVisibleAfternoon}
            onConfirm={this._handleDatePickedAfternoon}
            onCancel={this._hideDateTimePickerAfternoon}
            mode={'time'}
          />
        </View>
        <View style={styles.timebutton3}>
          <TouchableOpacity onPress={this._showDateTimePickerEvening}>
            <Text>Choose evening time</Text>
          </TouchableOpacity>
          <DateTimePicker style={styles.timebutton}
            isVisible={this.state.isDateTimePickerVisibleEvening}
            onConfirm={this._handleDatePickedEvening}
            onCancel={this._hideDateTimePickerEvening}
            mode={'time'}
          />
        </View>
        <View style={styles.timebutton4}>
          <TouchableOpacity onPress={this._showDateTimePickerBedtime}>
            <Text>Choose bedtime</Text>
          </TouchableOpacity>
          <DateTimePicker style={styles.timebutton}
            isVisible={this.state.isDateTimePickerVisibleBedtime}
            onConfirm={this._handleDatePickedBedtime}
            onCancel={this._hideDateTimePickerBedtime}
            mode={'time'}
          />
        </View>
      </View>
  	)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 30,
  },
  subheaderfont: {
    fontSize: 20,
  },
  timebutton1: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    backgroundColor: '#e6eeff',
  },
  timebutton2: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    backgroundColor: '#e6eeff',
  },
  timebutton3: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    backgroundColor: '#e6eeff',
  },
  timebutton4: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    backgroundColor: '#e6eeff',
  },
});
