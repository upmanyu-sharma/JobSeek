const initialState = {
  loading: false,
};
export const loaderReducer = (state = initialState, action) => {
  if (action.type === "LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  return state;
};
