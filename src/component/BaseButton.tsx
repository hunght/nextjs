import React from 'react'
import { Text } from 'react-native'

const BaseButton: React.FC<{ text: string; onPress?: () => void }> = ({ text, onPress }) => {
  return (
    <Text
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'black',
        color: 'white',
        margin: 20,
      }}
      onPress={onPress}
    >
      {text}
    </Text>
  )
}
export default BaseButton
