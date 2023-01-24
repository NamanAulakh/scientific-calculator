import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const Header = (props) => {
  const { text, style, textStyle, onPress } = props

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Header
