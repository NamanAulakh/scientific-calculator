// @flow
import React from 'react'
import { View, Text, TextInput, Keyboard } from 'react-native'

import styles from './styles'
// import type { renderProps } from '../constants'

// const Inputs = (props: renderProps) => {
const Inputs = (props) => {
  const { inputValue = '2x2', outputValue = '4' } = props

  return (
    <View style={styles.container}>
      <View style={styles.two}>
        <TextInput style={styles.input} value={inputValue} editable={false} />
      </View>

      <View style={styles.one}>
        <Text style={styles.output}>{outputValue}</Text>
      </View>
    </View>
  )
}

export default Inputs
