import toast from "react-hot-toast";
import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_ERROR" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    // Find the product
    const { products } = getState().products;
    const getProduct = data;
    // const getProduct = products.find(
    //   (item) => item.productId === data.productId,
    // );

    // Check for stocks
    const isQuantityExist = getProduct.quantity >= qty;

    // If in stock -> add
    if (isQuantityExist) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
      toast.success(`${data?.productName} added to the cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      // error
      toast.error("Out of stock");
    }
  };

// export const increaseCartQuantity =
//   (data, newQuantity) => (dispatch, getState) => {
//     const { products } = getState().products;
//     const getProduct = products.find(
//       (item) => item.productId === data.productId,
//     );

//     if (!getProduct) {
//       console.error("Product not found");
//       return;
//     }

//     if (getProduct.quantity >= newQuantity) {
//       dispatch({
//         type: "ADD_CART",
//         payload: { ...data, quantity: newQuantity },
//       });
//       localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//     } else {
//       toast.error("Quantity Reached To Limit!");
//     }
//   };

export const increaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    if (data.quantity >= newQuantity) {
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity Reached To Limit!");
    }
  };

// export const decreaseCartQuantity =
//   (data, newQuantity) => (dispatch, getState) => {
//     dispatch({
//       type: "ADD_CART",
//       payload: { ...data, quantity: newQuantity },
//     });
//     localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
//   };

export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_CART",
      payload: {
        productId: data.productId,
        productName: data.productName,
        image: data.image,
        description: data.description,
        price: Number(data.price),
        discount: Number(data.discount),
        specialPrice: Number(data.specialPrice),
        quantity: Number(newQuantity),
        cartId: data.cartId,
      },
    });

    try {
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } catch (e) {
      console.error("localStorage failed:", e);
    }
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: data,
  });

  toast.success(`${data.productName} removed from cart!`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("You are now logged in!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Internal Server Error!");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User Registered Successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error!",
      );
    } finally {
      setLoader(false);
    }
  };

export const logoutUser = (navigate) => (dispatch) => {
  dispatch({
    type: "LOG_OUT",
  });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const addUpdateUserAddress =
  (sendData, toast, addressID, setOpenAddressModal) =>
  async (dispatch, getState) => {
    // const {user} = getState().auth;
    dispatch({
      type: "BUTTON_LOADER",
    });
    try {
      if (!addressID) {
        const { data } = await api.post("/addresses", sendData);
      } else {
        await api.put(`/addresses/${addressID}`, sendData);
      }
      dispatch(fetchUserAddresses());
      toast.success("Address saved successfully!");
      dispatch({
        type: "IS_SUCCESS",
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Internal Server Error!");
      dispatch({
        type: "IS_ERROR",
        payload: null,
      });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const fetchUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/addresses`);
    dispatch({
      type: "USER_ADDRESS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch user addresses",
    });
  }
};

export const selectUserCheckoutAddress = (address) => {
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const deleteUserAddress =
  (toast, addressID, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });
      const { data } = await api.delete(`/addresses/${addressID}`);
      console.log(data);

      removeCheckoutAddress();
      dispatch(fetchUserAddresses());
      toast.success("Address deleted successfully!");
      dispatch({
        type: "IS_SUCCESS",
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Some Error Occured!",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const removeCheckoutAddress = () => {
  return {
    type: "REMOVE_CHECKOUT_ADDRESS",
  };
};

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};

// export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: "IS_FETCHING" });
//     await api.post("/cart/create", sendCartItems);
//     const cart = await dispatch(getUserCart());
//     console.log("Total Price from index", cart.totalPrice);
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: "IS_ERROR",
//       payload: error?.response?.data?.message || "Failed to fetch create cart!",
//     });
//   }
// };

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post("/cart/create", sendCartItems);
    await dispatch(getUserCart()); // ✅ just await it, don't capture return

    // If you need totalPrice, read it from state AFTER dispatch
    const { totalPrice } = getState().carts; // ✅ read from Redux state
    console.log("Total Price from state", totalPrice);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch create cart!",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  // try {
  //   dispatch({ type: "IS_FETCHING" });
  //   const { data } = await api.get("/carts/users/cart");
  //   console.log("Raw API response:", data); // see exact field names from backend
  //   console.log("totalPrice:", data.totalPrice);
  //   console.log("cartId:", data.cartId);
  //   dispatch({
  //     type: "GET_USER_CART_PRODUCTS",
  //     payload: data.products,
  //     totalPrice: data.totalPrice,
  //     cartId: data.cartId,
  //   });

  //   localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  //   dispatch({ type: "IS_SUCCESS" });
  //   return data;
  // } catch (error) {
  //   console.log(error);
  //   dispatch({
  //     type: "IS_ERROR",
  //     payload: error?.response?.data?.message || "Failed to fetch create cart!",
  //   });
  // }

  //Claude Version
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/carts/users/cart");

    console.log("Raw API response:", data); // check field names

    if (!data) throw new Error("No data returned from cart API");

    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    dispatch({ type: "IS_SUCCESS" });
    return data;
  } catch (error) {
    // console.log("getUserCart error:", error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch cart!",
    });
  }
};

export const createStripePaymentSecret = (sendData) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.post("/order/stripe-client-secret", sendData);
    dispatch({ type: "CLIENT_SECRET", payload: data });
    localStorage.setItem("client-secret", JSON.stringify(data));
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.error(error);
    toast.error(
      error?.response?.data?.message || "Failed to create client secret!",
    );
  }
};

export const stripePaymentConfirmation =
  (setErrorMessage, setLoading, toast, sendData) => async (dispatch) => {
    try {
      const response = await api.post("/order/users/payments/online", sendData);
      if (response.data) {
        console.log("INSIDE IF");

        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("client-secret");
        localStorage.removeItem("cartItems");
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        toast.success("Order Accepted!");
      } else {
        setErrorMessage("Payment failed! Please try again...");
      }
    } catch (error) {
      setErrorMessage("Payment failed! Please try again...");
    }
  };

export const fetchAnalytics = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/admin/app/analytics");
    dispatch({ type: "FETCH_ANALYTICS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch data!",
    });
  }
};

export const getOrdersForDashboard = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/admin/orders?${queryString}`);
    dispatch({
      type: "GET_ADMIN_ORDERS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch orders data!",
    });
  }
};

export const updateOrderStatusFromDashboard =
  (orderId, orderStatus, toast, setLoader) => async (dispatch, getState) => {
    try {
      setLoader(true);
      const { data } = await api.put(
        `/admin/orders/${orderId}/status`,
        {status : orderStatus},
      );
      toast.success(data?.message || "Order status updated!");
      await dispatch(getOrdersForDashboard());
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Internal Server Error!");
    } finally {
      setLoader(false);
    }
  };
