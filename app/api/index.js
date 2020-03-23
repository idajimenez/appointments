export const api = {
  getUser: async () => {
    return require('./dummies/user.json');
  },
  getAllDoctors: async () => {
    return require('./dummies/doctors.json');
  },
  getAllAppointments: async () => {
    return require('./dummies/appoitments.json');
  },
};
