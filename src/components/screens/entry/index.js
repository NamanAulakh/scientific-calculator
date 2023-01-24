import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { mainOperations } from './constants'

class Entry extends Component {
  constructor(props) {
    super(props)
    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  handleButtonPress(index) {
    const { navigation } = this.props

    switch (index) {
      case 0:
        return navigation.navigate('Basic', {
          data: 'Operations for Basic Arithmetic Calculation',
          type: 0,
        })
      case 1:
        return navigation.navigate('Equation')
      case 2:
        return navigation.navigate('StandardDeviation')
      case 3:
        return navigation.navigate('Regression')
      case 4:
        return navigation.navigate('UnitConverter')

      default:
        navigation.navigate('Settings')
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
