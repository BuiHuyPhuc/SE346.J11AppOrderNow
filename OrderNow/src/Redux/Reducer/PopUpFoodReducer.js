const defaultState = {
	title: '',
	food: null
};

const popUpFoodReducer = (state = defaultState, action) => {
  if(action.type === 'POPUP_ADD_FOOD') return {
  	title: 'Thêm món ăn mới',
  	food: null
  };
  if(action.type === 'POPUP_UPDATE_DELETE_FOOD') return {
  	title: 'Thông tin món ăn',
  	food: action.food, 
  };

  return state;
};

export default popUpFoodReducer;