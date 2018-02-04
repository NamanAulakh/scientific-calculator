// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, ScrollView, TextInput, View, Text, TouchableOpacity } from 'react-native'
import math from 'mathjs'
import styles from './styles'

class StandardDeviation extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { inputArr: [], stdDev: null, value: null }
  }

  render() {
    const { navigation } = this.props
    const { inputArr, value } = this.state
    // console.log(math.std(inputArr))
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.main}>
            <Text style={Object.assign({}, styles.text, { alignSelf: 'center' })}>
              StandardDeviation
            </Text>
            <Text style={Object.assign({}, styles.text, { alignSelf: 'center', marginTop: 20 })}>
              Type the value and press
            </Text>
            <Text style={Object.assign({}, styles.text, { alignSelf: 'center' })}>Submit</Text>

            <View style={styles.horz}>
              <TextInput
                keyboardType="numeric"
                placeholder={'Enter a value'}
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={item => this.setState({ value: item })}
                value={value}
              />
            </View>

            <TouchableOpacity
              style={styles.solve}
              onPress={
                value
                  ? () => this.setState({ inputArr: inputArr.concat([value]), value: null })
                  : () => Alert.alert('Enter a value')
              }
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

            {inputArr.length > 0 && (
              <ScrollView>
                <View style={{ margin: 20 }}>
                  <Text style={styles.text}>{`The standard deviation of ${JSON.stringify(
                    inputArr,
                  )} is: `}</Text>

                  <Text style={Object.assign({}, styles.text, { margin: 10 })}>
                    {math.std(inputArr)}
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ inputArr: inputArr.slice(0, -1) })}
                    style={styles.clearOne}
                  >
                    <Text style={{ color: 'white', fontWeight: '900' }}>{' - '}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.setState({ inputArr: [], value: null })}
                    style={styles.clear}
                  >
                    <Text style={{ color: 'white', fontWeight: '900' }}>Clear All</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.settings} onPress={() => navigation.goBack()}>
          <Text style={styles.text}>Go to main screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// flow-disable-line
export default connect(null, null)(StandardDeviation)
