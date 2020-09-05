import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../CSS/home.css'

class AdminHome extends React.Component{

    
    componentDidMount(){
        if((localStorage.getItem("username") !== null) && (localStorage.getItem("username").toLowerCase() === "admin")){
            this.props.history.push('/admin')
        }
        else{
            this.props.history.push('/login')
        }
    }
    render(){
        return(
            <div align="right" className="container" id="main-tag">
            <br/>
                <div className="row">
                    <div className="col-sm-3">
                        <Link to="/adminUserManagement"><button id="button1" className="btn btn-primary">User Management</button></Link>
                    </div> 
                    <div className="col-sm-3">
                       <Link to="/adminInventoryManagement"><button id="button2" className="btn btn-primary">Inventory Management</button></Link>
                    </div>
                    <div className="col-sm-3">
                    <Link to="/manageDiscount"> <button id="button3" className="btn btn-primary">Manage Discount</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AdminHome);
