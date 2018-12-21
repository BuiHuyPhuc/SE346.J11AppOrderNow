import { insertNewEmployee, insertNewTable, insertNewCategoryFood, insertNewFood, insertNewBill, insertNewBillDetail } from './All_Schemas';

const employee = {
	id: 1,
	username: 'admin',
    password: 'admin',
    name:  'Admin',
    position: 'Quản lý',
    decentralization: true
};

const listTable = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const listCategoryFood = [
	{id: 1, name: 'Món rau', image: 'http://tamsugiadinh.vn/wp-content/uploads/2016/11/1479055434_cach-lam-cac-mon-rau-xao-15.jpg'},
	{id: 2, name: 'Món nướng', image: 'https://nld.mediacdn.vn/2015/an-do-nuong-1-1423821774604.jpg'},
	{id: 3, name: 'Món lẩu', image: 'https://i.imgur.com/Apbh50O.jpg'},
	{id: 4, name: 'Món chiên', image: 'https://anh.24h.com.vn/upload/3-2016/images/2016-08-12/1470996156-untitled-1.jpg'},
	{id: 5, name: 'Món gỏi', image: 'https://media.ngoisao.vn/resize_580x1100/news/2015/08/29/goi-cu-hu-dua-0909-ngoisao.vn.jpg'},
	{id: 6, name: 'Món cơm', image: 'https://daotaobeptruong.vn/images/daotaobeptruong/tin-tuc-hoc-nau-an/hoc-nau-an-ngon-mon-com-chien-duong-chau.jpg'},
	{id: 7, name: 'Món hấp', image: 'http://www.pelinerem.com/wp-content/uploads/2018/09/bamboo-kap.jpg'},
	{id: 8, name: 'Món xào', image: 'http://recipes.thuvienbao.com/wp-content/uploads/2009/05/cai-thao-xao-thit-bo.jpg'},
	{id: 9, name: 'Bia', image: 'https://www.circlek.com.vn/wp-content/uploads/2016/01/blk-1-BEER-tlmb2-1.png'},
	{id: 10, name: 'Nước', image: 'https://diendanbaobi.vn/files/sanpham/785/1/jpg/Chai-nh%E1%BB%B1a-n%C6%B0%E1%BB%9Bc-ng%E1%BB%8Dt-Pepsi.jpg'},
];

const listFood = [
	{id: 1, name: 'Kho quẹt', price: 59000 , image: 'http://toinayangi.vn/wp-content/uploads/2014/07/cu1.jpg', idCategoryFood: 1},
	{id: 2, name: 'Ba chỉ nướng', price: 69000 , image: 'https://nongsanngon.com.vn/wp-content/uploads/2018/05/158345-thit-heo-nuong-660x454.jpg', idCategoryFood: 2},
	{id: 3, name: 'Gà nướng muối ớt', price: 179000 , image: 'https://media.cooky.vn/recipe/g3/29930/s800x500/recipe-cover-r29930.jpg', idCategoryFood: 2},
	{id: 4, name: 'Lẩu cá đuối', price: 159000 , image: 'https://images.foody.vn/res/g1/5692/prof/s576x330/foody-mobile-10-jpg-275-636120576007753831.jpg', idCategoryFood: 3},
	{id: 5, name: 'Lẩu cá bớp', price: 149000 , image: 'https://sieungon.com/wp-content/uploads/2018/04/lau-ca-bop-nau-mang-chua.jpg', idCategoryFood: 3},
	{id: 6, name: 'Đậu hũ lướt ván', price: 29000 , image: 'http://1.bp.blogspot.com/-_2xZdUlM43M/VAfX4JP4tKI/AAAAAAAABSs/qH5jHzc7yns/s1600/dau-luot-van.jpg', idCategoryFood: 4},
	{id: 7, name: 'Cua chiên muối hongkong', price: 119000 , image: 'http://5cua.vn/uploads/images/Cua%20rang%20mu%E1%BB%91i%20H%E1%BB%93ng%20Kong%20-%20H%E1%BA%A3i%20s%E1%BA%A3n%205%20Cua.jpg', idCategoryFood: 4},
	{id: 8, name: 'Bò tái chanh', price: 99000 , image: 'http://iunauan.com/images/anh1_638775.jpg', idCategoryFood: 5},
	{id: 9, name: 'Chân gà rút xương', price: 79000 , image: 'https://thucthan.com/media/2018/01/nom-chan-ga-rut-xuong/mon-nom-chan-ga-rut-xuong.jpg', idCategoryFood: 5},
	{id: 10, name: 'Cơm chiên cá mặn', price: 59000 , image: 'https://img-global.cpcdn.com/005_recipes/4a8e9b5d72233ea7/751x532cq70/photo.jpg', idCategoryFood: 6},
	{id: 11, name: 'Cơm chiên hải sản', price: 79000 , image: 'http://www.monngon.tv/uploads/images/2017/03/05/2d1032725354fb01e24ab713ecbd629a-cach-lam-com-chien-hai-san-slideshow.jpg', idCategoryFood: 6},
	{id: 12, name: 'Tôm hấp xả', price: 79000 , image: 'https://media.cooky.vn/recipe/g2/14448/s800x500/recipe14448-635617687314665182.jpg', idCategoryFood: 7},
	{id: 13, name: 'Mực sữa hấp hành gừng', price: 79000 , image: 'https://vycua.com/wp-content/uploads/2017/06/muc-hap-gung.jpg', idCategoryFood: 7},
	{id: 14, name: 'Bò xào lăn', price: 99000 , image: 'http://www.monngon.tv/uploads/images/2017/04/22/9437889368f698023eb1c24e52d6c434-c%C3%A1ch%20n%E1%BA%A5u%20b%C3%B2%20x%C3%A0o%20l%C4%83n%20-%20h%C3%ACnh%20slide.jpg', idCategoryFood: 8},
	{id: 15, name: 'Lươn xào lăn', price: 99000 , image: 'https://media.bizwebmedia.net/sites/86285/data/images/2014/11/sp/LUON-XAO-LAN.jpg', idCategoryFood: 8},
	{id: 16, name: 'Tiger nâu', price: 18000 , image: 'http://phanphoibia.com/wp-content/uploads/2017/08/bia-chai-tiger330.jpg', idCategoryFood: 9},
	{id: 17, name: 'Sài Gòn Special', price: 22000 , image: 'http://biasaigondongbac.com/files/sanpham/9/1/jpg/bia-chai-sai-gon-special.jpg', idCategoryFood: 9},
	{id: 18, name: 'Sting', price: 10000 , image: 'http://thieulamua.com/wp-content/uploads/2017/10/nuoc-tang-luc-sting-dau-sleek-lon-330ml-1-700x467-1.jpg', idCategoryFood: 10},
	{id: 19, name: 'Nước suối', price: 8000 , image: 'https://s1.marquis.vn/assets/2017/2017-11/ca6830e6e4d9f35375ff3e68f605c09d.jpg', idCategoryFood: 10}
];

const listBill = [
	{id: 1, status: true, time: new Date(), total: 118000},
	{id: 2, status: true, time: new Date(), total: 254000},
	{id: 3, status: true, time: new Date(), total: 198000},
	{id: 4, status: true, time: new Date(), total: 537000},
	{id: 5, status: true, time: new Date(), total: 209000},
	{id: 6 }, {id: 7 }, {id: 8 }, {id: 9 }, {id: 10 }
];

const listBillDetail = [
	{id: 1, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 1, idFood: 1, idBill: 1 },
	{id: 2, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 2, idFood: 2, idBill: 2 },
	{id: 3, quantity: 4, status: true, time: new Date(), idEmployee: 1, idTable: 2, idFood: 6, idBill: 2 },
	{id: 4, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 3, idFood: 7, idBill: 3 },
	{id: 5, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 3, idFood: 9, idBill: 3 },
	{id: 6, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 4, idFood: 15, idBill: 4 },
	{id: 7, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 4, idFood: 4, idBill: 4 },
	{id: 8, quantity: 10, status: true, time: new Date(), idEmployee: 1, idTable: 4, idFood: 16, idBill: 4 },
	{id: 9, quantity: 3, status: true, time: new Date(), idEmployee: 1, idTable: 5, idFood: 18, idBill: 5 },
	{id: 10, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 5, idFood: 3, idBill: 5 },
	{id: 11, quantity: 1, status: false, time: new Date(), idEmployee: 1, idTable: 1, idFood: 8, idBill: 6 },
	{id: 12, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 2, idFood: 12, idBill: 7 },
	{id: 13, quantity: 5, status: true, time: new Date(), idEmployee: 1, idTable: 3, idFood: 19, idBill: 8 },
	{id: 14, quantity: 1, status: false, time: new Date(), idEmployee: 1, idTable: 4, idFood: 10, idBill: 9 },
	{id: 15, quantity: 2, status: false, time: new Date(), idEmployee: 1, idTable: 5, idFood: 14, idBill: 10 }
];

export function insertEmployee() {
	insertNewEmployee(employee)
	.catch(error => alert('Tạo nhân viên bị lỗi!'));
}

export function insertTable() {
	listTable.map(e => {
		insertNewTable(e)
		.catch(error => alert('Tạo bàn bị lỗi!'));
	});
}

export function insertCategoryFood() {
	listCategoryFood.map(e => {
		insertNewCategoryFood(e)
		.catch(error => alert('Tạo món ăn bị lỗi!'));
	});
}

export function insertFood() {
	listFood.map(e => {
		insertNewFood(e)
		.catch(error => alert('Tạo món ăn bị lỗi!'));
	});
}

export function insertBill() {
	listBill.map(e => {
		insertNewBill(e)
		.catch(error => alert('Tạo hóa đơn bị lỗi!'));
	});
}

export function insertBillDetail() {
	listBillDetail.map(e => {
		insertNewBillDetail(e)
		.catch(error => alert('Tạo chi tiết hóa đơn bị lỗi!'));
	});
}
