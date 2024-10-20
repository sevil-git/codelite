import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      },
      errorMessage: ""
    };
  }

  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };

  login = (user_id) => {
    localStorage.setItem("token", "T");
    localStorage.setItem("session", user_id);
    this.setState({
      islogged: true
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { user_id, user_password } = this.state.loginParams;
  
    console.log("Entered ID:", user_id);
    console.log("Entered Phone:", user_password);
  
    // Find the farmer with matching credentials
    const farmer = this.props.farmers.find(farmer => {
      console.log("Farmer ID:", farmer.id);
      console.log("Farmer Phone:", farmer.phone);
      return farmer.name === user_id && farmer.phone.toString() === user_password;
    });
  
    if (farmer) {
      this.login(farmer.id);
    } else {
      this.setState({ errorMessage: "Invalid ID or Password" });
    }
  };
  

  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/Farmer" />;
    }

    return (
      <div className="container">
        <div className="card glow">
          <form onSubmit={this.handleSubmit} className="form-signin">
            <h1 className="sgnhead h3 mb-3 font-weight-normal">Please Sign In</h1>
            <div className="row">
              <div className="col">
                <div className="form-group mr-sm-2">
                  <input
                    id="FarmerID"
                    name="user_id"
                    type="text"
                    ref={(input) => { this.FarmerID = input }}
                    onChange={this.handleFormChange}
                    className="form-control"
                    placeholder="Farmer ID"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="PhoneNo"
                    name="user_password"
                    type="password"
                    ref={(input) => { this.PhoneNo = input }}
                    onChange={this.handleFormChange}
                    className="form-control"
                    placeholder="Phone Number"
                    required />
                </div>
                <button type="submit" className="btnn">Login</button>
              </div>
            </div>
            {this.state.errorMessage && 
              <div className="alert alert-danger" role="alert">
                {this.state.errorMessage}
              </div>
            }
          </form>
          <p>Don't have an Account..? <a href="/Register">Click here</a></p>
        </div>
      </div>
    );
  }
}

export default Login;
