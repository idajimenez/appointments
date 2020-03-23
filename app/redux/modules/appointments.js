const SET_APPOINTMENTS = 'SET_APPOINTMENTS';

export function setAppointments(data) {
  console.log(data);
  return {
    type: SET_APPOINTMENTS,
    data,
  };
}

const initialState = {
  appointments: [],
};

export default function appointments(state = initialState, action) {
  switch (action.type) {
    case SET_APPOINTMENTS:
      console.log(action.data);
      return {
        ...state,
        appointments: action.data,
      };
    default:
      return state;
  }
}
