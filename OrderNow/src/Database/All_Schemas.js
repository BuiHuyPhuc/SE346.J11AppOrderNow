import Realm from 'realm';

import { getFormattedDate } from './../Api/FormattedDateTime';

export const EMPLOYEE_SCHEMA = "Employee";
export const TABLE_SCHEMA = "Table";
export const CATEGORY_FOOD_SCHEMA = "CategoryFood";
export const FOOD_SCHEMA = "Food";
export const BILL_SCHEMA = "Bill";
export const BILL_DETAIL_SCHEMA = "BillDetail";

export const EmployeeSchema = {
    name: EMPLOYEE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        username: 'string',
        password: 'string',
        name:  'string',
        position: 'string',
        decentralization: { type: 'bool', default: false },
        phone: 'string?',
        image: 'string?'
    }
};

export const TableSchema = {
    name: TABLE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int'
    }
};

export const CategoryFoodSchema = {
    name: CATEGORY_FOOD_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name:  'string',
        image: 'string?'
    }
};

export const FoodSchema = {
    name: FOOD_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        price: 'int',
        image: 'string?',
        idCategoryFood: 'int'
    }
};

export const BillSchema = {
    name: BILL_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        status: { type: 'bool', default: false },
        time: 'date?',
        total: { type: 'int', default: 0 }
    }
};

export const BillDetailSchema = {
    name: BILL_DETAIL_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        quantity: { type: 'int', default: 1 },
        status: { type: 'bool', default: false },
        time: 'date',
        idEmployee: 'int',
        idTable: 'int',
        idFood: 'int',
        idBill: 'int'
    }
};

const databaseOptions = {
    path: 'OrderNow.realm',
    schema: [EmployeeSchema, TableSchema, CategoryFoodSchema, FoodSchema, BillSchema, BillDetailSchema],
    schemaVersion: 0,
};


// -----------------------------------> EmployeeSchema <-----------------------------------
export const insertNewEmployee = newEmployee => new  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(EMPLOYEE_SCHEMA, newEmployee);
            resolve(newEmployee);
        });
    })
    .catch(error => reject(error));
});

export const updateEmployee = employee => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let updatingEmployee = realm.objectForPrimaryKey(EMPLOYEE_SCHEMA, employee.id);
            updatingEmployee.password = employee.password;
            updatingEmployee.name = employee.name;
            updatingEmployee.position = employee.position;
            updatingEmployee.decentralization = employee.decentralization;
            updatingEmployee.phone = employee.phone;
            updatingEmployee.image = employee.image;
            resolve();
        });
    })
    .catch(error => reject(error));
});

export const deleteEmployee = employeeId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let deletingEmployee = realm.objectForPrimaryKey(EMPLOYEE_SCHEMA, employeeId);
            realm.delete(deletingEmployee);
            resolve();
        });
    })
    .catch(error => reject(error));
});

export const queryAllEmployee = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allEmployees = realm.objects(EMPLOYEE_SCHEMA);
        resolve(allEmployees);
    })
    .catch(error => reject(error));
});

export const signInEmployee = (username, password) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allEmployees = realm.objects(EMPLOYEE_SCHEMA);
        let employee = null;
        allEmployees.map(e => {
            if(e.username === username && e.password === password)
                employee = e;
        })
        resolve(employee);
    })
    .catch(error => reject(error));
});


// -----------------------------------> TableSchema <-----------------------------------
export const insertNewTable = newTable => new  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(TABLE_SCHEMA, newTable);
            resolve(newTable);
        });
    })
    .catch(error => reject(error));
});

export const deleteTable = tableId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let deletingTable = realm.objectForPrimaryKey(TABLE_SCHEMA, tableId);
            realm.delete(deletingTable);
            resolve();
        });
    })
    .catch(error => reject(error));
});

export const queryAllTable = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allTables = realm.objects(TABLE_SCHEMA);
        resolve(allTables);
    })
    .catch(error => reject(error));
});

export const tableStatus = tableId => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        // Lọc tất cả những hóa đơn chưa thanh toán
        let filteredBills = realm.objects(BILL_SCHEMA).filtered(`status = false`);
        
        // Lọc tất cả những chi tiết hóa đơn theo số bàn và hóa đơn chưa thanh toán
        if(filteredBills.length > 0) {
            filteredBills.map(e => {
                let filteredBillDetail = realm.objects(BILL_DETAIL_SCHEMA)
                    .filtered(`idBill = ${e.id} AND idTable = ${tableId}`);
                if(filteredBillDetail.length > 0) {
                    filteredBillDetail.map(e => {
                        return resolve(e.idBill);
                    })                    
                }
            })
        }

        resolve(null);        
    })
    .catch(error => reject(error));
});


// -----------------------------------> CategoryFoodSchema <-----------------------------------
export const insertNewCategoryFood = newCategoryFood => new  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(CATEGORY_FOOD_SCHEMA, newCategoryFood);
            resolve(newCategoryFood);
        });
    })
    .catch(error => reject(error));
});

export const updateCategoryFood = categoryFood => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(()=>{
            let updatingCategoryFood = realm.objectForPrimaryKey(CATEGORY_FOOD_SCHEMA, categoryFood.id);
            updatingCategoryFood.name = categoryFood.name;
            updatingCategoryFood.image = categoryFood.image;
            resolve();
        });
    })
    .catch(error => reject(error));
});

export const deleteCategoryFood = categoryFoodId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            // Lọc tất cả món ăn theo loại món ăn và xóa
            let allFoods = realm.objects(FOOD_SCHEMA).filtered(`idCategoryFood = ${categoryFoodId}`);
            realm.delete(allFoods);

            let deletingCategoryFood = realm.objectForPrimaryKey(CATEGORY_FOOD_SCHEMA, categoryFoodId);
            realm.delete(deletingCategoryFood);

            resolve();
        });
    })
    .catch(error => reject(error));
});

export const queryAllCategoryFood = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allCategoryFoods = realm.objects(CATEGORY_FOOD_SCHEMA);      
        resolve(allCategoryFoods);        
    })
    .catch(error => reject(error));
});

//Management CategoryFood
export const queryAllCategoryFoodAndFoods = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allCategoryFoods = realm.objects(CATEGORY_FOOD_SCHEMA);
        let allCategoryFood_Foods = [];
        
        // Duyệt tất cả những loại món ăn và lấy ra những món ăn thuộc loại đó
        if(allCategoryFoods.length > 0) {
            allCategoryFoods.map(e => {
                let allFoods = realm.objects(FOOD_SCHEMA).filtered(`idCategoryFood = ${e.id}`);
                allCategoryFood_Foods.push({ categoryFood: e, foods: allFoods });
            })
        }

        resolve(allCategoryFood_Foods);        
    })
    .catch(error => reject(error));
});


// -----------------------------------> FoodSchema <-----------------------------------
export const insertNewFood = newFood => new  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(FOOD_SCHEMA, newFood);
            resolve(newFood);
        });
    })
    .catch(error => reject(error));
});

export const updateFood = food => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let updatingFood = realm.objectForPrimaryKey(FOOD_SCHEMA, food.id);
            updatingFood.name = food.name;
            updatingFood.price = food.price;
            updatingFood.image = food.image;
            updatingFood.idCategoryFood = food.idCategoryFood;
            resolve();
        });
    })
    .catch(error => reject(error));
});

export const deleteFood = foodId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let deletingFood = realm.objectForPrimaryKey(FOOD_SCHEMA, foodId);
            realm.delete(deletingFood);
            resolve();
        });
    })
    .catch(error => reject(error));
});

export const queryAllFood = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allCategoryFoods = realm.objects(CATEGORY_FOOD_SCHEMA);
        let allCategoryFood_Foods = [];

        // Duyệt tất cả những loại món ăn và lấy ra những món ăn thuộc loại đó
        if(allCategoryFoods.length > 0) {
            allCategoryFoods.map(e => {
                let categoryFoodName = e.name;
                let allFoods = realm.objects(FOOD_SCHEMA).filtered(`idCategoryFood = ${e.id}`);
                // Duyệt tất cả những món ăn gán tên loại món theo món ăn
                if(allFoods.length > 0) {
                    allFoods.map(e => {
                        allCategoryFood_Foods.push({ food: e, categoryFoodName });
                    })
                }
            })
        }

        resolve(allCategoryFood_Foods);        
    })
    .catch(error => reject(error));
});

export const filterFoodByCategoryFoodId = categoryFoodId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allFoodOfCategoryFood = realm.objects(FOOD_SCHEMA).filtered(`idCategoryFood = ${categoryFoodId}`);
        let allFoods = [];

        if(allFoodOfCategoryFood.length > 0) {
            allFoodOfCategoryFood.map(e => {
                allFoods.push({ food: e, quantity: 1 });
            })
        }

        resolve(allFoods);        
    })
    .catch(error => reject(error));
});


export const filterUnfinishedFood = () => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let filterUnpaidBills = realm.objects(BILL_SCHEMA).filtered(`status = false`);
        let filterUnfinishedFoods = [];
        // Duyệt tất cả chi tiết hóa đơn chưa hoàn thành và lấy ra món ăn thuộc chi tiết đó
        if(filterUnpaidBills.length > 0) {
            filterUnpaidBills.map(e => {
                let filterUnfinishedBillDetails = realm.objects(BILL_DETAIL_SCHEMA).filtered(`idBill = ${e.id} AND status = false`);
                if(filterUnfinishedBillDetails.length > 0) {
                    filterUnfinishedBillDetails.map(e => {
                        let food = realm.objectForPrimaryKey(FOOD_SCHEMA, e.idFood);
                        filterUnfinishedFoods.push({ food, billDetail: e });
                    })
                }
            })
        }
        
        resolve(filterUnfinishedFoods);
    })
    .catch(error => reject(error));
});


// -----------------------------------> BillSchema <-----------------------------------
export const insertNewBill = newBill => new  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(BILL_SCHEMA, newBill);
            resolve(newBill);
        });
    })
    .catch(error => reject(error));
});

export const updateBill = bill => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(()=>{
            let updatingBill = realm.objectForPrimaryKey(BILL_SCHEMA, bill.id);
            updatingBill.status = bill.status;
            updatingBill.time = bill.time;
            updatingBill.total = bill.total;
            resolve();
        });
    })
    .catch(error => reject(error));
});


export const queryAllBill = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allBills = realm.objects(BILL_SCHEMA);
        resolve(allBills);        
    })
    .catch(error => reject(error));
});

export const filterUnpaidBill = () => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let filterUnpaidBills = realm.objects(BILL_SCHEMA).filtered(`status = false`);
        let allUnpaidBills = [];
        // Duyệt tất cả hóa đơn chưa thanh toán và lọc ra tất cả chi tiết hóa đơn
        if(filterUnpaidBills.length > 0) {
            filterUnpaidBills.map(e => {
                let filterBillDetails = realm.objects(BILL_DETAIL_SCHEMA).filtered(`idBill = ${e.id}`);
                let total = 0;
                let table = null;
                //Duyệt tất cả chi tiết hóa đơn và lấy ra món ăn thuộc chi tiết đó
                filterBillDetails.map(e => {
                    let food = realm.objectForPrimaryKey(FOOD_SCHEMA, e.idFood);
                    table = e.idTable;
                    total += food.price * e.quantity;
                });

                allUnpaidBills.push({ bill: e, table, total });
            })
        } 
        resolve(allUnpaidBills);
    })
    .catch(error => reject(error));
});


// -----------------------------------> BillDetailSchema <-----------------------------------
export const insertNewBillDetail = newBillDetail => new  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(BILL_DETAIL_SCHEMA, newBillDetail);
            resolve(newBillDetail);
        });
    })
    .catch(error => reject(error));
});

export const insertNewBillDetailOnBillOld = newBillDetail => new  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(BILL_DETAIL_SCHEMA, newBillDetail);
            resolve(newBillDetail);
        });
    })
    .catch(error => reject(error));
});

export const updateStatusBillDetail = (billDetail, status) => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let updatingBillDetail = realm.objectForPrimaryKey(BILL_DETAIL_SCHEMA, billDetail.id);
            updatingBillDetail.status = status;
            resolve();
        });
    })
    .catch(error => reject(error));
});

export const queryAllBillDetail = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let allBillDetails = realm.objects(BILL_DETAIL_SCHEMA);
        resolve(allBillDetails);        
    })
    .catch(error => reject(error));
});

export const filterFoodByTable = table => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let filteredBillDetails = realm.objects(BILL_DETAIL_SCHEMA).filtered(`idTable = ${table}`);
        let filterFoods = [];
        // Duyệt tất cả chi tiết hóa đơn chưa hoàn thành và lấy ra món ăn thuộc chi tiết đó
        if(filteredBillDetails.length > 0) {
            filteredBillDetails.map(e => {
                let bill = realm.objects(BILL_SCHEMA).filtered(`id = ${e.idBill} AND status = false`);
                if(bill.length > 0) {
                    let food = realm.objectForPrimaryKey(FOOD_SCHEMA, e.idFood);
                    filterFoods.push({ food, billDetail: e });
                }
                //filterFinishedFoods.push({ food, billDetail: e });
            })
        }        

        resolve(filterFoods);
    })
    .catch(error => reject(error));
}); 


// -------------------------> BillSchema - BillDetailSchema <-------------------------
export const deleteAllBillAndBillDetail = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let allBillDetails = realm.objects(BILL_DETAIL_SCHEMA);
            realm.delete(allBillDetails);

            let allBills = realm.objects(BILL_SCHEMA);
            realm.delete(allBills);
            
            resolve();
        });
    })
    .catch(error => reject(error));
});


// -----------------------------------> Report <-----------------------------------
export const filterBillByMonth = month => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let filterBills = realm.objects(BILL_SCHEMA).filtered(`status = true`);
        let filterBillByMonth = [];

        // Lọc những hóa đơn nào thuộc tháng đã chọn
        filterBills.map(e => {
            if(e.time.getMonth() + 1 == month) {
                filterBillByMonth.push(e)
            }
        })
        
        resolve(filterBillByMonth);
    })
    .catch(error => reject(error));
});

export const filterBillByDay = day => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let filterBills = realm.objects(BILL_SCHEMA).filtered(`status = true`);
        let filterBillByDay = [];

        // Lọc những hóa đơn nào thuộc tháng đã chọn
        filterBills.map(e => {
            if(getFormattedDate(e.time) == day) {
                filterBillByDay.push(e)
            }
        })
        
        resolve(filterBillByDay);
    })
    .catch(error => reject(error));
});


// -----------------------------------> Filter <-----------------------------------
export const filterCategoryFoodOrFood = searchText => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        //Lọc theo loại món ăn
        let filterCategoryFood_Foods = realm.objects(CATEGORY_FOOD_SCHEMA).filtered(`name CONTAINS[c] "${searchText}"`); //[c] = case insensitive
        if(filterCategoryFood_Foods.length < 1) {
            //Lọc theo món ăn
            filterCategoryFood_Foods = realm.objects(FOOD_SCHEMA).filtered(`name CONTAINS[c] "${searchText}"`); //[c] = case insensitiv
            let allFoods = [];
            if(filterCategoryFood_Foods.length > 0) {
                filterCategoryFood_Foods.map(e => {
                    allFoods.push({ food: e, quantity: 1 });
                })
            }
            resolve({listData: allFoods, nameList: 'food'});
        } else {
            resolve({listData: filterCategoryFood_Foods, nameList: 'categoryFood'}); 
        }
    })
    .catch(error => reject(error));
});

export default new Realm(databaseOptions); 
