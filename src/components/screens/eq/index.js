import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { isNan } from 'lodash'
import { connect } from 'react-redux'
import { mainOperations } from './constants'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'gray' },
  text: { fontSize: 20, fontWeight: 'bold' },
  button: {
    backgroundColor: 'white',
    padding: 5,
    margin: 10,
    elevation: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 1,
  },
  content: { flex: 9, justifyContent: 'center', alignItems: 'center' },
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bfff',
  },
})

class Equation extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  handleButtonPress(index) {
    const { navigation } = this.props

    if (index === 0) return navigation.navigate('Quad')
    return navigation.navigate('Cubic')
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {mainOperations.map((operation, index) => (
            <TouchableOpacity
              style={styles.button}
              key={index}
              onPress={() => this.handleButtonPress(index)}
            >
              <Text style={styles.text}>{operation}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.settings} onPress={() => navigation.goBack()}>
          <Text style={styles.text}>Go to main screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, null)(Equation)
