import React, {Component} from "react";
import '../CSS/Register.css'
import {Link, withRouter} from "react-router-dom";
import {Form, Col} from 'react-bootstrap';
import {FaUserCircle, FaRegEnvelope, FaLock, FaShoppingCart, FaBirthdayCake} from 'react-icons/fa';
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uname: {status: false, text: ''},
            fname: {status: false, text: ''},
            lname: {status: false, text: ''},
            dob: {status: false, text: ''},
            pass: {status: false, text: ''},
            cpass: {status: false, text: ''},
            main: {status: false, text: ''},
            passCheck: false,
            passPolicy: {
                'lower': {status: false},
                'upper': {status: false},
                'numeric': {status: false},
                'special': {status: false},
                'eight': {status: false}
            }
        };

        this.passCheck = [
            {'id': 'lower', 'error': 'err', 'success': 'err success', 'text': 'At least one lower-case character'},
            {'id': 'upper', 'error': 'err', 'success': 'err success', 'text': 'At least one upper-case character'},
            {'id': 'numeric', 'error': 'err', 'success': 'err success', 'text': 'At least one numeric character'},
            {
                'id': 'special',
                'error': 'err',
                'success': 'err success',
                'text': 'At least one special character (!@#_)'
            },
            {'id': 'eight', 'error': 'err', 'success': 'err success', 'text': 'At least eight characters'}
        ];

        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
        this.hasError = this.hasError.bind(this);
        this.showPolicy = this.showPolicy.bind(this);
        this.hidePolicy = this.hidePolicy.bind(this);
        this.checkPolicy = this.checkPolicy.bind(this);
        this.policyNotSatisfied = this.policyNotSatisfied.bind(this);
    }


    validate(e) {

        const field = e.target;
        let update = {};
        let update_1 = {};

        switch (e.target.id) {
            case 'uname':
                if (field.value === "") {
                    update = {status: true, text: 'User Name is required'}
                } else if (field.value.length < 4 || field.value.length > 21) {
                    update = {status: true, text: 'Length between 4 & 21'}
                } else {
                    update = {status: false, text: field.value}
                }

                this.setState({
                    uname: update
                });
                break;
            case 'fname':
                if (field.value === "") {
                    update = {status: true, text: 'First Name is required'}
                } else if (field.value.length < 4 || field.value.length > 21) {
                    update = {status: true, text: 'Length between 4 & 21'}
                } else {
                    update = {status: false, text: field.value}
                }
                this.setState({
                    fname: update
                });
                break;
            case 'lname':
                if (field.value === "") {
                    update = {status: true, text: 'Last Name is required'}
                } else if (field.value.length < 4 || field.value.length > 21) {
                    update = {status: true, text: 'Length between 4 & 21'}
                } else {
                    update = {status: false, text: field.value}
                }
                this.setState({
                    lname: update
                });
                break;
            case 'dob':
                if (field.value === "") {
                    update = {status: true, text: 'Date of Birth is required'}
                } else {
                    update = {status: false, text: field.value}
                }
                this.setState({
                    dob: update
                });
                break;
            case 'pass':

                this.checkPolicy(field.value);

                if (field.value === "") {
                    update = {status: true, text: 'Password is required'}
                } else {
                    update = {status: false, text: field.value}
                }

                if (field.value !== document.getElementById('cpass').value) {
                    update_1 = {status: true, text: 'Password does not match'}
                }

                this.setState({
                    pass: update,
                    cpass: update_1,
                });
                break;
            case 'cpass':
                if (field.value === "") {
                    update = {status: true, text: 'Confirmed Password is required'}
                } else if (field.value !== document.getElementById('pass').value) {
                    update = {status: true, text: 'Password does not match'}
                } else {
                    update = {status: false, text: field.value}
                }
                this.setState({
                    cpass: update
                });
                break;
            default:
                break;
        }
    }

    register() {
        if (this.checkBlank()) {
            this.setState({
                main: {status: true, text: 'Please fill out empty fields!!'}
            });
            setTimeout(() => {
                this.setState({
                    main: {status: false, text: ''}
                });
            }, 2500);
        } else if (this.hasError()) {
            this.setState({
                main: {status: true, text: 'Please correct the errors!!'}
            });
            setTimeout(() => {
                this.setState({
                    main: {status: false, text: ''}
                });
            }, 2500);
        } else if (this.policyNotSatisfied()) {
            this.setState({
                main: {status: true, text: 'Please follow password policy'},
            });
            this.showPolicy();
            setTimeout(() => {
                this.setState({
                    main: {status: false, text: ''}
                });
            }, 2500);
        } else {
            const newUser = {
                uname: this.state.uname.text.toLowerCase(),
                fname: this.state.fname.text,
                lname: this.state.lname.text,
                dob: this.state.dob.text,
                pass: this.state.pass.text,
                cpass: this.state.cpass.text
            };

            axios.post("https://csci-5709-shoppingkart-group24.herokuapp.com/users/register", newUser)
                .then(res => {
                    if (res.data.status) {
                        alert("User has been registered");
                        this.props.history.push('/login')
                    } else {
                        alert("Username already exist");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            this.makeEmpty();

        }

    }

    checkBlank() {
        const fields = document.getElementsByClassName('inp');
        for (let field of fields) {
            if (field.value === "") {
                return true;
            }
        }
        return false;
    }

    hasError() {
        return (this.state.uname.status || this.state.fname.status || this.state.lname.status ||
            this.state.dob.status || this.state.pass.status || this.state.cpass.status);
    }

    checkPolicy(val) {
        this.setState({
            passPolicy: {
                'lower': {status: val.search(/[a-z]/) >= 0},
                'upper': {status: val.search(/[A-Z]/) >= 0},
                'numeric': {status: val.search(/[0-9]/) >= 0},
                'special': {status: val.search(/[!@#_]/) >= 0},
                'eight': {status: val.length > 7}
            }
        });
    }

    policyNotSatisfied() {
        return (!(this.state.passPolicy['lower'].status && this.state.passPolicy['upper'].status &&
                this.state.passPolicy['numeric'].status && this.state.passPolicy['special'].status &&
                this.state.passPolicy['eight'].status)
        );
    }

    makeEmpty() {
        const fields = document.getElementsByClassName('inp');
        for (const field of fields) {
            field.value = "";
        }
    }

    showPolicy() {
        this.setState({
            passCheck: true
        });
    }

    hidePolicy() {
        this.setState({
            passCheck: false
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className={this.state.main.status ? "form_area onerror" : "form_area"}>

                    <h1>Signup!!</h1>

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <div className="input-section">
                                    <Form.Label> <FaUserCircle/> First Name</Form.Label>
                                    <input type="text" id="fname" className="inp" placeholder="Enter First Name"
                                           onChange={this.validate}/>
                                    {this.state.fname.status ?
                                        <div className="error">{this.state.fname.text}</div> : null}
                                </div>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <div className="input-section">
                                    <Form.Label> <FaUserCircle/> Last Name</Form.Label>
                                    <input type="text" id="lname" className="inp" placeholder="Enter Last Name"
                                           onChange={this.validate}/>
                                    {this.state.lname.status ?
                                        <div className="error">{this.state.lname.text}</div> : null}
                                </div>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <div className="input-section">
                                    <Form.Label> <FaRegEnvelope/> Username </Form.Label>
                                    <input type="text" id="uname" className="inp" placeholder="Enter User Name"
                                           onChange={this.validate}/>
                                    {this.state.uname.status ?
                                        <div className="error">{this.state.uname.text}</div> : null}
                                </div>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <div className="input-section">
                                    <Form.Label> <FaBirthdayCake/> Date of Birth</Form.Label>
                                    <input type="date" id="dob" className="inp"
                                           onChange={this.validate}/>
                                    {this.state.dob.status ? <div className="error">{this.state.dob.text}</div> : null}
                                </div>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <div className="input-section">
                                    <Form.Label> <FaLock/> Password</Form.Label>
                                    <input type="password" id="pass" className="inp" placeholder="Enter A Password"
                                           onChange={this.validate} onFocus={this.showPolicy} onBlur={this.hidePolicy}/>
                                    {this.state.pass.status ?
                                        <div className="error">{this.state.pass.text}</div> : null}
                                    <div className={this.state.passCheck ? "pass-check" : "pass-check hide"}>
                                        {
                                            this.passCheck.map((item, index) => {
                                                return (
                                                    <p key={index} id={item.id}
                                                       className={this.state.passPolicy[item.id].status
                                                           ? item.success : item.error}>{item.text}</p>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <div className="input-section">
                                    <Form.Label> <FaLock/> Confirm Password</Form.Label>
                                    <input type="password" id="cpass" className="inp" placeholder="Re-Enter Password"
                                           onChange={this.validate}/>
                                    {this.state.cpass.status ?
                                        <div className="error">{this.state.cpass.text}</div> : null}
                                </div>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <div className="input-section">
                        <button className="submit" onClick={this.register}>
                            <span>Register</span>
                            <FaShoppingCart/>
                        </button>
                        {this.state.main.status ? <div className="submitError">{this.state.main.text}</div> : null}
                    </div>
                    <div className="redirect">
                        <span className="ext-text">Already a User?</span>
                        <Link to={'login'} className="linkLogin">Login</Link>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default withRouter(Register);
