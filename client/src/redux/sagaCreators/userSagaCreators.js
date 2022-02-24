import { CHECK_USER, LOG_USER, REG_USER } from "../actionTypes/userAT"


export const loginUser = (data, navigate) => {
  return {
    type: LOG_USER,
    payload: data,
    callback: navigate

  }
}

export const registrationUser = (data, navigate) => {
  return {
    type: REG_USER,
    payload: data,
    callback: navigate
  }
}

export const checkUser = () => {
  return {
    type: CHECK_USER
  }
} 
