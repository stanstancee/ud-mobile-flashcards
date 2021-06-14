import { StyleSheet } from 'react-native';
import { colors } from './colors'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = "@stan:notificatio"


export const globalStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    borderRadius: 10,



  },
  logo: {
    width: "50%",
    height: 159,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: colors.white,
    margin: 10
  },
  smallText: {
    fontSize: 14,
    fontStyle: "italic",
    margin: 10,
    color: "#B2DFDB"

  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 3,
    borderColor: colors.primaryBackground,
    margin: 10,
    borderRadius: 10,


  },
  bigText: {
    fontSize: 30,
    color: colors.primaryText,
    marginBottom: 10
  },
  mediumText: {
    fontSize: 23,
    color: colors.secondaryText,
    marginTop: 10

  },

})

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}


export async function setLocalNotification() {

  try {
    const data = await AsyncStorage.getItem(NOTIFICATION_KEY)
    const parsedData = JSON.parse(data)

    if (parsedData === null) {
      const permission = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true
        }
      })


      if (permission.status === 'granted') {

        Notifications.cancelAllScheduledNotificationsAsync()


        Notifications.scheduleNotificationAsync(
          {
            content: {
              title: 'Complete a quiz',
              body: "You are yet to complete a quiz today",
            },
            trigger: {
              hour: 19,
              minute: 0,
              repeats: true
          }

          }
        )
        const jsonValue = JSON.stringify(true)
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(jsonValue))
      }

    }


  } catch (e) {
    console.log(e)
  }


}
