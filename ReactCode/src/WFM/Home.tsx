import { useState, useEffect } from "react";
import Logout from '../../src/Logout';
import { Modal, Button } from 'react-bootstrap';
import { FaLock } from "react-icons/fa";


type wfmData = {
    wfmData: [];
    getWFM_manager: () => {};
    ApproveDetail: ({}) => {};
}

const WFMHome = ({ wfmData, getWFM_manager, ApproveDetail }: wfmData) => {

    useEffect(() => {getWFM_manager()}, [])

    const [showViewDetailPopup, setshowViewDetailPopup] = useState(false);
    const [wfmList, setWfmList] = useState<any>({});
    const [show, setShow] = useState(true);
    const [statusvalue, setstatusvalue] = useState();

    const ClosePopup = () => setShow(false);
    const SendRequest = () => {
       
        setShow(false);
        
        ApproveDetail({
            lockid: wfmList.x.lockid,
            managerstatus: statusvalue,
            employee_id: wfmList.x.EmployeeId
        });
    }

    useEffect(() => {getWFM_manager()}, [])
    function ClickViewDetail(employee: any) {

        setWfmList(employee);
        setshowViewDetailPopup(true);
        setShow(true);
    }

    const handleChange = (e: any) => {
     setstatusvalue(e.target.value);
    };

    return (
        <div>
          <div className='row' style={{backgroundColor:"#084298"}}>
          
          <div className='col-sm-9'><h4 className="text-center mb-5 " style={{textAlign:"center",marginTop:"30px",marginLeft:"200px",color:"white"}}>WFM Manager Home Screen</h4></div> 
         
          <div className='col-sm-3'><span style={{float:"right"}}><Logout></Logout></span></div> 
           </div>
           <br />
            {wfmData && wfmData.length > 0 ?
                <table className="table table-bordered" style={{color: "#084298"}}>
                <thead className="table-striped" style={{backgroundColor: "#084298",borderColor:"#084298",color: "white"}}>
                        <tr>
                            <th className="text-center">Employee ID</th>
                            <th className="text-center">Requestee</th>
                            <th className="text-center">Request Date</th>
                            <th className="text-center">Employee Manager</th>
                            <th className="text-center"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wfmData.map((x: any) => {
                                return (
                                    <tr key={x.EmployeeId} style={{color:"black"}}>
                                        <td className="text-center">{x.EmployeeId}</td>
                                        <td className="text-center">{x.Name}</td>
                                        <td className="text-center">{x.reqDate}</td>
                                        <td className="text-center">{x.Manager}</td>
                                        <td className="text-center"><button className="btn ButtonColor" style={{color: "white",backgroundColor: "#084298",borderColor:"#084298"}} onClick={() => ClickViewDetail({ x })}>
                                            <FaLock></FaLock>&nbsp; View Details</button></td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
                : null
            }
            {showViewDetailPopup ?
                <Modal show={show} onHide={ClosePopup}>

                    <Modal.Header style={{padding:"10px",backgroundColor: "#084298",borderColor:"#084298",color: "white"}} closeButton>
                        <Modal.Title>Soft lock Request Confirmation</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="StatusMsg">Status Update for Request Lock</p>
                        <br />
                        <div>
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Employee ID</label><span className="col-5">{wfmList.x.EmployeeId}</span>
                        </div>
                        <br />
                        <div>
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Requestee</label><span className="col-5">{wfmList.x.Manager}</span>
                        </div>
                        <br />
                        <div>
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Employee Manager</label><span className="col-5">{wfmList.x.wfm_manager}</span>
                        </div>
                        <br />
                        <div>
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Request Description</label><span className="col-5">{wfmList.x.requestmessage}</span>
                        </div>
                        <br />
                        <div>
                            <label className="col-5 mb-2" style={{color:"#084298"}}>Status</label>
                            <select value={statusvalue} onChange={handleChange} className="col-5">
                                <option value="SelectStatus"></option>
                                <option value="approve">Approve</option>
                                <option value="reject">Reject</option>
                            </select>
                        </div>


                    </Modal.Body>

                    <Modal.Footer>

                        <Button variant="secondary" onClick={ClosePopup}>Close</Button>
                        <Button variant="primary" onClick={SendRequest}>Send Request</Button>

                    </Modal.Footer>

                </Modal>


                : null
            }
        </div>
    )
}

export default WFMHome