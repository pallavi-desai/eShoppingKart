import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
import slider1 from "../Images/slider1.jpg";
import slider2 from "../Images/slider2.jpg";
import slider3 from "../Images/slider3.jpg";
import "../CSS/Slider.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Slider extends Component {
    render() {
        return (<div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 imgStyle"
                            src={slider1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 imgStyle"
                            src={slider2}
                            alt="second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 imgStyle"
                            src={slider3}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Slider;
