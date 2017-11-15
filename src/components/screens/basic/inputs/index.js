// @flow
import React from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'

import styles from './styles'
// import type { renderProps } from '../constants'

// const Inputs = (props: renderProps) => {
const Inputs = (props) => {
  const { inputValue = '2x2', outputValue = '4' } = props

  return (
    <View style={styles.container}>
      <View style={styles.two}>
        <ScrollView horizontal style={styles.input}>
          <Text style={{ fontSize: 25, padding: 10 }}>{inputValue}</Text>
        </ScrollView>
      </View>

      <View style={styles.one}>
        <Text style={styles.output}>{outputValue}</Text>
      </View>
    </View>
  )
}

export default Inputs
