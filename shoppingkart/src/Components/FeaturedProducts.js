import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Product from "./ProductsSpec";
import Axios from "axios";
//Component for displaying all the featured products on home page
class FeaturedProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            list1:[],
            list2:[],
            list3:[]
        }
    }
    //Shuffles the array in random order
    arrayShuffle(array) {
        let arrayLength = array.length;
        while (arrayLength > 0) {
            let randomIndex = Math.floor(Math.random() * arrayLength);
            arrayLength = arrayLength - 1;
            let tempArray = array[arrayLength];
            array[arrayLength] = array[randomIndex];
            array[randomIndex] = tempArray;
        }

        return array;
    }

    async componentDidMount() {
        let url = window.localStorage.getItem("location")?"https://csci-5709-shoppingkart-group24.herokuapp.com/location/getTopProductsByLocation/"+window.localStorage.getItem("location") : "https://csci-5709-shoppingkart-group24.herokuapp.com/product/getTopProducts";
        const products  = await Axios.get(url);
        this.setState( {
            list: products.data.data
        })
        this.setState({
            list: this.arrayShuffle(this.state.list)
        })
        for(let i=0;i<this.state.list.length;i++){
            if(i<=3){
                this.setState( {
                    list1: this.state.list1.concat(this.state.list[i])
                })
            }else if(i>=4 && i<=7){
                this.setState( {
                    list2: this.state.list2.concat(this.state.list[i])
                })
            }
            else if(i>=8 && i<12){
                this.setState( {
                    list3: this.state.list3.concat(this.state.list[i])
                })
            }
        }
    }


    generateProductRow(data) {
        /* Fetch products from backend and generate products dynamically*/
        return (

            <div className="row" >
                {
                    data.map((l, index) => (
                        <div className="col-md-2 mt-4 ml-4" key={index}>
                            <Product text={l.productName}
                            img={l.imageURL}
                            productID={l.productID}/>
                        </div>
                    ))
                }
            </div>
        );
    }

    render() {
        return (
            <Container id="featuredProducts">
            <div className="container-fluid">

                {this.generateProductRow(this.state.list1)}
                {this.generateProductRow(this.state.list2)}
                {this.generateProductRow(this.state.list3)}
            </div>
            </Container>
        );
    }
}

export default FeaturedProducts;
