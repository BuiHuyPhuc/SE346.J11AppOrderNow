defaultState = {
  id: 1,
	username: 'admin',
  password: 'admin',
  name:  'Admin',
  position: 'Quản lý',
  decentralization: true
}

const employeeSignedInReducer = (state = null, action) => {
  if(action.type === 'EMPLOYEE_SIGNED_IN') return action.employee ;
  return state;
};

export default employeeSignedInReducer;
