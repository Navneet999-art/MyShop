export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true, isAuthenticated: false };
    case "USER_LOGIN_SUCCESS":
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case "USER_LOGIN_FAIL":
      return {
        loading: false,
        isAuthenticated: false,
        userInfo: null,
        error: action.payload,
      };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true, isAuthenticated: false };
    case "USER_REGISTER_SUCCESS":
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case "USER_REGISTER_FAIL":
      return {
        loading: false,
        isAuthenticated: false,
        userInfo: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      return {
        loading: false,
        user: action.payload,
      };
    case "USER_DETAILS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
