import { SET_UNIT, SET_ANS, SET_HISTORY } from './types'

export const setUnit = () => ({
  type: SET_UNIT,
})

export const setAns = payload => ({
  type: SET_ANS,
  payload,
})

export const setHistory = payload => ({
  type: SET_HISTORY,
  payload,
})
