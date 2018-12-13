const defaultState = {
	title: '',
	employee: null
};

const popUpEmployeeReducer = (state = defaultState, action) => {
  if(action.type === 'POPUP_ADD_EMPLOYEE') return {
  	title: 'Thêm nhân viên mới',
  	employee: null
  };
  if(action.type === 'POPUP_UPDATE_DELETE_EMPLOYEE') return {
  	title: 'Thông tin nhân viên',
  	employee: action.employee, 
  };

  return state;
};

export default popUpEmployeeReducer;