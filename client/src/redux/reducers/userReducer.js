import { DELETE_USER, INIT_USER } from '../actionTypes/userAT'

export const userReducer = (state = { auth: false }, action) => {
  switch (action.type) {
    case INIT_USER:
      return { ...state, auth: true }
    case DELETE_USER:
      return { ...state, auth: false }
    default:
      return state
  }
}
