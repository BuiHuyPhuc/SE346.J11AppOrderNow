import { queryAllCategoryFood } from './../../Database/All_Schemas';

const defaultState = queryAllCategoryFood().catch(error => []);

const listCategoryFoodReducer = (state = defaultState, action) => {
    if(action.type === 'LOAD_LIST_CATEGORYFOOD') return queryAllCategoryFood().catch(error => []);
  	
    return state;
};

export default listCategoryFoodReducer;
