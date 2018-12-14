const signOutReducer = (state = null, action) => {
  if(action.type === 'SIGN_OUT') return action.navigation ;
  return state;
};

export default signOutReducer;