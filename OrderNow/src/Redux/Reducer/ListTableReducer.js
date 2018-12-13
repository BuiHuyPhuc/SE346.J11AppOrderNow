import { queryAllTable } from './../../Database/All_Schemas';

const defaultState = queryAllTable().catch(error => []);

const listTableReducer = (state = defaultState, action) => {
    if(action.type === 'LOAD_LIST_TABLE') return queryAllTable().catch(error => []);
  	
    return state;
};

export default listTableReducer;
