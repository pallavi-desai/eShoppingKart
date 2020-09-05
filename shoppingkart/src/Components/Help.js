import React,{Component} from "react";
import '../CSS/Help.css';
import Question from "./Question";
import Axios from "axios";

class Help extends Component {

    constructor(props) {
        super(props);

        this.selected = [];

        this.state = {
            chat: [],
            suggestion : []
        };

        this.fillSuggestion = this.fillSuggestion.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }

    componentDidUpdate() {
        this.scroll();
    }

    chat(){
        return (
            <div className="que-ans" id="que-ans">
                <div className="ans">
                    <span>Welcome to Help Center !! Please ask your question</span>
                </div>
                {
                    this.state.chat.map((tup, index) => {
                        return(
                            <div className="set" key={index}>
                                <div className="que">
                                    <span>{tup.question}</span>
                                </div>
                                <div className="ans">
                                    <span>{tup.answer}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    scroll(){
        const que_ans = document.querySelector('#que-ans');
        que_ans.scrollTop = que_ans.scrollHeight;
    }

    async fillSuggestion(e){
        const userInp = e.target.value;
        let suggestion = [];
        if (userInp.length > 0) {
            const data = await Axios.get("https://csci-5709-shoppingkart-group24.herokuapp.com/help/getSuggestion/" + userInp);
            suggestion = data.data.data;
        }
        this.setState({
            suggestion: suggestion
        })
    }

    questionList(){
        if(this.state.suggestion.length === 0){
            return <div className="suggestion__error">No match found or question area blank</div>
        }
        return(
            <div className="queSuggestion">
                {
                    this.state.suggestion.map((item, index) => {
                        return <Question key={index} question={item.question} onClick={this.itemClick} id={item.id}/>
                    })
                }
            </div>
        );
    }

    async itemClick(e) {

        const id = e.target.id;
        const que = e.target.innerText;

        const data = await Axios.get("https://csci-5709-shoppingkart-group24.herokuapp.com/help/getAnswer/" + id);
        const ans = data.data.data;

        this.selected.push({question: que, answer: ans});

        document.getElementById("question").value = "";

        this.setState({
            suggestion : [],
            chat: this.selected
        });
    }

    render() {
        return (
            <div>
                <div className="help-area">
                    <div className="suggestion-box">
                        <div className="suggestion__head">Suggestions</div>
                        {this.questionList()}
                    </div>
                    <div className="chat-box">
                        {this.chat()}
                        <div className="user-area">
                            <input type="text" id="question" className="question" placeholder="Enter your question"
                                   onChange={this.fillSuggestion}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Help;
