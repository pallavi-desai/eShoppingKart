import React, { useState } from 'react';
import { Form, Toast } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../CSS/createprod.css';
import axios from 'axios';
import { Link } from 'react-router-dom'


const INITIALIZE_DISCOUNT = {
    promocode: "",
    discountpercent: ""

}

function CreateDiscount() {

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
            INITIALIZE_DISCOUNT.promocode = document.getElementById('promocode').value;
            INITIALIZE_DISCOUNT.discountpercent = document.getElementById('discountpercent').value;

            await axios({
                method: "POST",
                url: "https://csci-5709-shoppingkart-group24.herokuapp.com/discounts/managediscounts",
                data: INITIALIZE_DISCOUNT
            }).then((response) => {
                if (response.data.Success === false) {
                    alert("A record with same promocode already exists")
                    makeEmpty()
                }
                else {
                    SetSuccess(true)
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
                <br />
                <div className="row">

                    <div className="col-sm-3">
                        <Link to="/updateDiscount"><button className="btn btn-primary">Update Discount</button></Link>
                    </div>
                    <div className="col-sm-3">
                        <Link to="removeDiscount"> <button className="btn btn-primary">Delete Discount</button></Link>
                    </div>
                    <div className="col-sm-3">
                        <Link to="/alldiscounts"> <button className="btn btn-primary">Discount Data</button></Link>
                    </div>
                </div>
            </div>


            <div className="form_area">

                <h1>Manage Discount</h1>
                <Form method="post">
                    <Toast show={success} onClose={showtoast} className="toast-box">
                        <Toast.Header>
                            <strong className="mr-auto">Success!!!</strong>
                        </Toast.Header>
                        <Toast.Body>your promocode has been posted</Toast.Body>
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
            <div style={{ margin: "50px" }} />
        </div>
    );
}

export default CreateDiscount;
