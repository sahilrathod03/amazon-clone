import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams,Link } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import { IN_CURRENCY } from '../utils/constants';
import {addToCart} from "../redux/cartSlice";
import { useDispatch } from 'react-redux';


const ProductPage = () => {
  const {id} = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");

  const dispatch = useDispatch();


  const addQuantityToProduct = () => { 
    setProduct(product.quantity=quantity)
    return product
   }


useEffect(() => {
  axios
    .get("/data/products.json")
    .then((response) => {
      const products = response.data;
      setProduct(products[id]);
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
}, [id]);

  if(!product?.title) return <h1>Loading Product...</h1>

  return (
    product && (
      <div className="h-screen bg-amazonclone-background">
        <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
          <div className="grid grid-cols-10 gap-2">
            {/* left*/}
            <div className="col-span-3 p-8 rounded bg-white m-auto">
              <img src={`${product.image}`} alt="product" />
            </div>
            {/* middle*/}
            <div className="col-span-5 p-4 rounded bg-white divide-y divide-gray-400">
              <div className="mb-3">
                <ProductDetails product={product} ratings={true} />
              </div>
              <div className="text-base xl:text-lg mt-3">
                {product.description}
              </div>
            </div>
            {/* Right*/}
            <div className="col-span-2 p-4 rounded bg-white">
              <div className="text-xl xl:text-2xl text-red-700 text-right font-semibold">
                {IN_CURRENCY.format(product.price)}
              </div>
              <div className="text-base xl:text-lg text-gray-500 text-right font-semibold">
                MRP:{" "}
                <span className="line-through">
                  {IN_CURRENCY.format(product.oldPrice)}
                </span>
              </div>
              <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
                FREE Returns
              </div>
              <div className="text-sm xl:text-base text-blue-500  font-semibold mt-1">
                FREE Delivery
              </div>
              <div className="text-base xl:text-lg font-semibold text-green-700 mt-1">
                In Stock
              </div>
              <div className="text-base xl:text-lg mt-1">
                Quantity:
                <select
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 bg-white border rounded-md focus:border-indigo-600"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <Link to={"/checkout"}>
                <button
                  onClick={() => dispatch(addToCart(addQuantityToProduct()))}
                  className="btn"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductPage