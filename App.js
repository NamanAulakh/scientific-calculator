import React from 'react'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import Root from './src'

export default class App extends React.Component { // eslint-disable-line
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}
