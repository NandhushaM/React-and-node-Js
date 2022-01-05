import { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { FaLock } from "react-icons/fa";
import Logout from '../../src/Logout';



type EmployeeDetails = {
    EmployeeId: number;
    Name: string;
    Skills: string;
    Experience: number;
    Manager: string
}
type empValue = {
    employeeData: [];
    getEmployeeData: () => {};
    RequestSoftLock: ({}) => {};
}

  
const ManagerHome = ({ employeeData, getEmployeeData, RequestSoftLock }: empValue) => {

    useEffect(() => {getEmployeeData()}, [])

   const [showSoftlockPopup, setshowSoftlockPopup] = useState(false);
   const [employeeList, setemployeeList] = useState<any>({});
   const [show, setShow] = useState(true);
   const [RequestMessage,setRequestMessage]=useState("");
   const ClosePopup = () => setShow(false);
   
    const SendRequest = () => {
       setShow(false);
        
        RequestSoftLock({
            employee_id: employeeList.x.EmployeeId,
            manager: employeeList.x.Manager,
            requestMessage: RequestMessage
        });
        setTimeout(() => {
            getEmployeeData() 
        }, 200);
    }
    
    
    function ClickSoftLock(employee: any) {
        setRequestMessage("");
        setemployeeList(employee);
        setshowSoftlockPopup(true);
        setShow(true);
    }

    return (
        <div>
            <div className='row' style={{backgroundColor:"#084298"}}>
          
           <div className='col-sm-9'><h4 className="text-center mb-5" style={{textAlign:"center",marginTop:"30px",marginLeft:"200px",color:"white"}}>Manager Home Screen</h4></div> 
          
           <div className='col-sm-3'><span style={{float:"right"}}><Logout></Logout></span></div> 
            </div>
            <div>
            <br />
            <table className="table table-bordered" style={{color: "#084298"}}>
                <thead className="table-striped" style={{backgroundColor: "#084298",borderColor:"#084298",color: "white"}}>
                    <tr >
                        <th className="text-center">Employee id</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Skills</th>
                        <th className="text-center">Experience</th>
                        <th className="text-center">Manager</th>
                        <th className="text-center"> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                       
                       employeeData ? employeeData.map((x: EmployeeDetails) => {
                                return (
                                    <tr key={x.EmployeeId} style={{color:"black"}}>
                                        <td className="text-center">{x.EmployeeId}</td>
                                        <td className="text-center">{x.Name}</td>
                                        <td className="text-center"><button>{x.Skills}</button></td>
                                        <td className="text-center">{x.Experience}</td>
                                        <td className="text-center">{x.Manager}</td>
                                        <td className="text-center"><button className="btn" style={{color: "white", backgroundColor: "#084298" ,borderColor: "#084298 "}} onClick={() => ClickSoftLock({ x })}>
                                            <FaLock></FaLock>&nbsp; Request Lock</button></td>
                                    </tr>
                                )
                            }) : <p>No Data Found</p>
                        
                        
                    }
                </tbody>
            </table>
            </div>
            <div>
                {showSoftlockPopup ?
                    <Modal show={show} onHide={ClosePopup}>

                        <Modal.Header style={{padding:"10px",backgroundColor: "#084298",borderColor:"#084298",color: "white"}} closeButton>
                            <Modal.Title>Soft lock Request Confirmation</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <label className="mb-2">Please confirm the lock request for <span>{employeeList.x.EmployeeId}</span></label>
                        <div>
                        <label className="fw-bold">Request Message(message must be atleast 10 char long)</label>
                        </div>
                        &nbsp;
                            <div className="form-outline">
                                <textarea className="form-control" minLength={10}onChange={(e)=>{setRequestMessage(e.target.value)}} value={RequestMessage}></textarea>
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
        </div>
    )
}

export default ManagerHome