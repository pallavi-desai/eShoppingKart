import React, {Component} from "react";
import '../CSS/SearchResults.css'
import Card from "./Card";

class Result extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updated: false,
            product: this.props.location.state.data,
            shownProducts: this.props.location.state.data,
            pass: true
        };

        this.filter = this.filter.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        this.setState({
            pass: true
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.updated === false || this.props.location.state.check === false){
            this.props.location.state.check = true;
            this.setState({
                product: this.props.location.state.data,
                shownProducts: this.props.location.state.data,
                updated: true
            })
        }
    }

    filter(e) {

        const current = e.target.value;

        let currentItems;

        if (current === "default") {
            currentItems = this.state.product;
        } else {
            currentItems = this.state.product.filter((item) => {
                return item.category === current;
            });
        }

        document.getElementById("sortType").value = "default";

        this.setState({
            shownProducts: currentItems
        });
    }

    sort(e) {

        const current = e.target.value;

        let currentItems = this.state.shownProducts;

        if(current === "price_lh"){
            currentItems = this.state.shownProducts.sort((a, b) => a.productPrice - b.productPrice);
        }else if(current === "price_hl"){
            currentItems = this.state.shownProducts.sort((a, b) => b.productPrice - a.productPrice);
        }else if(current === "alpha_az"){
            currentItems = this.state.shownProducts.sort(function(a, b){
                if(a.productName < b.productName) { return -1; }
                if(a.productName > b.productName) { return 1; }
                return 0;
            })
        }else if(current === "alpha_za"){
            currentItems = this.state.shownProducts.sort(function(a, b){
                if(a.productName < b.productName) { return 1; }
                if(a.productName > b.productName) { return -1; }
                return 0;
            })
        }

        this.setState({
            shownProducts: currentItems
        });

    }

    updateList() {

        if (this.state.shownProducts.length === 0) {
            if (this.props.location.state.query === "") {
                return (
                    <div className="nomatch">No search text entered</div>
                );
            }

            return (
                <div className="nomatch">No Match Found</div>
            );
        }

        return (
            this.state.shownProducts.map((item, index) => {
                return (
                    <Card key={index}
                          id={item.productID}
                          name={item.productName}
                          price={item.productPrice}
                          category={item.category}
                          image={item.imageURL}
                    />
                )
            })
        );
    }

    render() {
        return (
            <div>
                <div>
                    <div className="result_tag">Showing Results: {this.props.location.state.query}</div>
                    <div className="sort-filter">
                        <div className="filter">
                            <label>Filter</label>
                            <select className="drop-down" id={"filterType"} onChange={this.filter}>
                                <option value={"default"}>-</option>
                                <option value={"vegetable"}>Vegetables</option>
                                <option value={"fruit"}>Fruits</option>
                                <option value={"dairy"}>Dairy</option>
                            </select>
                        </div>
                        <div className="sort">
                            <label>Sort</label>
                            <select className="drop-down" id={"sortType"} onChange={this.sort}>
                                <option value={"default"}>-</option>
                                <option value={"price_lh"}>Price: Low to High</option>
                                <option value={"price_hl"}>Price: High to Low</option>
                                <option value={"alpha_az"}>A to Z</option>
                                <option value={"alpha_za"}>Z to A</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="products">{this.updateList()}</div>
            </div>
        );
    }
}

export default Result;
