import Realm from 'realm';

import getFormattedDate from './../Api/FormattedDate.js';

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
            realm.delete(deletingEmployee.billDetails);
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

// export const updateTable = table => new Promise((resolve,reject) => {
//     Realm.open(databaseOptions)
//     .then(realm => {
//         realm.write(()=>{
//             let updatingTable = realm.objectForPrimaryKey(TABLE_SCHEMA, table.id);
//             updatingTable.id = table.id;
//             resolve();
//         });
//     })
//     .catch(error => reject(error));
// });

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
            let deletingCategoryFood = realm.objectForPrimaryKey(CATEGORY_FOOD_SCHEMA, categoryFoodId);
            let allFoods = realm.objects(FOOD_SCHEMA);
            allFoods.map(e => {
                if(e.idCategoryFood === categoryFoodId)
                    realm.delete(e);
            });
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
            console.log("food", food);
            let updatingFood = realm.objectForPrimaryKey(FOOD_SCHEMA, food.id);
            console.log("updatingFood", updatingFood);
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
        let allFoods = realm.objects(FOOD_SCHEMA);
        resolve(allFoods);        
    })
    .catch(error => reject(error));
});

export const queryAllFoodByCategoryFood = categoryFoodId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let categoryFood = realm.objectForPrimaryKey(CATEGORY_FOOD_SCHEMA, categoryFoodId);
        resolve(categoryFood.foods);        
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

export const filterBillByStatus = status => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let filteredBills = realm.objects(BILL_SCHEMA).filtered(`status = "${status}"`);
        resolve(filteredBills);
    })
    .catch(error => reject(error));
});


// -----------------------------------> BillDetailSchema <-----------------------------------
export const insertNewBillDetail = (newBillDetail, employeeId, tableId, foodId, billId) => new  Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let employee = realm.objectForPrimaryKey(EMPLOYEE_SCHEMA, employeeId);
            let table = realm.objectForPrimaryKey(TABLE_SCHEMA, tableId);
            let food = realm.objectForPrimaryKey(FOOD_SCHEMA, foodId);
            let bill = realm.objectForPrimaryKey(BILL_SCHEMA, billId);
            realm.create(BILL_DETAIL_SCHEMA, newBillDetail);
            employeeId.billDetails.push(newBillDetail);
            table.billDetails.push(newBillDetail);
            food.billDetails.push(newBillDetail);
            bill.billDetails.push(newBillDetail);
            resolve(newBillDetail);
        });
    })
    .catch(error => reject(error));
});

export const updateBillDetail = billDetail => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let updatingBillDetail = realm.objectForPrimaryKey(FOOD_SCHEMA, billDetail.id);
            updatingBillDetail.quantity = billDetail.quantity;
            updatingBillDetail.status = billDetail.status;
            updatingBillDetail.time = billDetail.time;
            resolve();
        });
    })
    .catch(error => reject(error));
});

export const billDetailOfTable = tableId => new Promise((resolve,reject) => {
    Realm.open(databaseOptions).then(realm=>{
        let table = realm.objectForPrimaryKey(TABLE_SCHEMA, tableId);
        resolve(table.billDetails);        
    })
    .catch(error => reject(error));
});


// -----------------------------------> Report <-----------------------------------
export const filterBillByMonth = month => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let filteredBills = realm.objects(BILL_SCHEMA).filtered(`time.getMonth() + 1 = "${month}"`);
        resolve(filteredBills);
    })
    .catch(error => reject(error));
});

export const filterBillByDate = date => new Promise((resolve,reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        let filteredBills = realm.objects(BILL_SCHEMA).filtered(
                `getFormattedDate(time) = "${getFormattedDate(date)}"`
                //`time.getDate() = "${date.getDate()}" AND time.getMonth() = "${date.getMonth()}" AND time.getFullYear() + 1 = "${date.getFullYear()}"`
            );
        resolve(filteredBills);
    })
    .catch(error => reject(error));
});

export default new Realm(databaseOptions); 
