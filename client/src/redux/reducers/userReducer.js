import { DELETE_USER, INIT_USER } from '../actionTypes/userAT'

export const userReducer = (state = { auth: false }, action) => {
  switch (action.type) {
    case INIT_USER:
      const { info, role } = action.payload
      return { ...info, role, auth: true }
    case DELETE_USER:
      return { auth: false }
    default:
      return state
  }
}
