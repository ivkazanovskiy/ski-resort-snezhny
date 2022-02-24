import { deleteUser, initUser } from "../actionCreators/userAC"
import axios from 'axios'

export const authUser = (data) => {
  return dispatch => {
    axios({
      url: '/api/login',
      method: 'POST',
      data: data,
    })
      .then(response => {
        const { token, info, role } = response.data

        localStorage.setItem('auth_token', token);
        dispatch(initUser())
        return window.location.href = '/'
        // return navigate('/')
      })
      .catch(error => {
        const { status } = error.response

        // TODO: переделать вывод информации с алерта на текст около кнопки 
        switch (status) {
          case 400:
            return window.alert("Неправильный пароль");
          case 404:
            return window.alert("E-mail не найден");
          default:
            console.log(error.response.data.error);
            return window.alert('Ошибка')
        }
      })
  }
}
