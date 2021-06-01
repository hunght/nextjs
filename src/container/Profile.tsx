import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useRouting } from 'expo-next-react-navigation'
import BaseButton from '../component/BaseButton'
export const Profile: React.FC = () => {
  const { goBack } = useRouting()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile! 🏋️‍♀️</Text>
      <BaseButton text="👈 Go back1" onPress={() => goBack()} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
})
