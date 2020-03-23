const initialState = {
  profileData: {},
  userToken: null,
  isSignout: false,
  isAppLoading: true,
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        profileData: action.profileData,
        userToken: action.token,
        isAppLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
}
