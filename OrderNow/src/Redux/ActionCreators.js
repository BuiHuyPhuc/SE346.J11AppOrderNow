// ---> Đăng nhập <---
export function onEmployeeSignedIn(employee) {
	return { type: 'EMPLOYEE_SIGNED_IN', employee };
}

// ---> Đăng xuất <---
export function onSignOut(navigation) {
	return { type: 'SIGN_OUT', navigation };
}

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
////////////////////////////// Category Food //////////////////////////////


////////////////////////////////// Food //////////////////////////////////
// ---> Truyền dữ liệu vào popup món ăn <---
export function onPopupAddFood() {
	return { type: 'POPUP_ADD_FOOD' };
}

export function onPopupUpdateDeleteFood(food) {
	return { type: 'POPUP_UPDATE_DELETE_FOOD', food };
}
////////////////////////////////// Food //////////////////////////////////


///////////////////////////////// Table //////////////////////////////////
// ---> Truyền dữ liệu vào popup bàn <---
export function onPopupAddTable() {
	return { type: 'POPUP_ADD_TABLE' };
}

export function onPopupDeleteTable(table) {
	return { type: 'POPUP_DELETE_TABLE', table };
}
///////////////////////////////// Table //////////////////////////////////


/////////////////////////////// Employee /////////////////////////////////
// ---> Truyền dữ liệu vào popup bàn <---
export function onPopupAddEmployee() {
	return { type: 'POPUP_ADD_EMPLOYEE' };
}

export function onPopupUpdateDeleteEmployee(employee) {
	return { type: 'POPUP_UPDATE_DELETE_EMPLOYEE', employee };
}
/////////////////////////////// Employee /////////////////////////////////