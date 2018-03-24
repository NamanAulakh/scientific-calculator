// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert, TextInput, TouchableOpacity, View, Text } from 'react-native'
import styles from './styles'
import regression from './func'

class Regression extends Component {
  constructor(props, context) {
    super(props, context)
    this.calc = this.calc.bind(this)
    this.state = { value: '' }
  }

  calc(func) {
    try {
      const { value } = this.state
      const input = JSON.parse(value)
      const answer = regression[func](input).string
      Alert.alert(`The ${func} equation is "${answer}"`)
    } catch (error) {
      Alert.alert('Invalid input')
    }
  }

  render() {
    const { navigation } = this.props
    const { value } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.main}>
            <Text style={Object.assign({}, styles.text, { alignSelf: 'center' })}>Regression</Text>
            <Text
              style={Object.assign({}, styles.text, {
                fontSize: 12,
                alignSelf: 'center',
                marginTop: 20,
              })}
            >
              Enter the points as follows:
            </Text>
            <Text style={Object.assign({}, styles.text, { fontSize: 12, alignSelf: 'center' })}>
              [[0, -1], [32, 67], [12, 79]]
            </Text>

            <View style={styles.horz}>
              <TextInput
                placeholder={'Enter co-ordinates'}
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={item => this.setState({ value: item })}
                value={value}
              />
            </View>

            <TouchableOpacity style={styles.solve} onPress={() => this.calc('linear')}>
              <Text style={styles.text}>Linear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.solve} onPress={() => this.calc('exponential')}>
              <Text style={styles.text}>Exponential</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.solve} onPress={() => this.calc('logarithmic')}>
              <Text style={styles.text}>Logarithmic</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.solve} onPress={() => this.calc('polynomial')}>
              <Text style={styles.text}>Polynomial</Text>
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
export default connect(null, null)(Regression)
