// @flow
import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import styles from './styles'
import { mainOpArr, otherOppsArr } from '../constants'

// const Operations = (props: renderProps) => {
const Operations = (props) => {
  const { handleMainOp } = props

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', padding: 5 }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {otherOppsArr.map((itemX, indexX) => (
            <View style={{ flexDirection: 'row', margin: 10 }} key={indexX}>
              {itemX.map((item, index) => (
                <TouchableOpacity
                  style={Object.assign({}, styles.btn, {
                    padding: indexX === otherOppsArr.length - 1 ? 10 : 5,
                  })}
                  key={index}
                  onPress={() => console.log(item)}
                >
                  <Text style={styles.btnText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

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
