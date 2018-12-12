const chooseTableReducer = (state = 1, action) => {
  if(action.type === 'CHOSEN_TABLE') return action.table;
  return state;
};

export default chooseTableReducer;