import { queryAllEmployee } from './../../Database/All_Schemas';

const defaultState = queryAllEmployee().catch(error => []);

const listEmployeeReducer = (state = defaultState, action) => {
    if(action.type === 'LOAD_LIST_EMPLOYEE') return queryAllEmployee().catch(error => []);
  	
    return state;
};

export default listEmployeeReducer;
