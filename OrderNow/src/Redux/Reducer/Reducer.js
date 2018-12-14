import { combineReducers } from 'redux';

import signOutReducer from './SignOutReducer'
import chooseTableReducer from './ChooseTableReducer';
import showPopupReducer from './ShowPopupReducer';
import popUpCategoryFoodReducer from './PopUpCategoryFoodReducer';
import popUpFoodReducer from './PopUpFoodReducer';
import popUpTableReducer from './PopUpTableReducer';
import popUpEmployeeReducer from './PopUpEmployeeReducer';

const reducer = combineReducers({
	signOut: signOutReducer,
	chooseTable: chooseTableReducer,
	showPopup: showPopupReducer,
	popUpCategoryFood: popUpCategoryFoodReducer,
	popUpFood: popUpFoodReducer,
	popUpTable: popUpTableReducer,
	popUpEmployee: popUpEmployeeReducer,
});

export default reducer;