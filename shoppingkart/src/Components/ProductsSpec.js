import React from "react";
import { Container, Card } from "react-bootstrap";
import {withRouter} from "react-router-dom";
//Component for handling single product
class ProductsSpec extends React.Component {
    render() {
        return (
            <Container>
                <div className='container-fluid' onClick={() =>
                                this.props.history.push('/product', {'query': this.props.productID})}>
                    <Card>
                        <Card.Img variant="top" src={this.props.img} />
                        <Card.Title className="text-center mt-2">
                            <div onClick={() =>
                                this.props.history.push('/product', {'query': this.props.productID})}>
                                <u>{this.props.text}</u>
                            </div>
                        </Card.Title>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default withRouter(ProductsSpec);
