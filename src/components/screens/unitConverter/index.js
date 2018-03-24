// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, TextInput, TouchableOpacity, View, Text } from 'react-native'
import math from 'mathjs'
import styles from './styles'

class UnitConverter extends Component {
  constructor(props, context) {
    super(props, context)
    this.calc = this.calc.bind(this)
    this.state = { from: '', to: '' }
  }

  calc() {
    try {
      const { from, to } = this.state
      const answer = math.to(math.unit(from), to).value
      Alert.alert(`${from} equals ${answer} ${to}`)
    } catch (error) {
      Alert.alert('Invalid input')
    }
  }

  render() {
    const { navigation } = this.props
    const { from, to } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.main}>
            <Text style={Object.assign({}, styles.text, { alignSelf: 'center' })}>
              Unit Converter
            </Text>
            <Text
              style={Object.assign({}, styles.text, {
                fontSize: 12,
                alignSelf: 'center',
                marginTop: 20,
              })}
            >
              Enter input as shown in fields:
            </Text>

            <View style={styles.horz}>
              <Text
                style={Object.assign({}, styles.text, {
                  alignSelf: 'center',
                  fontSize: 12,
                  marginRight: 10,
                })}
              >
                from:
              </Text>

              <TextInput
                placeholder={'10 cm'}
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={item => this.setState({ from: item })}
                value={from}
              />
            </View>

            <View style={styles.horz}>
              <Text
                style={Object.assign({}, styles.text, {
                  alignSelf: 'center',
                  fontSize: 12,
                  marginRight: 10,
                })}
              >
                to:
              </Text>

              <TextInput
                placeholder={'mm'}
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={item => this.setState({ to: item })}
                value={to}
              />
            </View>

            <TouchableOpacity style={styles.solve} onPress={this.calc}>
              <Text style={styles.text}>Convert</Text>
            </TouchableOpacity>
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
export default connect(null, null)(UnitConverter)
