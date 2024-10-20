import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class QtLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      },
      errorMsg: ""
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

  login = () => {
    let user_id = this.state.loginParams.user_id;
    let user_password = this.state.loginParams.user_password;

    // Store session token and user ID
    localStorage.setItem("qtoken", "T");
    localStorage.setItem("qsession", user_id);

    console.log(localStorage.getItem("qtoken"));
    console.log(localStorage.getItem("qsession"));

    this.setState({
      islogged: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    const { user_id, user_password } = this.state.loginParams;
    const matchedQtUser = this.props.qtestings.find(
      (qtesting) => qtesting.name === user_id && qtesting.city === user_password
    );

    if (matchedQtUser) {
      this.login();
    } else {
      this.setState({ errorMsg: "Invalid name or city" });
    }
  };

  render() {
    if (localStorage.getItem("qtoken")) {
      return <Redirect to="/QTesting" />;
    }

    return (
      <div className="container">
        <div className="card glow">
          <form onSubmit={this.handleSubmit} className="form-signin">
            <h1 className="sgnhead h3 mb-3 font-weight-normal">Please sign in</h1>
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
                    placeholder="name"
                    required
                  />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="FarmerID"
                    name="user_password"
                    type="password"
                    ref={(input) => { this.PhoneNo = input }}
                    onChange={this.handleFormChange}
                    className="form-control"
                    placeholder="city"
                    required
                  />
                </div>
                <button type="submit" className="btnn">Login</button>
              </div>
            </div>

            {this.state.errorMsg && (
              <div className="alert alert-danger mt-2">{this.state.errorMsg}</div>
            )}
          </form>

          <p>Don't have Account..? <a href="/QtRegister">Click here</a></p>
        </div>
        
      </div>
    );
  }
}

export default QtLogin;
