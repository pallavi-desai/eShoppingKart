import React, {Component} from "react";
import Brand from "./Brands";
import AboutUs from "./AboutUs";
import FeaturedProducts from "./FeaturedProducts";
import Slider from "./Slider";

class Home extends Component {
    render() {
        return (
            <div>
                <Slider />
                <FeaturedProducts />
                <Brand/>
                <AboutUs/>
            </div>
        );
    }
}

export default Home;
