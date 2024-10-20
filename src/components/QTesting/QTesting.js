import React, { Component  } from 'react';
import { Redirect, Switch, Route, Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar1.png'

class QTesting extends Component{

  constructor(props) {
    super(props);
    this.state = {value: 'Dharwad',
      islogout: false
    };
  }

  handleChange = (event) =>
    this.setState({value: event.target.value});

    signOut = () => {
      localStorage.removeItem("qtoken");
      localStorage.removeItem("qsession");
      this.setState({
        islogout: true
      });
    };

    render() {
      if (!localStorage.getItem("qtoken")) {
        return <Redirect to="/QtLogin" />;
      }
      if (this.state.islogout) {
        return <Redirect to="/QtLogin" />;
      }
      return (
      <div id="content" className='farmContent'>
        <nav className='navv'>
          <a href='/'>
            <div className='logo'>
              <img alt='logo' src={logo} />
              <h2>Farmingo</h2>
            </div>
          </a>
          
          <div className='user'>
            <div className='userbutton'>
              <img alt='avatar' src={avatar}/>
            </div>
            <button onClick={this.signOut} href="#">
              Sign Out
            </button>
          </div>
              
        </nav>

        <div className='FarmHeader'>
          <h2 className='fszz'>Welcome <span>$Admin</span> </h2>
          <h2 className='fszzz'>Approve, Optimize, and Elevate!</h2>
        </div>
      <div className='flexCenterR'>
        <form onSubmit={(event) => {
          event.preventDefault()
          const id = this.productID.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.qtapproval(id, price)
          }}>
          <div className=" form-group mr-sm-2">
            <div className='QtestingInput'>
              <input
                id="productID"
                type="text"
                ref={(input) => { this.productID = input }}
                placeholder="Enter the Product ID"
                required />
            
              <input
                id="productName"
                type="text"
                ref={(input) => { this.productPrice = input }}          
                placeholder="Approved Price"
                required />
            </div>
            <button type="submit" className="btnn">Approve Product</button>
          </div>
        </form>
        <form className=''>
          <label>Select City:  </label>
          <select value={this.state.value1} onChange={this.handleChange}>
            <option value="Dharwad">Ravet</option>
            <option value="Haliyal">Pimpri</option>
            <option value="Dandeli">Chinchwad</option>
          </select>
          {/* <div className="form-group mr-sm-2">
            <input
              id="productID"
              type="text"
              ref={(input) => { this.productId = input }}
              placeholder="Enter the Farmer ID"
              required />
            <a>&nbsp;</a>
            <a>&nbsp;</a>
            <button type="submit" className="btn btn-primary">Search</button>
          </div> */}
        </form>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Farmer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col">City</th>
            <th scope="col">Market status</th>
            <th scope="col">Quality status</th>
          </tr>
        </thead>
        <tbody id="productList">
          { this.props.products.map((product, key) => {
            return(!product.approved && product.city==this.state.value
              ?
              <tr key={key}>
                <th scope="row">{product.id.toString()}</th>
                <th scope="roe">{product.farmerID.toString()}</th>
                <td>{product.name}</td>
                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                <td>{product.owner}</td>
                <td>{product.city}</td>
                <td>{product.purchased.toString()}</td>
                <td>{product.approved.toString()}</td>
              </tr>
              :null)
          })}
        </tbody>
      </table>
      <p>&nbsp;</p>
      <h1>Approved Products</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Farmer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col">City</th>
            <th scope="col">Market status</th>
            <th scope="col">Quality status</th>
          </tr>
        </thead>
        <tbody id="productList">
          { this.props.products.map((product, key) => {
            return(product.approved && product.city==this.state.value
              ?
              <tr key={key}>
                <th scope="row">{product.id.toString()}</th>
                <th scope="roe">{product.farmerID.toString()}</th>
                <td>{product.name}</td>
                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                <td>{product.owner}</td>
                <td>{product.city}</td>
                <td>{product.purchased.toString()}</td>
                <td>{product.approved.toString()}</td>
              </tr>
              :null)
          })}
        </tbody>
      </table>
      <p>&nbsp;</p>
    </div>
      );
    }
}

export default QTesting;