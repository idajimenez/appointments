const SET_APPOINTMENTS = 'SET_APPOINTMENTS';

export function setAppointments(data) {
  return {
    type: SET_APPOINTMENTS,
    data,
  };
}

const initialState = {
  appointmentList: [],
};

export default function appointment(state = initialState, action) {
  switch (action.type) {
    case SET_APPOINTMENTS:
      return {
        appointmentList: action.data,
      };
    default:
      return state;
  }
}
