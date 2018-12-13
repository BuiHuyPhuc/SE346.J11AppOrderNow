// ---> Chọn bàn <---
export function onChooseTable(table) {
	return { type: 'CHOSEN_TABLE', table };
}

// ---> Bật - tắt Popup <---
export function onCancelPopup() {
	return { type: 'CANCEL_POPUP' };
}

export function onShowPopupAdd() {
	return { type: 'SHOW_POPUP_ADD' };
}

export function onShowPopupUpdateDelete() {
	return { type: 'SHOW_POPUP_UPDATE_DELETE' };
}

export function onClickUpdate() {
	return { type: 'CLICK_UPDATE' };
}

////////////////////////////// Category Food //////////////////////////////
// ---> Truyền dữ liệu vào popup loại món ăn <---
export function onPopupAddCategoryFood() {
	return { type: 'POPUP_ADD_CATEGORYFOOD' };
}

export function onPopupUpdateDeleteCategoryFood(categoryFood) {
	return { type: 'POPUP_UPDATE_DELETE_CATEGORYFOOD', categoryFood };
}

// ---> Xử lý lấy dữ liệu danh sách loại món ăn <---
export function onLoadListCategoryFood() {
	return { type: 'LOAD_LIST_CATEGORYFOOD' };
}
////////////////////////////// Category Food //////////////////////////////


////////////////////////////////// Food //////////////////////////////////
// ---> Truyền dữ liệu vào popup món ăn <---
export function onPopupAddFood() {
	return { type: 'POPUP_ADD_FOOD' };
}

export function onPopupUpdateDeleteFood(food) {
	return { type: 'POPUP_UPDATE_DELETE_FOOD', food };
}

// ---> Xử lý lấy dữ liệu, thêm, xóa, sửa danh sách món ăn <---
export function onLoadListFood() {
	return { type: 'LOAD_LIST_FOOD' };
}
////////////////////////////////// Food //////////////////////////////////