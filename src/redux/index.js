import { combineReducers } from 'redux'
import yo from './yo'
import settings from './settings'

const reducers = combineReducers({ yo, settings })

const rootReducer = (state, action) => reducers(state, action)

export default rootReducer
