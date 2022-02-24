import { call, put, takeEvery, all } from 'redux-saga/effects'
import { CHECK_USER, LOG_USER, REG_USER } from './actionTypes/userAT'
import axios from 'axios'
import { initUser } from './actionCreators/userAC'


function* workerLogUser(action) {
  const data = action.payload
  const navigate = action.callback

  try {
    const response = yield call(axios, {
      url: '/api/login',
      method: 'POST',
      data,
    })

    const { token, info, role } = response.data

    localStorage.setItem('auth_token', token);
    yield put(initUser(info, role))
    navigate('/')

  } catch (err) {
    console.log(err);
    const { status } = err.response

    // TODO: переделать вывод информации с алерта на текст около кнопки 
    switch (status) {
      case 400:
        return window.alert("Неправильный пароль");
      case 404:
        return window.alert("E-mail не найден");
      default:
        console.log(err.response.data.error);
        return window.alert('Ошибка')
    }
  }
}

function* workerRegUser(action) {
  const data = action.payload
  const navigate = action.callback

  try {
    const response = yield call(axios, {
      url: '/api/registration',
      method: 'POST',
      data: data,
    })

    const { token, info, role } = response.data

    localStorage.setItem('auth_token', token);
    yield put(initUser(info, role))
    navigate('/')

  } catch (err) {
    const { status, data } = err.response
    // TODO: переделать вывод информации с алерта на текст около кнопки 
    switch (status) {
      case 400:
        return window.alert('Некорректеные данные')
      case 501:

        if (data.message === 'changeEmail') return window.alert('E-mail уже используется')
        return window.alert('Номер телефона уже используется')

      default:
        console.log(err.response.data.error);
        return window.alert('Ошибка')
    }
  }
}

function* workerCheckUser(action) {
  try {
    const response = yield call(axios, {
      url: '/api/checkUser',
    })

    const { info, role } = response.data
    yield put(initUser(info, role))
  } catch (err) {
    console.log(err)
  }
}


function* watcherUser() {
  yield takeEvery(LOG_USER, workerLogUser);
  yield takeEvery(REG_USER, workerRegUser);
  yield takeEvery(CHECK_USER, workerCheckUser);
}

export default function* rootSaga() {
  yield all([
    watcherUser(),
  ])
}