/**

 @author    Rashmika Ibrahimpatnam => B00832190

 **/
import React, { Component } from "react";
import Axios from "axios";
import '../CSS/discountdata.css';
import {Link} from 'react-router-dom'


class DiscountData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            discountdata: []
        }
    }

    async componentDidMount() {
        const url = "https://csci-5709-shoppingkart-group24.herokuapp.com/discounts";
        console.log("here at mount");
        const response = await Axios.get(url);
        if (response.data.Status === "Success") {
            this.setState({
                discountdata: response.data.data
            })
        }
    }
    show() {
        return (

            <table>
                <thead>
                    <tr>
                        <th>Promocode</th>
                        <th>Discount in % </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.discountdata.map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td>{val.promocode}</td>
                                    <td>{val.discount}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="wrapper">

            <div align="right" className="container">
                <br />
                <div className="row">

                    <div className="col-sm-3">
                        <Link to="/updateDiscount"><button className="btn btn-primary">Update Discount</button></Link>
                    </div>
                    <div className="col-sm-3">
                        <Link to="removeDiscount"> <button className="btn btn-primary">Delete Discount</button></Link>
                    </div>
                    <div className="col-sm-3">
                        <Link to="/manageDiscount"><button className="btn btn-primary">Create Discount</button></Link>
                    </div>
                </div>
            </div>
            <div className="table_area">
                <h1> Discount Data </h1>
                {this.show()}

                </div>
                <div style={{margin: "50px"}}/>
            </div>
        );
    }
}

export default DiscountData;
