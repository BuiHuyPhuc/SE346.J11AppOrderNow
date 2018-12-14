const employeeSignedInReducer = (state = null, action) => {
  if(action.type === 'EMPLOYEE_SIGNED_IN') return action.employee ;
  return state;
};

export default employeeSignedInReducer;
