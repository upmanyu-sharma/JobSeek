const initialState = {
  jobs: [],
};

export const JobsReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_JOBS") {
    return {
      ...state,
      jobs: action.payload,
    };
  }
  return state;
};
