import React, {useState, useEffect} from 'react';
import AppointmentForm from './AppointmentForm';
import {api} from '../../api';

export default function AppointmentFormContainer({route, navigation}) {
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

    console.log(formData);
  }, [setLoading, isLoading, doctors, setSelectedDoctor, formData]);

  const handleSelectDoctor = value => {
    const doctor = doctors.find(({_id}) => value === _id);
    setSelectedDoctor(doctor);
  };

  const handleChange = (value, key) => {
    if (key === 'bookDate') {
      setActive(null);
    }

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSave = () => {
    route.params.handleSave({
      ...formData,
      doctor: selectedDoctor.name,
      doctorPhoto: selectedDoctor.photo,
    });

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
