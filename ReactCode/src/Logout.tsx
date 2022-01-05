function Clear(){
    localStorage.clear();
}

const Logout=()=>{  
    
    return(
        <a href='/login' onClick={Clear} style={{backgroundColor:"#084298",color:"white",marginBottom:"40px",marginLeft:"1300px",width:"110px",marginTop:"30px"}} className="btn btn-sm logout">
        <span className="fa fa-sign-out"></span>Log out</a>
    )
}


export default Logout;