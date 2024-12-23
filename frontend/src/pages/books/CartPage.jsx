import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart, updateCartItemQty } from "../../redux/features/cart/cartSlice";
import { LuIndianRupee } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
    .toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQtyChange = (productId, quantity) => {
    dispatch(updateCartItemQty({ productId, quantity: parseInt(quantity) }));
  };

  return (
    <>
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-favorite rounded-2xl shadow-xl border border-secondary hover:shadow-2xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900 ">Shopping cart</div>
            <div className="ml-3 flex h-7 items-center ">
              <button
                type="button"
                onClick={handleClearCart}
                className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
              >
                <span className="flex">
                  Clear Cart <MdDelete className="ml-2 h-6 w-6" />
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              {cartItems.length > 0 ? (
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product?._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt=""
                          src={`${getImgUrl(product?.coverImage)}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to="/">{product?.title}</Link>
                            </h3>
                            <p className="sm:ml-4 flex">
                              <LuIndianRupee className="mr-1 size-5" />
                              {product?.newPrice}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            <strong>Category: </strong>
                            {product?.category}
                          </p>
                        </div>
                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                          <div className="text-gray-500">
                            <strong>Qty: </strong>
                            <select
                              value={product.quantity}
                              onChange={(e) => handleQtyChange(product._id, e.target.value)}
                              className="ml-2 border border-gray-300 rounded-md p-1"
                            >
                              {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              onClick={() => handleRemoveFromCart(product)}
                              type="button"
                              className="font-medium text-secondary hover:text-secondary hover:opacity-100 hover:scale-150 transition-all duration-200"
                            >
                              <MdDelete className="h-8 w-8" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-2xl font-semibold text-center">Your Cart is Empty!!</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-secondary px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p className="flex">
              <LuIndianRupee className="mr-1 size-5" />
              {totalPrice ? totalPrice : 0}
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            {cartItems.length > 0 ? (
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-lg border border-transparent bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary hover:opacity-100 hover:scale-105 transition-all duration-700"
              >
                Checkout
              </Link>
            ) : (
              <button
                disabled
                className="flex items-center justify-center rounded-lg border border-transparent bg-gray-300 px-6 py-3 text-base font-medium text-white cursor-not-allowed"
              >
                Checkout
              </button>
            )}
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Link to="/exploreBooks">
              or
              <button
                type="button"
                className="font-medium text-secondary hover:text-primary ml-1"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
