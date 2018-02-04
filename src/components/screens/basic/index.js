import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native'
import math from 'mathjs'
import { connect } from 'react-redux'
import { includes } from 'lodash'
import * as setActions from 'app/redux/settings/actions'
import Inputs from './inputs'
import Operations from './operations'
import Actions from './actions'

import styles from './styles'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class Basic extends Component {
  constructor(props) {
    super(props)

    this.state = { inputValue: '', outputValue: '', modalVisible: false, a: '', b: '', func: 'nCr' }

    this.onPressActions = this.onPressActions.bind(this)
    this.handleSlot1 = this.handleSlot1.bind(this)
    this.handleSlot2 = this.handleSlot2.bind(this)
    this.calculate = this.calculate.bind(this)
    this.handleMainOp = this.handleMainOp.bind(this)
    this.handleOtherOps = this.handleOtherOps.bind(this)
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
      return this.setState({ inputValue: inputValue.slice(0, inputValue.length - 1) }, () =>
        this.calculate(),
      )
    }

    if (item === '(' || item === ')') {
      return this.setState({ inputValue: inputValue.concat(item) }, () => this.calculate())
    }

    this.setState({ inputValue: inputValue.concat(item) })
  }

  calculate() {
    let { inputValue } = this.state
    const { setAns, setHistory } = this.props

    inputValue = inputValue.replace(/π/g, `${math.pi}`)
    if (!includes(inputValue, 'sec')) inputValue = inputValue.replace(/e/g, `${math.e}`)
    // inputValue = inputValue.replace(/asin/g, `math.asin`)

    // console.log(inputValue, '******calculate*****')

    try {
      let res = math.eval(inputValue)
      if (typeof res === 'object') res = JSON.stringify(math.eval(inputValue))

      this.setState(
        {
          outputValue: res,
        },
        () => {
          setAns(JSON.stringify(res))
          if (parseInt(JSON.stringify(res))) {
            return setHistory(`${this.state.inputValue} = ${JSON.stringify(res)}`)
          }
        },
      )
    } catch (error) {
      // console.log(error, '!!!!!Error in file ...basic...!!!!!') // eslint-disable-line

      this.setState({ outputValue: `${error}` })
    }
  }

  handleMainOp(item) {
    const { inputValue, outputValue } = this.state
    const { ans } = this.props

    if (item === 'pi') {
      return this.setState(
        {
          inputValue: inputValue.concat('π'),
          // outputValue: outputValue * math.pi,
        },
        () => this.calculate(),
      )
    }

    if (item === 'e') {
      return this.setState(
        {
          inputValue: inputValue.concat('e'),
          // outputValue: outputValue * math.e,
        },
        () => this.calculate(),
      )
    }

    if (item === '%') {
      return this.setState({
        inputValue: inputValue.concat('%'),
        outputValue: outputValue / 100,
      })
    }

    if (item === 'sqRoot') {
      return this.setState({
        inputValue: inputValue.concat('sqrt('),
        // outputValue: outputValue * math.e,
      })
    }

    this.setState({
      // inputValue: outputValue !== '' ? JSON.stringify(outputValue) : '',
      inputValue: inputValue.concat(ans),
      outputValue: '',
    })
  }

  handleOtherOps(item) {
    const { inputValue, outputValue } = this.state

    const { isUnitDegrees, history } = this.props

    if (item === '!') {
      return this.setState({ inputValue: inputValue.concat(item) }, () => this.calculate())
    }
    if (item === '^') {
      return this.setState({ inputValue: inputValue.concat(item) }, () => this.calculate())
    }
    if (item === 'ln') {
      return this.setState({ inputValue: inputValue.concat('log(') }, () => this.calculate())
    }
    if (item === 'log10b') {
      return this.setState({ inputValue: inputValue.concat('log10(') }, () => this.calculate())
    }
    if (
      item === 'sin' ||
      item === 'cos' ||
      item === 'tan' ||
      item === 'cot' ||
      item === 'sec' ||
      item === 'csc'
    ) {
      if (isUnitDegrees) {
        return this.setState({ inputValue: inputValue.concat(`${item}((π/180)*`) }, () =>
          this.calculate(),
        )
      }

      return this.setState({ inputValue: inputValue.concat('sin(') }, () => this.calculate())
    }
    if (
      item === 'asin' ||
      item === 'acos' ||
      item === 'atan' ||
      item === 'acot' ||
      item === 'asec' ||
      item === 'acsc'
    ) {
      return this.setState({ inputValue: inputValue.concat(`${item}(`) }, () => this.calculate())
    }
    if (item === 'nCr' || item === 'nPr') return this.setState({ modalVisible: true, func: item })
    if (item === 'H') return this.setState({ modalVisible: true, func: item })
  }

  render() {
    const { container, text, content, settings } = styles

    const { navigation, setAns, history, setHistory } = this.props

    const { inputValue, outputValue, a, b, func } = this.state

    const data = this.props.navigation.state.params.data

    // console.log(data, '............')

    return (
      <View style={container}>
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => Alert.alert('Modal has been closed.')}
          transparent
        >
          <View
            style={{
              marginTop: height / 4,
              marginHorizontal: 20,
              backgroundColor: 'gray',
              height: height / 2,
              opacity: 0.9,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false })
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>X</Text>
              </TouchableOpacity>
            </View>

            {func === 'H' ? (
              <View style={{ flex: 9, justifyContent: 'space-around', alignItems: 'center' }}>
                <ScrollView>
                  {history.map((item, index) => (
                    <View key={index} style={{ margin: 2 }}>
                      <Text style={{ color: 'white', fontSize: 18 }}>{item}</Text>
                    </View>
                  ))}
                </ScrollView>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalVisible: false })
                      }}
                      style={{ padding: 10, backgroundColor: 'white' }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ flex: 9, justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  Rule: a must be greater than b
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter a:</Text>
                <TextInput
                  style={{
                    height: 40,
                    width: width - 100,
                    padding: 5,
                    borderColor: 'red',
                    borderWidth: 2,
                  }}
                  onChangeText={aX => this.setState({ a: aX })}
                  value={a}
                />

                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter b:</Text>
                <TextInput
                  style={{
                    height: 40,
                    width: width - 100,
                    padding: 5,
                    borderColor: 'red',
                    borderWidth: 2,
                  }}
                  onChangeText={bX => this.setState({ b: bX })}
                  value={b}
                />

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: 50 }}>
                    <TouchableOpacity
                      onPress={() => {
                        // console.log(a, b)
                        if (parseInt(a) < parseInt(b)) {
                          return Alert.alert('a must be greater than b')
                        }

                        if (func === 'nCr') {
                          return this.setState(
                            {
                              // inputValue: inputValue.concat(`${a}C${b}`),
                              modalVisible: false,
                              outputValue: math.combinations(a, b),
                            },
                            () => {
                              setAns(math.combinations(a, b))
                              return setHistory(`${a}P${b} = ${math.combinations(a, b)}`)
                            },
                          )
                        }

                        return this.setState(
                          {
                            // inputValue: inputValue.concat(`${a}C${b}`),
                            modalVisible: false,
                            outputValue: math.permutations(a, b),
                          },
                          () => {
                            setAns(math.permutations(a, b))
                            return setHistory(`${a}P${b} = ${math.permutations(a, b)}`)
                          },
                        )
                      }}
                      style={{ padding: 10, backgroundColor: 'white' }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Ok</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginLeft: 50 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ modalVisible: false })
                      }}
                      style={{ padding: 10, backgroundColor: 'white' }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Modal>

        <View style={content}>
          <Inputs inputValue={inputValue} outputValue={outputValue} data={data}/>

          <Operations handleMainOp={this.handleMainOp} handleOtherOps={this.handleOtherOps} />

          <Actions onPressActions={this.onPressActions} />
        </View>

        <TouchableOpacity style={settings} onPress={() => navigation.goBack()}>
          <Text style={text}>Go to main screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isUnitDegrees: state.settings.isUnitDegrees,
  ans: state.settings.ans,
  history: state.settings.history,
})

export default connect(mapStateToProps, setActions)(Basic)
