import React, { useState } from 'react';
import { Form, Toast } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../CSS/deleteprod.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

const PRODUCT_INFO = {
    product_id:'',
}

function DeleteProduct() {

    const [product, setProduct] = useState(PRODUCT_INFO);

    const [success, SetSuccess] = useState(false);

    const showtoast = () => {
        SetSuccess(!success)
    };

    function handleChange(event) {
        const { name, value } = event.target;

        setProduct(prevState => ({ ...prevState, [name]: value }))

    }


    function checkEmpty() {
        const productid = document.getElementById('id');

        if (productid.value === "") {
            alert("Please enter the product ID");
            return false;
        }

        return true;
    }

    async function handleSubmit(event) {
        //to prevent refreshing the page
        event.preventDefault()
        if (checkEmpty()) {
            setProduct(PRODUCT_INFO)
           PRODUCT_INFO.product_id = document.getElementById('id').value;

            axios({
                method: "POST",
                url:"https://csci-5709-shoppingkart-group24.herokuapp.com/admin/deleteProduct",
                data:  PRODUCT_INFO
              }).then((response)=>{
                if(response.data.Success){
                    console.log("ProductsSpec deleted successfully")
                    SetSuccess(true)
                }
                else{
                    alert("The product ID does not exists")
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
                        <Link to="/createProduct"><button id="button1" className="btn btn-primary">Insert ProductsSpec</button></Link>
                    </div>
                    <div className="col-sm-3">
                       <Link to="/updateProduct"><button id="button2" className="btn btn-primary">Update ProductsSpec</button></Link>
                    </div>
                    <div className="col-sm-3">
                    <Link to="removeProduct"> <button id="button3" className="btn btn-primary">Delete ProductsSpec</button></Link>
                    </div>
                </div>
            </div>

            <div className="form_area">
                <h1>Delete an existing product</h1>
                <Form method="post">
                    <Toast show={success} onClose={showtoast} className="toast-box">
                        <Toast.Header>
                            <strong className="mr-auto">Success!!!</strong>
                        </Toast.Header>
                        <Toast.Body>Product has been deleted</Toast.Body>
                    </Toast>
                    <Form.Group>
                        <input
                            name="id"
                            label={product}
                            placeholder="ProductsSpec ID"
                            type="number"
                            id="id"
                            className="inp"
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

export default DeleteProduct;
