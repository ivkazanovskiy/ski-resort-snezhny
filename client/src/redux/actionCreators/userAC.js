import { INIT_USER, DELETE_USER, EDIT_USER } from '../actionTypes/userAT'

export const initUser = (info, role) => {
  return {
    type: INIT_USER,
    payload: { info, role }
  }
}

export const editUser = (info) => {
  return {
    type: EDIT_USER,
    payload: { info }
  }
}

export const deleteUser = () => {
  return {
    type: DELETE_USER
  }
} 
