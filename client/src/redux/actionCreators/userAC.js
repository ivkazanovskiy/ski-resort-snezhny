import { UNAUTH_USER, AUTH_USER } from '../actionTypes/userAT'

export const authUser = () => {
  return {
    type: AUTH_USER
  }
}

export const unAuthUser = () => {
  return {
    type: UNAUTH_USER
  }
} 
