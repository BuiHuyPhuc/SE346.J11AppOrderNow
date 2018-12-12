import { insertNewFood, updateFood, deleteFood } from './../../Database/All_Schemas';

const listFoodReducer = (state = [], action) => {
  	if(action.type === 'ADD_NEW_FOOD') return insertNewCategoryFood({
      id: Math.floor(Date.now() / 1000),
      name: action.newFood.name,
      price: action.newFood.price
    }, action.categoryFoodId)
    .then(newFood => alert(`Thêm ${newFood.name} thành công!`))
    .catch(error => alert(`Thêm thất bại!`));

    else if(action.type === 'UPDATE_FOOD') return updateFood(action.food)
    .then(() => alert('Sửa thành công'))
    .catch(error => alert('Sửa thất bại'));
  	
    else if(action.type === 'DELETE_FOOD') return deleteFood(action.foodId)
    .then(() => alert('Xóa thành công'))
    .catch(error => alert('Xóa thất bại'));

    return state;
};

export default listFoodReducer;
