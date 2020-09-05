import React,{Component} from 'react'
import Container from 'react-bootstrap/Container';
import { Table, Card, Col, Image, Button} from 'react-bootstrap';
import '../CSS/order.css'
import {withRouter} from "react-router-dom";
import Axios from "axios";
import AddReview from './AddReview';

let storage = window.localStorage;

class Orders extends Component {
    constructor(props){
        super(props)
        this.state = {
            orders : [],
            tab: []
        }
    }
    componentDidMount() {
        const user = storage.getItem("username");
        if(user === "" || user === undefined){
            this.props.history.push('/')
        }else{
            let url = "https://csci-5709-shoppingkart-group24.herokuapp.com/orders/getOrders"
            Axios.post(url,{
                username: storage.getItem("username")
            }).then(data => {
                this.setState({
                    orders : data.data.data
                })
            });


        }

    }


    setOrderTable() {
        let tab = []
        for(let order in this.state.orders){
            tab.push(
            <Table bordered>
                <tbody>
                <tr>
                    <th style={{"background":"darkcyan"}}>Order Status <p> {this.state.orders[order].orderStatus}</p></th>
                    <th style={{"background":"darkcyan"}}>Total amount<p> ${this.state.orders[order].grandTotal}</p></th>
                    <th style={{"background":"darkcyan"}}>Order Number <p> {this.state.orders[order]._id}</p></th>
                </tr>
                {this.state.orders[order].orderItems.map((or,i) =>{
                    const buyNow = () => {
                        this.props.history.push("/product",{query: or.id})
                    }
                    return(
                    <tr>
                    <p className="font-weight-bold ml-2">{or.orderStatus}</p>
                    <Col className="text-center mt-1">
                        <Image style={{ "width": "100px", "height": "100px" }}
                            src={or.img}
                            fluid />
                    </Col>
                    <td style={{"background":"white"}}>
                        <p>{or.name}</p>

                    </td>
                    <td style={{"background":"white"}}>
                        <Button onClick={buyNow}
                        variant="dark" className="buts mt-2">Buy again</Button>
                       <div className="review-section">
                       <AddReview parentProps={this.props} productId={or.id} orderId={this.state.orders[order]._id}/>
                       </div>
                    </td>
                </tr>
                    )
                })}

                </tbody>
            </Table>)
        }

        if(tab.length === 0){
            tab.push(
                <div >
                    <br />
                    <p>You dont have orders yet</p>
                    <br />
                </div>
            )
        }

        return tab;
    }

    componentDidUpdate(){

    }

    render() {
        return (
            <div className="wrapper">
                <Container className="mt-4">
                    <Card>
                        <p></p>
                        <Card.Header><p className="display-4">Your orders</p></Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-sm">
                                    {this.setOrderTable()}
                                </div>

                            </div>

                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default withRouter(Orders);
