/* eslint-disable */
import React, { Component } from 'react'
import { View, Text, Switch } from 'react-native'
import { connect } from 'react-redux'
import * as settingsActions from 'app/redux/settings/actions'
import Header from 'app/components/common/header'
import styles from './styles'

class Settings extends Component {
  render() {
    const { container, text, back, content } = styles

    const { navigation, isUnitDegrees, setUnit } = this.props

    return (
      <View style={container}>
        <Header
          text={'Go to main screen'}
          style={back}
          textStyle={text}
          onPress={() => navigation.goBack()}
        />

        <View style={content}>
          <View style={{ flex: 2, flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1 }}>
            <View style={{ flex: 7, justifyContent: 'space-around', paddingLeft: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Use Angles</Text>

              <Text style={{ color: 'white', fontSize: 15 }}>
                Substitute radians with angles in trigonometric functions
              </Text>
            </View>

            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Switch
                value={isUnitDegrees}
                onValueChange={() => setUnit()}
                onTintColor={'#00bfff'}
              />
            </View>
          </View>

          <View style={{ flex: 9 }} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isUnitDegrees: state.settings.isUnitDegrees,
})

export default connect(mapStateToProps, settingsActions)(Settings)
