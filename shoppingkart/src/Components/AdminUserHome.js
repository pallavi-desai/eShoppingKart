import React from 'react'
import axios from 'axios';

class AdminUserHome extends React.Component{
    constructor(){
        super()
        this.state={
            users: []
        }
    }

    componentDidMount(){
        axios.get("https://csci-5709-shoppingkart-group24.herokuapp.com/admin/getAllUsers").then(response => {
            this.setState({users:response.data})
          })
          .catch(error => {
            console.log(error)
          })
        }

    deleteUser(id, index){

        axios.get("https://csci-5709-shoppingkart-group24.herokuapp.com/admin/deleteUser",{
            params:{user_id:id}})
        .then(response => {
            if(response.data.Success === false){
                alert("There was some issue in deleting that user")
            }
            else{
                this.state.users.splice(index,1)
                this.setState({users:this.state.users})
            }
          })
          .catch(error => {
            console.log(error)
          })

    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3 align="center">Current users of Shopping Kart</h3>
                <br/>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Delete User?</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.users.length>0?
                            this.state.users.map((person, index) =>
                            (
                            <tr>
                                <th scope="row">{person._id}</th>
                                <td>{person.firstname}</td>
                                <td>{person.lastname}</td>
                                <td><button className="btn btn-outline-primary"
                                    onClick={this.deleteUser.bind(this,person._id,index)}>Delete User</button></td>
                            </tr>
                            ))
                            :null}

                    </tbody>
                </table>
            </div>
        )

    }
}
export default AdminUserHome;
