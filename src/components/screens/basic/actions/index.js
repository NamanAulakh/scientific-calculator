// @flow
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './styles'
import { numbersArr, actionsArr } from '../constants'

// const Actions = (props: renderProps) => {
const Actions = (props) => {
  const { onPressActions } = props

  return (
    <View style={styles.container}>
      <View style={styles.onePointFive}>
        <View style={styles.col}>
          {numbersArr.slice(0, 4).map((item, i) => (
            <TouchableOpacity
              onPress={() => onPressActions({ slot: 1, item })}
              key={i}
              style={styles.opfButton}
            >
              <Text style={styles.opfText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.col}>
          {numbersArr.slice(4, 8).map((item, i) => (
            <TouchableOpacity
              onPress={() => onPressActions({ slot: 1, item })}
              key={i}
              style={styles.opfButton}
            >
              <Text style={styles.opfText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.col}>
          {numbersArr.slice(8, numbersArr.length).map((item, i) => (
            <TouchableOpacity
              onPress={() => onPressActions({ slot: 1, item })}
              key={i}
              style={styles.opfButton}
            >
              <Text style={styles.opfText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.one}>
        <View style={styles.col}>
          {actionsArr.slice(0, 4).map((item, i) => (
            <TouchableOpacity
              onPress={() => onPressActions({ item })}
              key={i}
              style={Object.assign({}, styles.opfButton, { backgroundColor: 'white' })}
            >
              <Text style={Object.assign({}, styles.opfText, { color: i === 0 ? 'red' : 'black' })}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.col}>
          {actionsArr.slice(4, actionsArr.length).map((item, i) => (
            <TouchableOpacity
              onPress={() => onPressActions({ item })}
              key={i}
              style={Object.assign({}, styles.opfButton, { backgroundColor: 'white' })}
            >
              <Text style={Object.assign({}, styles.opfText, { color: i === 0 ? 'red' : 'black' })}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Actions
