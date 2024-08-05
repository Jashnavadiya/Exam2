import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [product, setProduct] = useState({
    title: '',
    img: '',
    price: ''
  });
  const [products, setProducts] = useState([]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.title !== '' && product.img !== '' && product.price !== '') {
      setProducts([...products, product]);
      await axios.post('http://localhost:3000/product', product);
    }
  };

  const getData = async () => {
    let res = await axios.get('http://localhost:3000/product');
    if (res) setProducts(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className='w-full'>
        <form className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 m-auto' onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold mb-4">Enter Product Details</h1>
          <label className="mb-4">
            <span className="block mb-2 font-medium">Product Name</span>
            <input
              type="text"
              placeholder="Type here"
              name='title'
              onChange={handleInputs}
              value={product.title}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="mb-4">
            <span className="block mb-2 font-medium">Product Price</span>
            <input
              type="number"
              placeholder="Type here"
              name='price'
              onChange={handleInputs}
              value={product.price}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="mb-4">
            <span className="block mb-2 font-medium">Product Image URL</span>
            <input
              type="url"
              placeholder="Type here"
              name='img'
              onChange={handleInputs}
              value={product.img}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <br />
          <br />
          <input type="submit" className='btn' value="Submit" />
        </form>
      </div>
      <div className='w-full mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 '>
        {products.map((ele, i) => (
          <div key={i} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={ele.img}
                alt={ele.title}
                className="object-cover w-full h-64"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold">{ele.title}</h2>
              <p className="text-gray-700">Price: {ele.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
