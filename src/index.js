import React, { Component } from 'react'
import { connect } from 'react-redux'
import Routes from 'app/routes'

class Root extends Component { // eslint-disable-line
  render() {
    return <Routes />
  }
}

export default connect(null, null)(Root)
