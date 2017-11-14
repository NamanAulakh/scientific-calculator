// @flow
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import styles from './styles'
import { mainOpArr } from '../constants'

// const Operations = (props: renderProps) => {
const Operations = (props) => {
  const { handleMainOp } = props

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', margin: 5 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'green' }}>
        <Text>Yo</Text>
      </ScrollView>

      <View style={{ flex: 0.4, backgroundColor: 'gray', flexDirection: 'row' }}>
        {mainOpArr.map((item, index) => (
          <TouchableOpacity style={styles.btn} key={index} onPress={() => handleMainOp(item.key)}>
            <Text style={styles.btnText}>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Operations
