const initialState = {
  user: null,
  address: [],
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
    default:
      return state;
  }
};

export default authReducer;
