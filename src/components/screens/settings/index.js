import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Header from 'app/components/common/header'

import styles from './styles'

class Settings extends Component { // eslint-disable-line
  render() {
    const { container, text, back, content } = styles

    const { navigation } = this.props

    const data = this.props.navigation.state.params.data

    return (
      <View style={container}>
        <Header
          text={'Go to main screen'}
          style={back}
          textStyle={text}
          onPress={() => navigation.goBack()}
        />

        <View style={content}>
          <Text style={text}>{data}</Text>
        </View>
      </View>
    )
  }
}

export default connect(null, null)(Settings)
