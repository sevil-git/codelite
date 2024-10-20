import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar1.png'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = { value: 'Dharwad', products: this.props.products }; // Products are managed in state
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("session");
    this.setState({
      islogout: true
    });
  };

  // Function to simulate product purchase and update state
  purchaseProduct = (productId) => {
    const products = this.state.products.map(product => {
      if (product.id === productId) {
        return { ...product, purchased: true };  // Set purchased to true
      }
      return product;
    });

    this.setState({ products });
    alert('Product purchased successfully!');
  };

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/BuyerLogin" />;
    }
    if (this.state.islogout) {
      return <Redirect to="/BuyerLogin" />;
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
              <img alt='avatar' src={avatar} />
            </div>
            <button onClick={this.signOut} href="#">
              Sign Out
            </button>
          </div>
        </nav>

        <h2>Buy Product</h2>
        <form>
          <label>Select City: </label>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Dharwad">Ravet</option>
            <option value="Haliyal">Pimpri</option>
            <option value="Dandeli">Chinchwad</option>
          </select>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">City</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.state.products.map((product, key) => {
              return (!product.purchased && product.approved && product.city === this.state.value
                ?
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>{product.city}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      name={product.id}
                      value={product.price}
                      onClick={(e) => {
                        e.preventDefault();
                        this.purchaseProduct(product.id);  // Call the purchase function
                      }}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
                : null);
            })}
          </tbody>
        </table>

        <h2>Sold Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Current Owner</th>
              <th scope="col">City</th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.state.products.map((product, key) => {
              return (product.purchased
                ?
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>{product.city}</td>
                </tr>
                : null);
            })}
          </tbody>
        </table>

      </div>
    );
  }
}

export default Main;