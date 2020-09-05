import React, {Component} from "react";
import '../CSS/AboutUs.css'

class AboutUs extends Component {
    render() {
        return (
            <div className="company-section">
                <p className="heading">Shopping Kart</p>
                <p className="text">The future of Groceries Shopping</p>
                <div className="goals">
                    <div className="goal">
                        <div className="section delivery"/>
                        <div className="goal-title">Express Delivery</div>
                    </div>
                    <div className="goal">
                        <div className="section cart"/>
                        <div className="goal-title">Inventory</div>
                    </div>
                    <div className="goal">
                        <div className="section customer"/>
                        <div className="goal-title">Customer Service</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutUs;
