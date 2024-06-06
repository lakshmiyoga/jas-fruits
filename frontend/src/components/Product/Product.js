import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AddCart from './AddCart';
import { addCartItem } from '../../actions/cartActions';
import { useDispatch } from 'react-redux';



const Product = ({ products }) => {
    // console.log("product", products)
    // const {id} = useParams();

    const [weight, setWeight] = useState({});
    const [quantity, setQuantity] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
// console.log(weight)
    const handleWeightChange = (productId, weight) => {
        setWeight(prevWeights => ({ ...prevWeights, [productId]: weight }));
        setSelectedProduct(productId);
    };

    const calculateRate = (price, weight) => {
        return (price * weight).toFixed(2);
    };

    const handleAddToCart = (product) => {
        // console.log(product)
        const productWeight = weight[product._id];
    //   console.log(productWeight);
        if (selectedProduct) {
            dispatch(addCartItem({ productId: selectedProduct, quantity ,productWeight}));
            // Reset selected product and quantity
            setSelectedProduct(null);
            setQuantity(1);
        }else {
            alert("Please select a weight before adding to cart.");
        }
    };


    // return (

    //     <div className="col-sm-12 col-md-6 col-lg-3 my-3">
    //         {product &&
    //             <div className="card p-3 rounded mx-auto">
    //                 {product && product.images[0] && product.images[0].image &&
    //                     <img
    //                         className=" img-fluid card-img-top mx-auto"
    //                         src={product.images[0].image}
    //                         alt={product.name}
    //                     />}
    //                 <div className="card-body d-flex flex-column">
    //                     <h5 className="card-title">
    //                         <Link to={`/product/${product._id}`}>{product.name}</Link>
    //                     </h5>
    //                     <div className="ratings mt-auto">
    //                         <div className="rating-outer">
    //                             <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
    //                         </div>
    //                         <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
    //                     </div>
    //                     <p className="card-text">${product.price} (per kg)</p>
    //                     {/* <a href="#" id="view_btn" className="btn btn-block">View Details</a> */}
    //                     <AddCart productId={product._id}  />



    //                 </div>
    //             </div>

    //         }

    //     </div>
    // )
    const capitalizeFirstLetter = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    return (
        <div className="container mt-5">
            <div className="table-responsive container-product">
                <table className="table table-bordered ">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Products Image</th>
                            <th>Products Name</th>
                            <th>Price</th>
                            <th>Weight</th>
                            <th>Rate (As Per Weight)</th>
                            <th>Stock</th>
                            <th>Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product,index) => (
                            <tr key={product._id}>
                                <td>{index+1}</td>
                                <td className="Products Image text-center" >
                                    {product.images[0] && product.images[0].image && (
                                        <img
                                            className="img-fluid"
                                            src={product.images[0].image}
                                            alt={capitalizeFirstLetter(product.name)}
                                            style={{ width: '40%', height:'40%' }}
                                        />
                                    )}
                                </td>
                                <td className="Products Name">
                                    {capitalizeFirstLetter(product.name)}
                                </td>
                                {/* <td>
                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                                </div>
                            </td>
                            <td>{product.numOfReviews}</td> */}

                                <td className="Price">Rs.{product.price} (per kg)</td>
                                <td className="Weight">
                                    <select
                                        value={weight[product._id] || ''}
                                        onChange={(e) => handleWeightChange(product._id, parseFloat(e.target.value))}
                                        className="form-select"
                                    >
                                        <option value=""> weight</option>
                                        {/* <option value="0.5">0.5 kg</option>
                                        <option value="1">1 kg</option>
                                        <option value="1.5">1.5 kg</option>
                                        <option value="2">2 kg</option>
                                        <option value="2.5">2.5 kg</option>
                                        <option value="3">3 kg</option>
                                        <option value="3.5">3.5 kg</option>
                                        <option value="4">4 kg</option>
                                        <option value="4.5">4.5 kg</option>
                                        <option value="5">5 kg</option>
                                        <option value="5.5">5.5 kg</option>
                                        <option value="6">6 kg</option>
                                        <option value="6.5">6.5 kg</option>
                                        <option value="7">7 kg</option>
                                        <option value="7.5">7.5 kg</option>
                                        <option value="8">8 kg</option>
                                        <option value="8.5">8.5 kg</option>
                                        <option value="9">9 kg</option>
                                        <option value="9.5">9.5 kg</option>
                                        <option value="10">10 kg</option> */}
                                        {[...Array(20).keys()].map(i => (
                                            <option key={i} value={(i + 1) * 0.5}>{(i + 1) * 0.5} kg</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="Rate (As Per Weight)">
                                    {weight[product._id] ? `$${calculateRate(product.price, weight[product._id])}` : 'N/A'}
                                </td>
                                <td className="Stock">Available</td>
                                <td className="Add to Cart">
                                    {/* <AddCart productId={product._id} /> */}
                                    <button className="btn d-inline ml-4" 
                                    onClick={()=>handleAddToCart(product)}
                                    style={{backgroundColor:" #02441E", color:"white", borderRadius:"40px"}}>Add</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product
