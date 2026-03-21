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
