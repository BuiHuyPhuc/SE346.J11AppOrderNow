const defaultState = {
	title: '',
	categoryFood: null
};

const popUpCategoryFoodReducer = (state = defaultState, action) => {
  if(action.type === 'POPUP_ADD_CATEGORYFOOD') return {
  	title: 'Thêm loại món ăn mới',
  	categoryFood: null
  };
  if(action.type === 'POPUP_UPDATE_DELETE_CATEGORYFOOD') return {
  	title: 'Thông tin loại món ăn',
  	categoryFood: action.categoryFood, 
  };

  return state;
};

export default popUpCategoryFoodReducer;