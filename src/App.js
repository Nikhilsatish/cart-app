import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/compat/app';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
    this.db = firebase.firestore();
  }

  componentDidMount() {
    this.db
      .collection("products")
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ products: products, loading: false });
      });
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;
    // this.setState({
    //   products
    // })
    // Incrementing qty - firebase
    const docRef = this.db.collection('products').doc(products[index].id)
    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log('incremented Successfully');
      })
      .catch((err) => {
        console.log('Error updating', err);
      })
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 1) {
      return;
    }
    // products[index].qty -= 1;
    // this.setState({
    //   products
    // })
    // Decrementing qty - firebase
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty: products[index].qty - 1
    })
    .then(() =>{
      console.log('decremented Successfully');
    })
    .catch((err) =>{
      console.log('Error updating', err);
    })
  }
  
  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id); // [{}]
    // this.setState({
    //   products: items
    // })
    //Deleting products - firebase
    const docRef = this.db.collection('products').doc(id);
    docRef.delete().then(() => {
      console.log('deleted successfully');
      }).catch((err) => {
        console.log('Error deleting', err);
        })
  }

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    })
    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })
    return cartTotal;
  }

  addProducts = () => {
    this.db
      .collection("products")
      .add({
        title: 'Tv',
        price: 1000,
        qty: 1,
        img: ''
      })
      .then((docRef) => {
        console.log('products added successfully', docRef);
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProducts} style={{ padding: 20,cursor: 'pointer' }}>Add Products</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
