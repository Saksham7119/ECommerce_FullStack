const initialState = {
  user: null,
  address: [],
  selectedUserAddress: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOG_OUT":
      return {
        user : null,
        address : null
      };
    case "USER_ADDRESS":
      return {
        ...state,
        address : action.payload
      };
    case "SELECT_CHECKOUT_ADDRESS":
      return {
        ...state,
        selectedUserCheckoutAddress : action.payload
      };
    case "REMOVE_CHECKOUT_ADDRESS":
      return {
        ...state,
        selectedUserCheckoutAddress : null
      };
    default:
      return state;
  }
};

export default authReducer;
