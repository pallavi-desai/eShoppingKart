import React, { Component } from "react";
import "../CSS/NavBar.css";
import { Link, withRouter } from "react-router-dom";
import Suggestion from "./suggestion";
import Axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

let storage = window.localStorage;

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: false,
      suggestion: [],
      selectedTup: [],
      nav: [],
      side: [],
      modalShow: false,
      location: storage.getItem("location")?storage.getItem("location"):"",
      message: "",
    };
    this.cities = ["halifax", "quebec", "toronto", "calgary", "victoria"];
    this.side_panel = [
      { name: "Home", url: "", cname: "item", linkClass: "link" },
      { name: "Help", url: "help", cname: "item", linkClass: "link" },
      {
        name: "Cart",
        url: "mycart",
        cname: "item hide-nav",
        linkClass: "link",
      },
      {
        name: "Login",
        url: "login",
        cname: "item hide-nav",
        linkClass: "link",
      },
      {
        name: "Register",
        url: "register",
        cname: "item hide-nav",
        linkClass: "link",
      },
      { name: "Profile", url: "profile", cname: "item", linkClass: "link" },
      {
        name: "Orders",
        url: "order-history",
        cname: "item",
        linkClass: "link",
      },
      { name: "Admin", url: "admin", cname: "item", linkClass: "link" },
      {
        name: "Logout",
        url: "logout",
        cname: "item hide-nav",
        linkClass: "link",
      },
    ];

    this.navigate = [
      { name: "Cart", url: "mycart", cname: "link" },
      { name: "Login", url: "login", cname: "link" },
      { name: "Register", url: "register", cname: "link" },
      { name: "Logout", url: "logout", cname: "link" },
    ];

    this.toggle = this.toggle.bind(this);
    this.validate = this.validate.bind(this);
    this.showList = this.showList.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    let nav = [],
      side = [];
    nav.push(this.navigate[0]);
    side.push(this.side_panel[0]);
    side.push(this.side_panel[1]);
    side.push(this.side_panel[2]);

    const user = window.localStorage.getItem("username");

    if (user === null) {
      nav.push(this.navigate[1]);
      nav.push(this.navigate[2]);
    } else if (user === "admin") {
      nav.push(this.navigate[3]);
    } else {
      nav.push(this.navigate[3]);
    }

    if (user === null) {
      side.push(this.side_panel[3]);
      side.push(this.side_panel[4]);
    } else if (user === "admin") {
      side.push(this.side_panel[7]);
    } else {
      side.push(this.side_panel[5]);
      side.push(this.side_panel[6]);
    }

    if (user !== null) {
      side.push(this.side_panel[8]);
    }

    this.setState({
      nav: nav,
      side: side,
    });
  }

  toggle() {
    const isShowing = this.state.showing;
    this.setState({
      showing: !isShowing,
    });
  }

  async validate(e) {
    if ((e.type === "keydown" && e.keyCode === 13) || e.type === "click") {
      const val = document.getElementById("search").value;
      if (val === "") {
        alert("Please enter a search string");
      } else {
        let url = storage.getItem("location")
          ? "https://csci-5709-shoppingkart-group24.herokuapp.com/location/getSearchedProductsByLocation/" +
            storage.getItem("location") +
            "/" +
            val
          : "https://csci-5709-shoppingkart-group24.herokuapp.com/product/getSearchedProduct/" +
            val;

        const data = await Axios.get(url);
        this.setState({
          suggestion: [],
        });

        document.getElementById("search").value = "";

        this.props.history.push("/result", {
          query: val,
          data: data.data.data,
          check: false,
        });
      }
    }
  }

  async showList(e) {
    const userInp = e.target.value;
    let suggestion = [];

    if (userInp.length > 0) {
      let url = storage.getItem("location")
        ? "https://csci-5709-shoppingkart-group24.herokuapp.com/location/getSuggestionsByLocation/" +
          storage.getItem("location") +
          "/" +
          userInp
        : "https://csci-5709-shoppingkart-group24.herokuapp.com/product/getSuggestion/" +
          userInp;

      const data = await Axios.get(url);
      suggestion = data.data.data;
    }
    this.setState({
      suggestion: suggestion,
    });
  }

  suggestionList() {
    if (this.state.suggestion.length === 0) {
      return null;
    }
    return (
      <div className="suggestion">
        {this.state.suggestion.map((item, index) => {
          return (
            <Suggestion key={index} name={item} onClick={this.itemClick} />
          );
        })}
      </div>
    );
  }

  itemClick(e) {
    document.getElementById("search").value = e.target.innerText;

    const tup = this.state.suggestion.filter((t) => {
      return t.name === e.target.innerText;
    });

    this.setState({
      suggestion: [],
      selectedTup: tup,
    });
  }

  handleClose() {
    this.setState({
      modalShow: false,
    });
  }

  handleLocationSubmission() {
    let location = document.getElementById("location").value;
    if (location === null || location === "") {
      storage.removeItem("location");
      this.setState({
        location
      });
      this.handleClose();
      window.location.reload(false);
    } else {
      let loc = location.toLocaleLowerCase();
      if (this.cities.includes(loc)) {
        storage.setItem("location", loc);
        this.setState({
          location
        });
        this.handleClose();
        window.location.reload(false);
      } else {
        this.setState({
          location: "",
          message: "Sorry! We do not deliver to this location",
        });
      }
    }
  }

  render() {
    return (
      <nav className="bar">
        <div className="menu" onClick={this.toggle} />
        <div
          className={
            this.state.showing ? "search-bar search-move" : "search-bar"
          }
        >
          <div className="search">
            <input
              type="text"
              id="search"
              placeholder="Search"
              onKeyDown={this.validate}
              onChange={this.showList}
            />
          </div>
          <div className="search-icon" onClick={this.validate} />
          {this.suggestionList()}
        </div>
        <ul className="right">
          {this.state.nav.map((item, index) => {
            return (
              <li key={index}>
                <div className="label">{item.name}</div>
                <Link to={item.url} className={item.cname} />
              </li>
            );
          })}
        </ul>
        <Link to={"/"}>
          <div className="logo" />
        </Link>
        <div
          className={
            this.state.showing ? "side-panel show-panel" : "side-panel"
          }
        >
          <ul>
            {this.state.side.map((item, index) => {
              return (
                <li className={item.cname} key={index}>
                  <div className="label">{item.name}</div>
                  <div className="arrow" />
                  <Link to={item.url} className={item.linkClass} />
                </li>
              );
            })}
            <li className="item">
              <div className="arrow" />
              <button
                className="label location-button"
                onClick={() => this.setState({ modalShow: true })}
              >
                Location
              </button>
            </li>
          </ul>
        </div>
        <Modal
          show={this.state.modalShow}
          size="lg"
          onHide={this.handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Location
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="search"
              className="inp" 
              placeholder="Enter your location"
              id="location"
              name="location"
              defaultValue={this.state.location}
            />
            <p>{this.state.message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleLocationSubmission()}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </nav>
    );
  }
}

export default withRouter(Navigation);
