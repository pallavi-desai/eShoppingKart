import React, { Component } from "react";
import '../CSS/UserProfile.css';
import axios from 'axios';
const mystorage = window.localStorage;

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisabled: true,
            fn: '',
            ln: '',
            addr: '',

            fname: { status: false, text: '' },
            lname: { status: false, text: '' },
            address: { status: false, text: '' },
            main: { status: false, text: '' }
        }

        this.edit = this.edit.bind(this);
        this.validate = this.validate.bind(this);
        this.update = this.update.bind(this);

    }

    componentDidMount() {
        axios.get("https://csci-5709-shoppingkart-group24.herokuapp.com/users/getuser/" + mystorage.getItem("username")).then((res) => {
            //console.log(res);
            if (res.data.Status === "Success") {
                this.setState({
                    fn: res.data.data[0].firstname,
                    ln: res.data.data[0].lastname,
                    addr: res.data.data[0].address
                })
            }

        })
            .catch(err => {
                console.log(err);
            })
    }

    validate(e) {
        const field = e.target;
        let update = {};

        switch (e.target.id) {
            case 'fname':
                if (field.value === "") {
                    update = { status: true, text: 'First Name is required' }
                } else if (field.value.length < 4 || field.value.length > 21) {
                    update = { status: true, text: 'Length between 4 & 21' }
                } else {
                    update = { status: false, text: '' }
                }
                this.setState({
                    fname: update,
                    fn: e.target.value
                });
                break;
            case 'lname':
                if (field.value === "") {
                    update = { status: true, text: 'Last Name is required' }
                } else if (field.value.length < 4 || field.value.length > 21) {
                    update = { status: true, text: 'Length between 4 & 21' }
                } else {
                    update = { status: false, text: '' }
                }
                this.setState({
                    lname: update,
                    ln: e.target.value
                });
                break;
            case 'address':
                if (field.value === "") {
                    update = { status: true, text: 'Address is required' }
                } else {
                    update = { status: false, text: '' }
                }
                this.setState({
                    address: update,
                    addr: e.target.value
                });
                break;
            default:
                break;
        }
    }

    edit() {
        this.setState({
            isDisabled: false
        })
    }

    update() {
        if (this.state.isDisabled) {
            alert("Please go to edit mode");
        } else if (this.state.fname.status || this.state.lname.status || this.state.address.status) {
            this.setState({
                main: { status: true, text: 'Please correct the errors!!' }
            });
            setTimeout(() => {
                this.setState({
                    main: { status: false, text: '' }
                });
            }, 2500);
        } else {
            this.setState({
                isDisabled: true
            });
            const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/users/editprofile/" + document.getElementById("uname").value;
            axios.put(url, {
                firstname: document.getElementById("fname").value,
                lastname: document.getElementById("lname").value,
                address: document.getElementById("address").value
            })
                .then(res => {

                    if (res.data.Status === "Success") {
                        alert("Updated");
                        this.props.history.push('/');

                    }
                })


        }
    }

    render() {
        return (
            <div>
                <div className="profile-area">
                    <div className="profile-image">Profile Image</div>
                    <div className="profile-details">
                        <form>
                            <i className="fa fa-pencil edit" onClick={this.edit}>
                                <span className="tag">Edit</span>
                            </i>
                            <div className="input-section">
                                <label htmlFor="uname">User Name</label>
                                <input type="text" id="uname" className="inp" value={mystorage.getItem("username")} disabled />
                            </div>
                            <div className="input-section">
                                <label htmlFor="fname">First Name</label>
                                <input type="text" id="fname" className="inp" value={this.state.fn}
                                    disabled={this.state.isDisabled} onChange={this.validate} />
                                {this.state.fname.status ? <div className="error">{this.state.fname.text}</div> : null}
                            </div>

                            <div className="input-section">
                                <label htmlFor="lname">Last Name</label>
                                <input type="text" id="lname" className="inp" value={this.state.ln}
                                    disabled={this.state.isDisabled} onChange={this.validate} />
                                {this.state.lname.status ? <div className="error">{this.state.lname.text}</div> : null}
                            </div>

                            <div className="input-section">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" className="inp" value={this.state.addr}
                                    disabled={this.state.isDisabled} onChange={this.validate} />
                                {this.state.address.status ? <div className="error">{this.state.address.text}</div> : null}
                            </div>
                        </form>

                        <div className="input-section">
                            {this.state.main.status ? <div className="submitError">{this.state.main.text}</div> : null}
                            <button className="submit" onClick={this.update}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
