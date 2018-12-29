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
	{id: 1, name: 'Món rau', image: 'http://recipes.thuvienbao.com/wp-content/uploads/2009/05/cai-thao-xao-thit-bo.jpg'},
	{id: 2, name: 'Món nướng', image: 'https://nld.mediacdn.vn/2015/an-do-nuong-1-1423821774604.jpg'},
	{id: 3, name: 'Món chiên', image: 'https://anh.24h.com.vn/upload/3-2016/images/2016-08-12/1470996156-untitled-1.jpg'},
	{id: 4, name: 'Món gỏi', image: 'https://media.ngoisao.vn/resize_580x1100/news/2015/08/29/goi-cu-hu-dua-0909-ngoisao.vn.jpg'},
	{id: 5, name: 'Món cơm', image: 'https://daotaobeptruong.vn/images/daotaobeptruong/tin-tuc-hoc-nau-an/hoc-nau-an-ngon-mon-com-chien-duong-chau.jpg'},
	{id: 6, name: 'Món lẩu', image: 'https://i.imgur.com/Apbh50O.jpg'},
	{id: 7, name: 'Bia', image: 'https://www.circlek.com.vn/wp-content/uploads/2016/01/blk-1-BEER-tlmb2-1.png'},
	{id: 8, name: 'Nước', image: 'https://diendanbaobi.vn/files/sanpham/785/1/jpg/Chai-nh%E1%BB%B1a-n%C6%B0%E1%BB%9Bc-ng%E1%BB%8Dt-Pepsi.jpg'},
];

const listFood = [
	{id: 1, name: 'Kho quẹt', price: 59000 , image: 'http://toinayangi.vn/wp-content/uploads/2014/07/cu1.jpg', idCategoryFood: 1},
	{id: 2, name: 'Bông cải xào bò', price: 69000 , image: 'http://phapluatdansinh.phapluatxahoi.vn/upload/nga-2018/21-6/images900372_1.jpg', idCategoryFood: 1},
	{id: 3, name: 'Khổ qua chà bông', price: 39000 , image: 'https://tea-4.lozi.vn/v1/images/resized/kho-qua-cha-bong-1490290684-2130564-1490290684?w=1200&type=f', idCategoryFood: 1},
	{id: 4, name: 'Bầu luộc trứng', price: 39000 , image: 'http://anviet247.com/upload/sanpham/bau-luoc-trung-11-1.png', idCategoryFood: 1},
	{id: 5, name: 'Cải thìa xào tỏi', price: 39000 , image: 'https://wikibanh.com/wp-content/uploads/2017/03/cach-xao-rau-cai-thia-toi.jpg', idCategoryFood: 1},

	{id: 6, name: 'Ba chỉ nướng', price: 69000 , image: 'https://nongsanngon.com.vn/wp-content/uploads/2018/05/158345-thit-heo-nuong-660x454.jpg', idCategoryFood: 2},
	{id: 7, name: 'Gà nướng muối ớt', price: 179000 , image: 'https://media.cooky.vn/recipe/g3/29930/s800x500/recipe-cover-r29930.jpg', idCategoryFood: 2},
	{id: 8, name: 'Mực trứng rưới sốt cay', price: 89000 , image: 'https://npf.vn/wp-content/uploads/2018/01/muc-chien.jpg', idCategoryFood: 2},
	{id: 9, name: 'Cá bớp nướng muối ớt', price: 109000 , image: 'http://www.monngon.tv/uploads/images/2017/02/28/debd3e34c2ef9941066261eae6217be9-ca-bop-nuong-slide-show.jpg', idCategoryFood: 2},
	{id: 10, name: 'Xúc xích Đức nướng mọi', price: 69000 , image: 'https://image.vtcns.com/files/f1/2016/05/12/vi-sao-xuc-xich-duc-viet-hut-hon-gioi-sanh-an-viet-0.jpg', idCategoryFood: 2},

	{id: 11, name: 'Đậu hũ lướt ván', price: 29000 , image: 'http://1.bp.blogspot.com/-_2xZdUlM43M/VAfX4JP4tKI/AAAAAAAABSs/qH5jHzc7yns/s1600/dau-luot-van.jpg', idCategoryFood: 3},
	{id: 12, name: 'Cua chiên muối hongkong', price: 119000 , image: 'http://5cua.vn/uploads/images/Cua%20rang%20mu%E1%BB%91i%20H%E1%BB%93ng%20Kong%20-%20H%E1%BA%A3i%20s%E1%BA%A3n%205%20Cua.jpg', idCategoryFood: 3},
	{id: 13, name: 'Khoai tây chiên', price: 39000 , image: 'https://wabisabidanang.com/wp-content/uploads/2018/03/3.-Khoai-t%C3%A2y-chi%C3%AAn-900x600.jpg', idCategoryFood: 3},
	{id: 14, name: 'Cánh gà chiên nước mắm', price: 59000 , image: 'https://media.cooky.vn/recipe/g3/25753/s800x500/recipe-cover-r25753.jpg', idCategoryFood: 3},
	{id: 15, name: 'Ếch chiên bơ', price: 59000 , image: 'https://www.nhahangquangon.com/wp-content/uploads/2015/07/ech-chien-bo-1.jpg', idCategoryFood: 3},

	{id: 16, name: 'Gỏi hải sản chua cay', price: 59000 , image: 'http://www.monngon.tv/uploads/images/images/goi-hai-san-thai-lan-1.jpg', idCategoryFood: 4},
	{id: 17, name: 'Gỏi dồi trường', price: 59000 , image: 'http://dattiecgiatot.com/admincp/San-Pham/HinhAnh/346693348536.jpg', idCategoryFood: 4},
	{id: 18, name: 'Gỏi bò bóp thấu', price: 59000 , image: 'https://media.cooky.vn/recipe/g4/31646/s800x500/cooky-recipe-cover-r31646.png', idCategoryFood: 4},
	{id: 19, name: 'Gỏi chân gà rút xương', price: 59000 , image: 'https://thucthan.com/media/2018/01/nom-chan-ga-rut-xuong/mon-nom-chan-ga-rut-xuong.jpg', idCategoryFood: 4},
	{id: 20, name: 'Gỏi bò tái chanh', price: 59000 , image: 'http://saigongame.com/uploads/images/bo%20tai%20chanh.jpg', idCategoryFood: 4},

	{id: 21, name: 'Cơm chiên cá mặn', price: 69000 , image: 'https://img-global.cpcdn.com/005_recipes/4a8e9b5d72233ea7/751x532cq70/photo.jpg', idCategoryFood: 5},
	{id: 22, name: 'Cơm chiên hải sản', price: 69000 , image: 'http://www.monngon.tv/uploads/images/2017/03/05/2d1032725354fb01e24ab713ecbd629a-cach-lam-com-chien-hai-san-slideshow.jpg', idCategoryFood: 5},
	{id: 23, name: 'Cơm chiên dương châu', price: 69000 , image: 'https://ameovat.com/wp-content/uploads/2016/05/cach-lam-com-chien-duong-chau-600x481.jpg', idCategoryFood: 5},
	{id: 24, name: 'Cơm chiên tỏi', price: 69000 , image: 'http://www.monngon.tv/uploads/images/images/com-chien-toi-1(1).jpg', idCategoryFood: 5},
	{id: 25, name: 'Cơm rang dưa bò', price: 79000 , image: 'https://pastaxi-manager.onepas.vn/content/uploads/articles/mon-an-vat-hai/com-rang-dua-bo/cach-lam-com-rang-dua-bo-1.jpg', idCategoryFood: 5},

	{id: 26, name: 'Lẩu cá đuối', price: 159000 , image: 'https://images.foody.vn/res/g1/5692/prof/s576x330/foody-mobile-10-jpg-275-636120576007753831.jpg', idCategoryFood: 6},
	{id: 27, name: 'Lẩu cá bớp', price: 149000 , image: 'https://sieungon.com/wp-content/uploads/2018/04/lau-ca-bop-nau-mang-chua.jpg', idCategoryFood: 6},
	{id: 28, name: 'Lẩu cá kèo', price: 129000 , image: 'https://www.huongnghiepaau.com/images/nau-an/cong-thuc/cach-nau-lau-ca-keo.jpg', idCategoryFood: 6},
	{id: 29, name: 'Lẩu nấm', price: 129000 , image: 'http://www.monngon.tv/uploads/images/images/cach-nau-lau-nam-5.jpg', idCategoryFood: 6},
	{id: 30, name: 'Lẩu gà lá giang', price: 139000 , image: 'https://beptruong.edu.vn/wp-content/uploads/2018/03/mon-lau-ga-la-giang.jpg', idCategoryFood: 6},

	{id: 31, name: 'Tiger nâu', price: 18000 , image: 'http://phanphoibia.com/wp-content/uploads/2017/08/bia-chai-tiger330.jpg', idCategoryFood: 7},
	{id: 32, name: 'Tiger bạc', price: 18000 , image: 'https://cdn.tgdd.vn/Files/2017/10/20/1034485/nen-uong-bia-tiger-hay-heineken-2_800x450.jpg', idCategoryFood: 7},
	{id: 33, name: 'Sài Gòn Special', price: 22000 , image: 'http://biasaigondongbac.com/files/sanpham/9/1/jpg/bia-chai-sai-gon-special.jpg', idCategoryFood: 7},
	{id: 34, name: 'Sài Gòn đỏ', price: 18000 , image: 'http://phanphoibiaruou.vn/files/sanpham/18/1/jpg/bia-sai-gon-do-export-335ml.jpg', idCategoryFood: 7},
	{id: 35, name: 'Heineken', price: 22000 , image: 'http://phanphoibia.com/wp-content/uploads/2017/08/bia-heineken-chai-250ml.jpg', idCategoryFood: 7},

	{id: 36, name: 'Sting', price: 10000 , image: 'http://thieulamua.com/wp-content/uploads/2017/10/nuoc-tang-luc-sting-dau-sleek-lon-330ml-1-700x467-1.jpg', idCategoryFood: 8},
	{id: 37, name: 'Nước suối', price: 8000 , image: 'https://s1.marquis.vn/assets/2017/2017-11/ca6830e6e4d9f35375ff3e68f605c09d.jpg', idCategoryFood: 8}
	{id: 38, name: 'Pepsi', price: 10000 , image: 'https://s1.marquis.vn/assets/2017/2017-11/83444d394234aed1be90dd1744c1fc18.jpg', idCategoryFood: 8},
	{id: 39, name: 'Sprite', price: 10000 , image: 'https://polarmart.com.sg/wp-content/uploads/2018/01/sprite-canned.png', idCategoryFood: 8}
	{id: 40, name: 'Redbull', price: 12000 , image: 'https://www.drinks.ng/wp-content/uploads/2018/06/262ed0d2a77c2d85aa843d902973ae0a70cbe479.png', idCategoryFood: 8},
];

const listBill = [
	{id: 1, status: true, time: new Date(), total: 159000},
	{id: 2, status: true, time: new Date(), total: 69000},
	{id: 3, status: true, time: new Date(), total: 207000},
	{id: 4, status: true, time: new Date(), total: 256000},
	{id: 5, status: true, time: new Date(), total: 956000},
	{id: 6 }, {id: 7 }, {id: 8 }, {id: 9 }, {id: 10 }
];

const listBillDetail = [
	{id: 1, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 1, idFood: 26, idBill: 1 },
	{id: 2, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 2, idFood: 19, idBill: 2 },
	{id: 3, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 2, idFood: 36, idBill: 2 },
	{id: 4, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 3, idFood: 21, idBill: 3 },
	{id: 5, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 3, idFood: 10, idBill: 3 },
	{id: 6, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 4, idFood: 1, idBill: 4 },
	{id: 7, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 4, idFood: 13, idBill: 4 },
	{id: 8, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 4, idFood: 12, idBill: 4 },
	{id: 9, quantity: 20, status: true, time: new Date(), idEmployee: 1, idTable: 5, idFood: 31, idBill: 5 },
	{id: 10, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 5, idFood: 17, idBill: 5 },
	{id: 11, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 5, idFood: 26, idBill: 5 },
	{id: 12, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 5, idFood: 8, idBill: 5 },
	{id: 13, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 5, idFood: 15, idBill: 5 },
	{id: 14, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 5, idFood: 4, idBill: 5 },
	{id: 15, quantity: 1, status: false, time: new Date(), idEmployee: 1, idTable: 1, idFood: 8, idBill: 6 },
	{id: 16, quantity: 1, status: true, time: new Date(), idEmployee: 1, idTable: 2, idFood: 12, idBill: 7 },
	{id: 17, quantity: 1, status: false, time: new Date(), idEmployee: 1, idTable: 2, idFood: 28, idBill: 7 },
	{id: 18, quantity: 5, status: true, time: new Date(), idEmployee: 1, idTable: 3, idFood: 40, idBill: 8 },
	{id: 19, quantity: 2, status: false, time: new Date(), idEmployee: 1, idTable: 3, idFood: 16, idBill: 8 },
	{id: 20, quantity: 2, status: true, time: new Date(), idEmployee: 1, idTable: 3, idFood: 8, idBill: 8 },
	{id: 21, quantity: 2, status: false, time: new Date(), idEmployee: 1, idTable: 4, idFood: 10, idBill: 9 },
	{id: 22, quantity: 1, status: false, time: new Date(), idEmployee: 1, idTable: 5, idFood: 16, idBill: 10 }
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
