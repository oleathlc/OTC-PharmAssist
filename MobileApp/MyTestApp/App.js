import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Notifications } from "expo";
import registerForNotifications from "./services/push_notifications";

export default class App extends React.Component {
  componentDidMount() {
          registerForNotifications();
          Notifications.addListener(notification => {
              const { data: { text } } = notification;
              if (origin === "received" && text) {
                  Alert.alert("new push notification", text, [{ text: "ok" }]);
              }
          });
      }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
