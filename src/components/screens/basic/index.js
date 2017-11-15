import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import math from 'mathjs'
import { connect } from 'react-redux'
// import { find, isUndefined } from 'lodash'
import Inputs from './inputs'
import Operations from './operations'
import Actions from './actions'

import styles from './styles'

class Basic extends Component {
  constructor(props) {
    super(props)

    this.state = { inputValue: '', outputValue: '' }

    this.onPressActions = this.onPressActions.bind(this)
    this.handleSlot1 = this.handleSlot1.bind(this)
    this.handleSlot2 = this.handleSlot2.bind(this)
    this.calculate = this.calculate.bind(this)
    this.handleMainOp = this.handleMainOp.bind(this)
  }

  onPressActions(payload) {
    if (payload.slot) return this.handleSlot1(payload.item)

    return this.handleSlot2(payload.item)
  }

  handleSlot1(item) {
    // console.log(item, 'handleSlot1')

    const { inputValue } = this.state

    if (item === '=') return this.calculate()

    this.setState({ inputValue: inputValue.concat(item) }, () => this.calculate())
  }

  handleSlot2(item) {
    // console.log(item, 'handleSlot2')

    const { inputValue } = this.state

    if (item === 'AC') return this.setState({ inputValue: '', outputValue: '' })

    if (item === 'DEL') {
      return this.setState({ inputValue: inputValue.slice(0, inputValue.length - 1) })
    }

    if (item === '(' || item === ')') {
      return this.setState({ inputValue: inputValue.concat(item) }, () => this.calculate())
    }

    this.setState({ inputValue: inputValue.concat(item) })
  }

  calculate() {
    const { inputValue } = this.state

    try {
      this.setState({ outputValue: math.eval(inputValue) })
    } catch (error) {
      console.log(error, '!!!!!Error in file ...basic...!!!!!') // eslint-disable-line

      this.setState({ outputValue: `${error}` })
    }
  }

  handleMainOp(item) {
    const { inputValue, outputValue } = this.state

    if (item === 'pi') {
      return this.setState({
        inputValue: inputValue.concat('π'),
        outputValue: outputValue * math.pi,
      })
    }

    if (item === 'e') {
      return this.setState({
        inputValue: inputValue.concat('e'),
        outputValue: outputValue * math.e,
      })
    }

    if (item === '%') {
      return this.setState({
        inputValue: inputValue.concat('%'),
        // outputValue: outputValue * math.e,
      })
    }

    if (item === 'sqRoot') {
      return this.setState({
        inputValue: inputValue.concat('sqrt('),
        // outputValue: outputValue * math.e,
      })
    }

    this.setState({
      inputValue: JSON.stringify(outputValue),
      outputValue: '',
    })
  }

  render() {
    const { container, text, content, settings } = styles

    const { navigation } = this.props

    const { inputValue, outputValue } = this.state

    // const data = this.props.navigation.state.params.data

    return (
      <View style={container}>
        <View style={content}>
          <Inputs inputValue={inputValue} outputValue={outputValue} />

          <Operations handleMainOp={this.handleMainOp} />

          <Actions onPressActions={this.onPressActions} />
        </View>

        <TouchableOpacity style={settings} onPress={() => navigation.goBack()}>
          <Text style={text}>Go to main screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, null)(Basic)
