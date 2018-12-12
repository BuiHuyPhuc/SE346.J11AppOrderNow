import { combineReducers } from 'redux';

import chooseTableReducer from './ChooseTableReducer';
import showPopupReducer from './ShowPopupReducer';

import popUpCategoryFoodReducer from './PopUpCategoryFoodReducer';
import listCategoryFoodReducer from './ListCategoryFoodReducer';

import popUpFoodReducer from './PopUpFoodReducer';
import listFoodReducer from './ListFoodReducer';

const reducer = combineReducers({
	chooseTable: chooseTableReducer,
	showPopup: showPopupReducer,
	popUpCategoryFood: popUpCategoryFoodReducer,
	listCategoryFood: listCategoryFoodReducer,
	popUpFood: popUpFoodReducer,
	listFood: listFoodReducer
});

export default reducer;