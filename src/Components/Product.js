import { Form } from "antd";
import React, { useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    description: "",
    price: "",
    categories: [],
    productType: "",
    launchDate: "",
    availability: false,
    supplier: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = [...products];

    if (editIndex !== null) {
      updatedProducts[editIndex] = productDetails;
      setEditIndex(null); 
    } else {
      updatedProducts.push(productDetails);
    }

    setProducts(updatedProducts);
    
    setProductDetails({
      productName: "",
      description: "",
      price: "",
      categories: [],
      productType: "",
      launchDate: "",
      availability: false,
      supplier: "",
    });
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    const newCategories = checked
      ? [...productDetails.categories, value]
      : productDetails.categories.filter((category) => category !== value);

    setProductDetails({ ...productDetails, categories: newCategories });
  };
  const handleAvailabilityChange = (event) => {
    const { checked } = event.target;
    setProductDetails({ ...productDetails, availability: checked });
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleEdit = (index) => {
  
    setProductDetails(products[index]);
    setEditIndex(index);
  };

  return (
    <React.Fragment>
      <div className="product_container">
        <h2 id="product">Enter Product Here</h2>
        <form className="form_container" onSubmit={handleSubmit}>
          <div className="form_group">
            <label>ProductName</label>
            <input
              type="text"
              name="productName"
              value={productDetails.productName}
              className="form_control"
              onChange={(event) =>
                setProductDetails({
                  ...productDetails,
                  productName: event.target.value,
                })
              }
            ></input>
          </div>
          <div className="form_group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={productDetails.description}
              className="form_control"
              onChange={(event) =>
                setProductDetails({
                  ...productDetails,
                  description: event.target.value,
                })
              }
            ></input>
          </div>
          <div className="form_group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={productDetails.price}
              className="form_control"
              onChange={(event) =>
                setProductDetails({
                  ...productDetails,
                  price: event.target.value,
                })
              }
            ></input>
          </div>
          <div>
            <h3>Select Product :</h3>
            <input
              type="checkbox"
              name="categories"
              value="car 1"
              checked={productDetails.categories.includes("car 1")}
              onChange={handleCategoryChange}
            />
            <label for="horns">car 1</label> <br />
            <input
              type="checkbox"
              name="categories"
              value="car 2"
              checked={productDetails.categories.includes("car 2")}
              onChange={handleCategoryChange}
            />
            <label for="horns">car 2</label>
            <br />
            <input
              type="checkbox"
              name="categories"
              value="car 3"
              checked={productDetails.categories.includes("car 3")}
              onChange={handleCategoryChange}
            />
            <label for="horns">car 3</label>
          </div>
          <div>
            <h3>Select Product Type</h3>
            <input
              type="radio"
              name="productType"
              value="Type 1"
              checked={productDetails.productType === "Type 1"}
              onChange={(event) =>
                setProductDetails({
                  ...productDetails,
                  productType: event.target.value,
                })
              }
            />
            <label for="type1">Type 1</label>
            <br />
            <input
              type="radio"
              name="productType"
              value="Type 2"
              checked={productDetails.productType === "Type 2"}
              onChange={(event) =>
                setProductDetails({
                  ...productDetails,
                  productType: event.target.value,
                })
              }
            />
            <label for="type2">Type 2</label>
            <br />
            <input
              type="radio"
              name="productType"
              value="Type 3"
              checked={productDetails.productType === "Type 3"}
              onChange={(event) =>
                setProductDetails({
                  ...productDetails,
                  productType: event.target.value,
                })
              }
            />
            <label for="type3">Type 3</label>
          </div>
          <div>
            <h3>Select Launch Date</h3>
            <input
              type="date"
              name="launchDate"
              value={productDetails.launchDate}
              onChange={(event) =>
                setProductDetails({
                  ...productDetails,
                  launchDate: event.target.value,
                })
              }
            />
          </div>
          <div>
            <h3>availbility : </h3>
            <label class="switch">
              <input
                type="checkbox"
                name="availability"
                checked={productDetails.availability}
                onChange={handleAvailabilityChange}
              />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="form_group">
            <label>Supplier :</label>
            <select
              className="form_control"
              name="supplier"
              value={productDetails.supplier}
              onChange={(event) =>
                setProductDetails({
                  ...productDetails,
                  supplier: event.target.value,
                })
              }
            >
              <option>supplier 1</option>
              <option>supplier 2</option>
              <option>supplier 3</option>
              <option>supplier 4</option>
            </select>
          </div>
          <div>
            <button className="button">{
               editIndex !== null ? 'Update' : 'Submit'
            }
              </button>
          </div>
        </form>
      </div>

      <h1>Product Listings</h1>
      <div className="product_list">
        <h2>Product Listings</h2>
        <table className="product_table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Categories</th>
              <th>Product Type</th>
              <th>Launch Date</th>
              <th>Availability</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.categories.join(", ")}</td>
                <td>{product.productType}</td>
                <td>{product.launchDate}</td>
                <td>{product.availability ? "Available" : "Not Available"}</td>
                <td>{product.supplier}</td>
                <td>
                  <button id="edit_btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Product;
