import { INIT_USER, DELETE_USER } from '../actionTypes/userAT'

export const initUser = (info, role) => {
  return {
    type: INIT_USER,
    payload: { info, role }
  }
}

export const deleteUser = () => {
  return {
    type: DELETE_USER
  }
} 
