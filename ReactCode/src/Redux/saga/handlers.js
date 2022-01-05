import axios from 'axios'
import { call, put } from 'redux-saga/effects'




export function* loginHandler(action) {
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/signin", action.data)
    
    localStorage.setItem("username", result.data.username)
    localStorage.setItem("usertype", result.data.usertype)
    localStorage.setItem("token", result.data.token)

    yield put({
      type: "LOGIN_SUCCESS", data:
      {
        username: result.data.username,
        usertype: result.data.usertype,
        token: result.data.token
      }
    })
  }
  catch (e) {
    yield put({ type: "LOGIN_FAILURE" })
  }

}



export function* managerHandler(action) {
  const username =  localStorage.getItem("username")
const ManagerUserName = { manager: username };
  try {
    
    let result = yield call(axios.post, "http://localhost:8000/managers/manager",ManagerUserName)
    
    yield put({ type: "LOAD_EMPLOYEE", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }

}


export function* wfm_managerHandler(action) {
  const username =  localStorage.getItem("username")
  const ManagerUserName = { manager: username };
  try {
    let result = yield call(axios.post, "http://localhost:8000/wfmmanagers/WfmmanagerList",ManagerUserName)
    yield put({ type: "LOAD_WFM", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }

}


export function* sendRequestHandler(action) {
  try {
    let result = yield call(axios.post, "http://localhost:8000/managers/sendLockRequest", action.data)
    yield put({ type: "SEND_REQUEST", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }
}


export function* acceptRequestHandler(action) {
  
  try {
  
    let result = yield call(axios.post, "http://localhost:8000/wfmmanagers/softlockstatus", action.data)
    yield put({ type: "ACCEPT_REQUEST", data: result.data })
  }
  catch (e) {  
    yield put({ type: "FAILURE" })
  }
}
