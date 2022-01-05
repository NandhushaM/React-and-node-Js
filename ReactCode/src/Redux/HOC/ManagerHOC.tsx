import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ManagerHome from '../../Managers/Home';

export default connect(
    (state:any)=>{
        return {
           employeeData:state.employeeData.employeeData
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            getEmployeeData:()=>{
                return {type:"EMPLOYEE_ACTION"}
            },
            RequestSoftLock:(request:any) => {
                return {type:"SEND_REQUEST",data:request}
            }
        },dispatch)
    }
)(ManagerHome)