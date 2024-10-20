import React, { Component  } from 'react';
import { Redirect, Switch, Route, Link } from "react-router-dom";
import './Farmer.css'
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png'

class Farmer extends Component{

  

  constructor(props) {
    super(props);
    this.state = {value: 'Dharwad',
      islogout: false
    };
  }

  handleChange = (event) =>
    this.setState({value: event.target.value});

    signOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("session");
      this.setState({
        islogout: true
      });
    };

    render() {
      if (!localStorage.getItem("token")) {
        return <Redirect to="/Login" />;
      }
      if (this.state.islogout) {
        return <Redirect to="/Login" />;
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
              <h2 className='fszz'>Welcome <span>$User</span> </h2>
              <h2 className='fszzz'>Grow Smarter, Trade Better, Prosper Faster!</h2>
            </div>
            
            <div className='cardFarm glowFarm'>
              <h1>Ready to Sell!</h1>
              <form className='FarmForm' onSubmit={(event) => {
                event.preventDefault()
                const id = localStorage.getItem("session")
                const name = this.productName.value
                const city = this.state.value
                const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                const image = this.productImage.value
                const cultivationDate = this.productCultivationDate.value
                const quantity = this.productQuantity.value
                const quality = this.productQuality.value
                this.props.createProduct(id, name, price, city, image, cultivationDate, quantity, quality)
              }}>
                <div className='flex-grpP'>
                  <div className='flex-grp flex-grpL'>
                    <div className="form-group">
                      <input
                        id="productName"
                        type="text"
                        ref={(input) => { this.productName = input }}
                        className="form-control"
                        placeholder="Product Name"
                        required />
                    </div>
                    <div className="form-group">
                      <input
                        id="productPrice"
                        type="text"
                        ref={(input) => { this.productPrice = input }}
                        className="form-control"
                        placeholder="Product Price"
                        required />
                    </div>
                    <div className="form-group">
                      <input
                        id="productQuantity"
                        type="number"
                        ref={(input) => { this.productQuantity = input }}
                        className="form-control"
                        placeholder="Quantity"
                        required />
                    </div>
                  </div>
                  
                  <div className='flex-grp flex-grpR'>
                    <div className="form-group">
                      <input
                        id="productImage"
                        type="text"
                        ref={(input) => { this.productImage = input }}
                        className="form-control"
                        placeholder="Product Image URL"
                        required />
                    </div>
                    <div className="form-group">
                      <input
                        id="productCultivationDate"
                        type="date"
                        ref={(input) => { this.productCultivationDate = input }}
                        className="form-control"
                        required />
                    </div>
                  </div>
                </div>
                
                
                <div className="form-group form-group-quality">
                  <input
                    id="productQuality"
                    type="text"
                    ref={(input) => { this.productQuality = input }}
                    className="form-control quality"
                    placeholder="Quality Description"
                    required />
                </div>
                <form>
                    <label>Select City:  </label>
                    <select value={this.state.value1} onChange={this.handleChange}>
                      <option value="Dharwad">Ravet</option>
                      <option value="Haliyal">Pimpri</option>
                      <option value="Dandeli">Chinchwad</option>
                    </select>
                </form>
                <button type="submit" className="btnn">Add Product</button>
              </form>
            </div>
            
            <p>&nbsp;</p>
            <h2>Product List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product ID</th>
                  <th scope="col">Farmer ID</th>
                  <th scope="col">Name</th>
                  <th scope='col'>Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Owner</th>
                  <th scope="col">City</th>
                  <th scope="col">Is this sold</th>
                  <th scope="col">Quality approved</th>
                  
                </tr>
              </thead>
              <tbody id="productList" className='productlist'>
                { this.props.products.map((product, key) => {
                  return(product.farmerID.toString()==localStorage.getItem("session")
                    ?
                    <tr key={key}>
                      <th scope="row">{product.id.toString()}</th>
                      <th scope="roe">{product.farmerID.toString()}</th>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
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
          </div>
        );
    }

    
    

}

export default Farmer;