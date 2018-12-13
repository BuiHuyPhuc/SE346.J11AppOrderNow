const defaultState = {
	title: '',
	table: null
};

const popUpTableReducer = (state = defaultState, action) => {
  if(action.type === 'POPUP_ADD_TABLE') return {
  	title: 'Thêm bàn mới',
  	table: null
  };
  if(action.type === 'POPUP_DELETE_TABLE') return {
  	title: 'Thông tin bàn',
  	table: action.table, 
  };

  return state;
};

export default popUpTableReducer;