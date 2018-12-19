const defaultState = {
	search: '',
	table: 1
}

const chooseTableReducer = (state = defaultState, action) => {
  if(action.type === 'CHANGE_SEARCH') return { ...state, search: action.search };
  if(action.type === 'CHOSEN_TABLE') return { ...state, table: action.table };
  return state;
};

export default chooseTableReducer;