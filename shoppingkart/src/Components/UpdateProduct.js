import React, { useState } from 'react';
import { Form, Toast, Col } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../CSS/updateprod.css';
import axios from 'axios';
import {Link} from 'react-router-dom'


const INITIALIZE_PRODUCTS = {
    product_id:'',
    product_price: '',
    product_description: '',
    product_img: '',
    product_qty : '',

}

function UpdateProduct() {

    const [product, setProduct] = useState(INITIALIZE_PRODUCTS);

    const [success, SetSuccess] = useState(false);

    const showtoast = () => SetSuccess(!success);



    function handleChange(event) {
        const { name, value } = event.target;

        setProduct(prevState => ({ ...prevState, [name]: value }))

    }

    function checkEmpty() {
        const productid = document.getElementById('id');
        const price = document.getElementById('price');
        const desp = document.getElementById('desp');
        const img = document.getElementById('img');
        const qty = document.getElementById('prodqty');


        if ((productid.value === "") || (price.value === "") || (desp.value === "") || (img.value === "")
        || (qty.value === "")) {
            alert("Please fill all the fields");
            return false;
        }

        return true;
    }

    async function handleSubmit(event) {
        //to prevent refreshing the page
        event.preventDefault()
        if (checkEmpty()) {
            setProduct(INITIALIZE_PRODUCTS)
            INITIALIZE_PRODUCTS.product_id = document.getElementById('id').value;
            INITIALIZE_PRODUCTS.product_price= document.getElementById('price').value;
            INITIALIZE_PRODUCTS.product_description = document.getElementById('desp').value;
            INITIALIZE_PRODUCTS.product_img = document.getElementById('img').value;
            INITIALIZE_PRODUCTS.product_qty = document.getElementById('prodqty').value;


            await axios({
                method: "POST",
                url:"https://csci-5709-shoppingkart-group24.herokuapp.com/admin/editProduct",
                data:  INITIALIZE_PRODUCTS
              }).then((response)=>{
                if(response.data.Success===false)
                {
                    alert("ProductsSpec with entered ID does not exist")
                }
                else{
                    SetSuccess(true)
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

                <h1>Update an exisitng product</h1>
                <Form method="post">
                    <Toast show={success} onClose={showtoast} className="toast-box">
                        <Toast.Header>
                            <strong className="mr-auto">Success!!!</strong>
                        </Toast.Header>
                        <Toast.Body>ProductsSpec has been updated</Toast.Body>
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
                    <Form.Row>

                        <Form.Group as={Col}>
                            <input
                                name="price"
                                label="Price"
                                placeholder="Price"
                                min="0.00"
                                step="0.01"
                                type="Number"
                                id="price"
                                className="inp"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                        <input
                                name="prodqty"
                                placeholder="ProductsSpec Quantity"
                                type="number"
                                id="prodqty"
                                className="inp"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <input
                            name="media"
                            label="Media"
                            content="Select Image"
                            placeholder="Image URL"
                            type="text"
                            id="img"
                            className="inp"
                            onChange={handleChange}
                        />

                    </Form.Group>
                    <Form.Group>
                        <textarea
                            name="description"
                            label="Description"
                            placeholder="  ProductsSpec Description"
                            type="textarea"
                            id="desp"
                            rows="3"
                            cols="60"
                            onChange={handleChange}
                        ></textarea>
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

export default UpdateProduct;
