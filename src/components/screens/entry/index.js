import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import styles from './styles'
import { mainOperations } from './constants'

class Entry extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  handleButtonPress(index) {
    const { navigation } = this.props

    if (index === -1) return navigation.navigate('Settings', { data: 'Settings Screen' })

    if (index === 0) {
      return navigation.navigate('Basic', {
        data: 'Operations for Basic Arithmetic Calculation',
      })
    }

    if (index === 1) {
      return navigation.navigate('Settings', { data: 'Operations for Standard Deviation' })
    }

    if (index === 2) return navigation.navigate('Settings', { data: 'Operations for Regression' })

    if (index === 3) {
      return navigation.navigate('Settings', { data: 'Operations for Solution of Equations' })
    }
  }

  render() {
    const { container, text, button, content, settings } = styles

    return (
      <View style={container}>
        <View style={content}>
          {mainOperations.map((operation, index) => (
            <TouchableOpacity
              style={button}
              key={index}
              onPress={() => this.handleButtonPress(index)}
            >
              <Text style={text}>{operation}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={settings} onPress={() => this.handleButtonPress(-1)}>
          <Text style={text}>Settings</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, null)(Entry)
