import { INIT_USER, DELETE_USER } from '../actionTypes/userAT'

export const initUser = () => {
  return {
    type: INIT_USER
  }
}

export const deleteUser = () => {
  return {
    type: DELETE_USER
  }
} 
