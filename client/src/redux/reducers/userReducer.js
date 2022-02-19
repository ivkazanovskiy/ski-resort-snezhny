import { UNAUTH_USER, AUTH_USER } from '../actionTypes/userAT'

export const userReducer = (state = { auth: false }, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, auth: true }
    case UNAUTH_USER:
      return { ...state, auth: false }
    default:
      return state
  }
}
