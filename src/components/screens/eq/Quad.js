// @flow
import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
// import { isNan } from 'lodash'
import { connect } from 'react-redux'
import styles from './styles'

class Quad extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = { root1: '0', root2: '0', a: '1', b: '0', c: '0' }

    this.solve = this.solve.bind(this)
  }

  solve() {
    const { a, b, c } = this.state

    const root = b ** 2 - 4 * a * c // eslint-disable-line
    const root1 = (-b + Math.sqrt(root)) / (2 * a)
    const root2 = (-b - Math.sqrt(root)) / (2 * a)

    // this.setState({
    //   root1: isNaN(root1) ? 'Imaginary' : root1,
    //   root2: isNaN(root2) ? 'Imaginary' : root2,
    // })
    this.setState({
      root1,
      root2,
    })
  }

  render() {
    const { navigation } = this.props
    const { root1, root2 } = this.state

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.main}>
            <Text style={styles.text}>Solution of Quadratic Equations:</Text>
            <Text style={Object.assign({}, styles.text, { alignSelf: 'center' })}>
              Ax^2 + Bx + C
            </Text>

            <View style={styles.horz}>
              <Text style={styles.text}>A = </Text>

              <TextInput
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={a => this.setState({ a })}
                value={this.state.a}
              />
            </View>

            <View style={styles.horz}>
              <Text style={styles.text}>B = </Text>

              <TextInput
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={b => this.setState({ b })}
                value={this.state.b}
              />
            </View>

            <View style={styles.horz}>
              <Text style={styles.text}>C = </Text>

              <TextInput
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={c => this.setState({ c })}
                value={this.state.c}
              />
            </View>

            <TouchableOpacity style={styles.solve} onPress={this.solve}>
              <Text style={styles.text}>Solve</Text>
            </TouchableOpacity>

            <View style={styles.horz}>
              <Text style={styles.text}>X1 = </Text>
              <ScrollView horizontal>
                <Text style={styles.text}>{root1}</Text>
              </ScrollView>
            </View>

            <View style={styles.horz}>
              <Text style={styles.text}>X2 = </Text>
              <ScrollView horizontal>
                <Text style={styles.text}>{root2}</Text>
              </ScrollView>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.settings} onPress={() => navigation.goBack()}>
          <Text style={styles.text}>Go to prev screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// flow-disable-line
export default connect(null, null)(Quad)
