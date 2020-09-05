import React, { Component } from 'react';
import { Form, Button, Col, } from 'react-bootstrap';
import Axios from 'axios';

let myStorage = window.localStorage;

class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_rating: '',
            product_description: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        debugger;
    }


    handleChange(event) {
        if (event.target.name === "rating") {
            this.setState({ 'product_rating': event.target.value });
        }
        else if (event.target.name === "description") {
            this.setState({ 'product_description': event.target.value });
        }
    }

    // To check if rating and description are filled by the user
    checkEmpty() {
        const rating = document.getElementById('rating_'+this.props.orderId);
        const desp = document.getElementById('desp_'+this.props.orderId);

        if (rating.value === "") {
            alert("Please fill rating");
            return false;
        }
        else if (desp.value === "") {
            alert("Please fill description");
            return false;
        }
        return true;
    }

    // To set values in the database for reviews
    async handleSubmit(event) {

        if(this.state.product_rating <= 0 || this.state.product_rating > 5){
            alert("Rating should be be between 1 to 5");
        }else{
            if (myStorage.getItem("token")) {
                event.preventDefault()
                if (this.checkEmpty()) {
                    let payload = {
                        product_rating: this.state.product_rating,
                        product_description: this.state.product_description,
                        user_id: myStorage.getItem("userid"),
                        user_name: myStorage.getItem("username"),
                        product_id: this.props.productId
                    };
                    Axios.post("https://csci-5709-shoppingkart-group24.herokuapp.com/review/putReview", payload)
                        .then(res => {
                            alert("Review added");
                            this.props.parentProps.history.push('/');
                        })
                }
            } else {
                this.props.parentProps.history.push({
                    pathname: "/login"
                });
            }
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <h4>Add Review </h4>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control
                                name="rating"
                                id={"rating_"+this.props.orderId}
                                placeholder="Rating"
                                min="0"
                                step="1"
                                max="5"
                                type="Number"
                                required
                                onBlur={this.handleChange}

                            />
                        </Form.Group>


                        <Form.Group as={Col}>
                            <Form.Control
                                name="description"
                                id={"desp_"+this.props.orderId}
                                label="Description"
                                required
                                placeholder="Description"
                                type="textarea"
                                onBlur={this.handleChange}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit" className="btn-btn-success btn-block" onClick={this.handleSubmit} >
                        Submit
                    </Button>
                </Form>
            </div>


        );
    }

}

export default AddReview;
