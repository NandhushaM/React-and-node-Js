import {combineReducers,applyMiddleware,createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loginReducer,managerReducer,wfmManagerReducer } from '../reducers/reducer'
import { rootSaga } from '../saga/root'



const appData = combineReducers({
    loginData: loginReducer,
    employeeData:managerReducer,
    wfmData : wfmManagerReducer
})
console.log("employeedatainstore",appData.employeeData);
const sagaMiddleware=createSagaMiddleware()
export const store=createStore(appData,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

