import logo from './logo.svg';
import React from 'react';
import './App.css';
import Product from './Components/Product';
import ComponenentA from './components2/ComponentA';
import ComponenentB from './components2/ComponentB';
import ProductListing from './ApiCalls/ProductListing';


 export const UserContext = React.createContext()

 const studentDetails = {
  name: "jay",
  age: 25,
  job: "Web Development"
};


function App() {
  return (
    <div className="App">
      {/* <nav>prduct Listing</nav>
      <Product/> */}
      {/* <UserContext.Provider value={studentDetails}>
        <ComponenentB/>
      </UserContext.Provider> */}
      <ProductListing/>


    </div>
  );
}

export default App;
