import React, { useState } from 'react';
import { Form, Toast } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../CSS/updateprod.css';
import axios from 'axios';
import {Link} from 'react-router-dom'


const INITIALIZE_DISCOUNT = {
    promocode: "",
    discountpercent: ""

}

function UpdateDiscount() {

    const [discount, setDiscount] = useState(INITIALIZE_DISCOUNT);

    const [success, SetSuccess] = useState(false);

    const showtoast = () => {
        SetSuccess(!success)
    };



    function handleChange(event) {
        const { name, value } = event.target;

        setDiscount(prevState => ({ ...prevState, [name]: value }))

    }

    function makeEmpty() {
        const fields = document.getElementsByClassName('inp');
        for (const field of fields) {
            field.value = "";
        }
    }

    function checkEmpty() {
        const promocode = document.getElementById('promocode')
        const discountpercent = document.getElementById('discountpercent')
        if ((promocode.value === "") || (discountpercent.value === "")) {
            alert("Please fill all the fields");
            return false;
        }

        return true;
    }

    async function handleSubmit(event) {
        //to prevent refreshing the page
        event.preventDefault()
        if (checkEmpty()) {
            setDiscount(INITIALIZE_DISCOUNT)
            await axios({
                method: "PUT",
                url: "https://csci-5709-shoppingkart-group24.herokuapp.com/discounts/updatediscount/" + document.getElementById('promocode').value,
                data: { discountpercent : document.getElementById('discountpercent').value }
            })
            .then((response) => {
                if (response.data.Status === "Success") {
                    SetSuccess(true)
                    makeEmpty()

                }
                else {
                    alert("A record with the promocode does not exist")
                    makeEmpty()

                }
            })
        }
        else {
            SetSuccess(false);

        }
    }

    return (
        <div className="wrapper">

            <div align="right" className="container">
            <br/>
                <div className="row">
                <div className="col-sm-3">
                        <Link to="/manageDiscount"><button className="btn btn-primary">Create Discount</button></Link>
                    </div>
                    <div className="col-sm-3">
                        <Link to="/removeDiscount"> <button className="btn btn-primary">Delete Discount</button></Link>
                    </div>
                    <div className="col-sm-3">
                        <Link to="/alldiscounts"> <button className="btn btn-primary">Discount Data</button></Link>
                    </div>
                </div>
            </div>

            <div className="form_area">

                <h1>Update Discount %</h1>
                <Form method="post">
                    <Toast show={success} onClose={showtoast} className="toast-box">
                        <Toast.Header>
                            <strong className="mr-auto">Success!!!</strong>
                        </Toast.Header>
                        <Toast.Body>Discount % has been updated</Toast.Body>
                    </Toast>
                    <Form.Group>
                        <input
                            name="promocode"
                            label="id"
                            placeholder="Promocode"
                            type="text"
                            id="promocode"
                            className="inp"
                            onChange={handleChange}
                        />

                    </Form.Group>
                    <Form.Group>
                        <input
                            name="discountpercent"
                            placeholder="Discount in %"
                            type="text"
                            id="discountpercent"
                            className="inp"
                            label = {discount}
                            onChange={handleChange}
                        />
                    </Form.Group>

                </Form>
                <button type="submit" className="submit" onClick={handleSubmit}>
                    <span>Submit</span>
                    <FaShoppingCart />
                </button>
            </div>
            <div style={{margin: "50px"}}/>
        </div>
    );
}

export default UpdateDiscount;
