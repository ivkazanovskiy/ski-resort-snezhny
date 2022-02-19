import { combineReducers } from 'redux'
import { isAuthorizedReducer } from './isAuthorizedReducer'

export const rootReducer = combineReducers({
  isAuthorizedReducer,
})


