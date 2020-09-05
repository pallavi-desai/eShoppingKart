/**

 @author    Hardik Dudhrejia => B00835071

 **/


import React from 'react'
import {Link} from 'react-router-dom'
import '../CSS/AdminInventoryHome.css'

class AdminHome extends React.Component{
    render(){
        return(
            <div align="right" className="container" id="main-tag">
            <br/>
                <div className="row">
                    <div className="col-sm-3">
                        <Link to="/createProduct"><button id="button1" className="btn btn-primary">Insert ProductSpec</button></Link>
                    </div>
                    <div className="col-sm-3">
                       <Link to="/updateProduct"><button id="button2" className="btn btn-primary">Update ProductSpec</button></Link>
                    </div>
                    <div className="col-sm-3">
                    <Link to="removeProduct"> <button id="button3" className="btn btn-primary">Delete ProductSpec</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminHome;
