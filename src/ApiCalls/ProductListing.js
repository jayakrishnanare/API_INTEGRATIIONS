import Item from "antd/es/list/Item";
import React, { useState, useEffect } from "react";
import { Modal, Button, message, Form, Input } from "antd";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getProductsList = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products.slice(0, 9));
        console.log("hhhhhhhhhh", products.length);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductsById = async (productId) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      if (res.ok) {
        const product = await res.json();
        setSelectedProduct(product);
        form.setFieldsValue(product);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result) {
        message.success("Product deleted successfully!");
        setProducts(products.filter((product) => product.id !== productId));
      }
      message.success("Product deleted successfully!");
      // getProductsList();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const addProduct = async (values) => {
    try {
      
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        message.success("Product added successfully!");
        setIsAddModalVisible(false); 
        form.resetFields(); 
      } else {
        message.error("Failed to add product. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product. Please try again later.");
    }
  };
  // const updateProduct = async (productId, updatedValues) => {
  //   try {
  //     const response = await fetch(`https://dummyjson.com/products/${productId}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedValues),
  //     });
  //     if (response.ok) {
  //       const updatedProduct = await response.json();
  //       setProducts(products.map((product) => (product.id === productId ? { ...product, ...updatedProduct } : product)));
  //       message.success("Product updated successfully!");
  //       setIsModalVisible(false);
  //     } else {
  //       message.error("Failed to update product. Please try again later.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //     message.error("Failed to update product. Please try again later.");
  //   }
  // };
  const handleCancelAddModal = () => {
    setIsAddModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    getProductsList();
  }, []);


  // const handleEdit = (product) => {
  //   setSelectedProduct(product);
  //   form.setFieldsValue(product); // Prefill form fields with selected product data
  //   setIsModalVisible(true);
  // };
  return (
    <React.Fragment>
      <div className="product_list">
        <h2>Product Listings</h2>
        <table className="product_table">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>brand</th>
              <th>price</th>
              <th>rating</th>
              <th>Image</th>
              <th>category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <img
                    src={product.thumbnail}
                    style={{ maxWidth: "100px", height: "100px" }}
                  ></img>
                </td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => getProductsById(product.id)}>
                    view details
                  </button>
                  <button>Edit</button>
                  <button onClick={() => deleteProduct(product.id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button onClick={() => setIsAddModalVisible(true)}>Add Product</Button>
      </div>
      <Modal
        title="Product Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedProduct && (
          <div>
            <p>
              <b>Title:</b> {selectedProduct.title}
            </p>
            <p>
              <b>Brand:</b> {selectedProduct.brand}
            </p>
            <p>
              <b>Price:</b> {selectedProduct.price}
            </p>
            <p>
              <b>Category:</b> {selectedProduct.category}
            </p>
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      </Modal>
      <Modal
        title="Add Product"
        visible={isAddModalVisible}
        onCancel={handleCancelAddModal}
        footer={null}
      >
        <Form
          form={form}
           onFinish={addProduct}
          initialValues={{
            id: '',
            title: "",
            brand: "",
            price: "",
            rating: "",
            category: "",
          }}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please enter brand" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please enter rating" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
      </Modal>

    </React.Fragment>
  );
};
export default ProductListing;
