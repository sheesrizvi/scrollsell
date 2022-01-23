import { useEffect } from "react"
import * as Notifications from "expo-notifications"
import expoPushTokensApi from "../api/expoPushTokens"


export default useNotifications = (notificationListener) => {
    useEffect(() => {
        registerForPushNotifications()

        if (notificationListener) Notifications.addNotificationReceivedListener(notificationListener)
      }, [])
    
      const registerForPushNotifications = async () => {
        try {
          const permission = await Notifications.requestPermissionsAsync();
          if (!permission.granted) return
          const token = (await Notifications.getExpoPushTokenAsync()).data
          expoPushTokensApi.register(token)
          console.log(token)
        } catch (error) {
          console.log('Error getting a push token', error)
        }
      }
}