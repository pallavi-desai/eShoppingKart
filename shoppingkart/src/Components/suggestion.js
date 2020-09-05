import React, {Component} from "react";
import '../CSS/suggestion.css';

class Suggestion extends Component {
    render() {
        return (
            <p className="name" onClick={this.props.onClick}>{this.props.name}</p>
        );
    }
}

export default Suggestion;
