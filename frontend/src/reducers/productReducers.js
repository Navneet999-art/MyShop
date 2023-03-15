//This is going to handle the state for product list on homepage
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload }; //LOADING FALSE BECAUSE PRODUCT IS ALREADY LOADED
    case "PRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { loading: true, product: {} };
    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload }; //LOADING FALSE BECAUSE PRODUCT IS ALREADY LOADED
    case "PRODUCT_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
