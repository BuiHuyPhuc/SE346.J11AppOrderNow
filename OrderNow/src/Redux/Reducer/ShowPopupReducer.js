const defaultState = {
	isSave: false,
	isUpdate: false,
	visible: false
};

const showPopupReducer = (state = defaultState, action) => {
  if(action.type === 'CANCEL_POPUP') return {
  	...state,
	  visible: false
  };
  if(action.type === 'SHOW_POPUP_ADD') return {
  	isSave: true, 
  	isUpdate: false, 
  	visible: true
  };
  if(action.type === 'SHOW_POPUP_UPDATE_DELETE') return {
  	isSave: false, 
  	isUpdate: true, 
  	visible: true
  };
  if(action.type === 'CLICK_UPDATE') return {
  	...state,
  	isSave: true
  };

  return state;
};

export default showPopupReducer;