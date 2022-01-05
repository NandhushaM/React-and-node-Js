import { takeEvery} from 'redux-saga/effects'
import { loginHandler,managerHandler,wfm_managerHandler, sendRequestHandler,acceptRequestHandler} from './handlers'


export function* rootSaga(){
    yield takeEvery("LOGIN_ACTION",loginHandler);
    yield takeEvery("EMPLOYEE_ACTION",managerHandler);
    yield takeEvery("WFM_ACTION",wfm_managerHandler);
    yield takeEvery("SEND_REQUEST",sendRequestHandler);
    yield takeEvery("ACCEPT_REQUEST",acceptRequestHandler);
}