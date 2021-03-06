// The middleware to call the API for quotes
import CallApi from './middleware/api'
var appConfig = require('./configurations/app.json');

const BASE_URL = appConfig.apiServerAdress;

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: `{username:"${creds.username}",password:"${creds.password}"}`
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    // return fetch('http://localhost:64307/api//token', config)
    return fetch(BASE_URL + 'token', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.token)
          
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}

export const EXPENSE_REQUEST = 'EXPENSE_REQUEST'
export const EXPENSE_SUCCESS = 'EXPENSE_SUCCESS'
export const EXPENSE_FAILURE = 'EXPENSE_FAILURE'

// Uses the API middlware to get a quote
// export function fetchExpense() {
//   return {
//     [CALL_API]: {
//       endpoint: 'random-quote',
//       types: [EXPENSE_REQUEST, EXPENSE_SUCCESS, EXPENSE_FAILURE]
//     }
//   }
// }

// Same API middlware is used to get a 
// secret quote, but we set authenticated
// to true so that the auth header is sent
export function fetchSecureExpense(period) {
  return dispatch => {
    return CallApi('Expenses/' + period, true)
      .then(function(response) {
        return(response)
      })
      .catch(function(error){
        if(error == 401) {
          dispatch(loginError(error))
        }
        return Promise.reject(error)
      })
    }
} 