import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-next-react-navigation'
import BaseButton from '../component/BaseButton'
import { loginWithGithub } from '../../pages/api/fire'

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'stretch', flexDirection: 'row', backgroundColor: 'green' }}>
        <Text>Header</Text>
        <BaseButton
          text="login with github"
          onPress={() => {
            loginWithGithub()
              .then((result) => {
                const credential = result.credential

                console.log(`==== credential ===`)
                console.log(credential['accessToken'])
                console.log('==== end log ===')

                // The signed-in user info.
                const user = result.user

                console.log(`==== user ===`)
                console.log(user.photoURL)
                console.log('==== end log ===')
              })
              .catch((error) => {
                console.log(`==== error ===`)
                console.log(error)
                console.log('==== end log ===')
              })
          }}
        />
      </View>
      <Text style={styles.text}>Home Screen 🥳</Text>
      <Link style={{ color: 'green', fontSize: 20 }} routeName="Profile">
        Click me to open profile
      </Link>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
})
