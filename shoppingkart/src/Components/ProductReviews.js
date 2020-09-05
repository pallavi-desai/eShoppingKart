import React, { Component } from 'react';
import userImage from '../Images/user.png';
import { Container, Table, Card, Col, Image } from 'react-bootstrap';
import Axios from "axios";

class ProductReviews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productReviews: []
        }
        this.addReviews = this.addReviews.bind(this)
    }

    async componentDidMount() {
        let id = this.props.productId + ""
        // To get reviews data from all users
        await Axios.get("https://csci-5709-shoppingkart-group24.herokuapp.com/review/getProductReview/" + id).then(
            res => {
                this.setState({
                    productReviews: res.data.data
                })
            }
        );

    }

    // To show reviews provided by users with their usernames
    addReviews() {
        let rows = [];
        let reviews = this.state.productReviews;
        for (let i = 0; i < this.state.productReviews.length; i++) {
            rows.push(
                <tr>
                    <Col className="text-center mt-1">
                        <Image style={{ "width": "40px", "height": "40px" }}
                            src={userImage} roundedCircle
                            fluid />
                        <p>{reviews[i].userName}</p>
                    </Col>
                    <td>{reviews[i].productDescription}</td>
                </tr>
            );
        }
        if (rows.length > 0) {
            return rows
        }
        else {
            return "No reviews available"
        }

    }

    render() {
        return (
            <div className="mt-5">
                <Container>
                    <Card>
                        <Card.Header>Reviews</Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-sm">
                                    <Table striped bordered hover>
                                        <tbody>
                                            {this.addReviews()}
                                        </tbody>
                                    </Table>
                                </div>

                            </div>

                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default ProductReviews;
