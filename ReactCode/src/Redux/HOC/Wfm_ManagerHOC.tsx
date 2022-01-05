import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import WFMHome from '../../WFM/Home'

export default connect(
    (state:any)=>{
        return {
            wfmData:state.wfmData.wfmData
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            getWFM_manager:()=>{
                return {type:"WFM_ACTION"}
            },
            ApproveDetail:(request:any) => {
                 return {type:"ACCEPT_REQUEST",data:request}
            }
        },dispatch)
    }
)(WFMHome)