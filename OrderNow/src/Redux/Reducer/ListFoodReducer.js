import { queryAllFood } from './../../Database/All_Schemas';

const defaultState = queryAllFood().catch(error => []);

const listFoodReducer = (state = defaultState, action) => {
    if(action.type === 'LOAD_LIST_FOOD') return queryAllFood().catch(error => []);

    return state;
};

export default listFoodReducer;
