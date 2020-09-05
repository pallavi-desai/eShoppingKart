import React, {Component} from "react";
import '../CSS/Question.css';

class Question extends Component {
    render() {
        return (
            <p className="q" onClick={this.props.onClick} id={this.props.id}>{this.props.question}</p>
        );
    }
}

export default Question;
