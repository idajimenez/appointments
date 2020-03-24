import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Toast from 'react-native-root-toast';
import AppointmentForm from './AppointmentForm';
import {api} from '../../api';
import {setAppointments} from '../../redux/modules/appointment';

function AppointmentFormContainer({
  route,
  navigation,
  appointmentList,
  dispatch,
}) {
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState(
    route.params && route.params.data
      ? route.params.data
      : {
          doctor: '',
          doctorPhoto: '',
          patientName: '',
          time: '',
          bookDate: new Date(),
          comment: '',
        },
  );
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({_id: null});
  const [isActivePicker, setActive] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        api.getAllDoctors().then(result => {
          setDoctors(result);
          if (formData._id) {
            const doctor = result.find(d => formData.doctor === d.name);

            setSelectedDoctor(doctor);
          }
          setLoading(!isLoading);
        });
      } catch (e) {
        // failed to fetch
      }
    };

    if (isLoading && !doctors.length) {
      loadData();
    }
  }, [setLoading, isLoading, doctors, setSelectedDoctor, formData]);

  const handleSelectDoctor = value => {
    if (!value) {
      return;
    }

    const doctor = doctors.find(({_id}) => value === _id);
    setSelectedDoctor(doctor);
  };

  const handleChange = (value, key) => {
    if (!value) {
      return;
    }

    if (key === 'bookDate') {
      setActive(null);
      const day = new Date(value).getDay();

      if (day === 0) {
        Toast.show('No schedule for Sunday.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          backgroundColor: '#d23d3d',
        });

        return;
      }
    }

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const isSameDate = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const handleSave = () => {
    // get all schedule for a patient
    const bookedToday = appointmentList.filter(({bookDate}) =>
      isSameDate(new Date(bookDate), new Date(formData.bookDate)),
    );

    const patientBooked = bookedToday.filter(
      ({patientName, time}) =>
        patientName === formData.patientName && time === formData.time,
    );

    if (patientBooked.length) {
      // no same booking
      Toast.show('Patient already have appointment at this time', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        backgroundColor: '#d23d3d',
      });

      return;
    }

    const doctorBookings = bookedToday.filter(
      ({doctor}) => doctor === selectedDoctor.name,
    );
    let isBooked = false;

    if (doctorBookings.length) {
      const bookedTime = doctorBookings.map(({time}) => time);

      bookedTime.forEach(item => {
        if (item === formData.time) {
          isBooked = true;
        }
      });

      if (isBooked) {
        Toast.show('Doctor already have appointment at this time', {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          backgroundColor: '#d23d3d',
        });

        return;
      }
    }
    dispatch(
      setAppointments([
        ...appointmentList,
        {
          _id: new Date().getTime(),
          ...formData,
          doctor: selectedDoctor.name,
          doctorPhoto: selectedDoctor.photo,
        },
      ]),
    );

    navigation.goBack();
  };

  const doctorOptions = doctors.map(doc => ({
    label: doc.name,
    value: doc._id,
  }));

  return (
    <AppointmentForm
      {...formData}
      isLoading={isLoading}
      handleSelectDoctor={handleSelectDoctor}
      handleChange={handleChange}
      doctorOptions={doctorOptions}
      selectedDoctor={selectedDoctor}
      handleSave={handleSave}
      isActivePicker={isActivePicker}
      setActive={setActive}
    />
  );
}

function mapStateToProps({appointment}) {
  return {
    appointmentList: appointment.appointmentList,
  };
}

export default connect(mapStateToProps)(AppointmentFormContainer);
