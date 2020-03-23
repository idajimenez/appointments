import React, {useState, useEffect, useLayoutEffect} from 'react';
import {ActionSheetIOS, Button} from 'react-native';
import Appointments from './Appointments';
import {api} from '../../api';

const now = new Date();

export default function AppointmentsContainer({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [active, setActive] = useState(null);
  const [currentFilter, setCurrentFilter] = useState({
    startDate: now.toLocaleDateString('en-US', {
      timeZone: 'Asia/Manila',
    }),
    endDate: new Date(now.setDate(now.getDate() + 1)).toLocaleDateString(
      'en-US',
      {timeZone: 'Asia/Manila'},
    ),
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        api.getAllAppointments().then(result => {
          setAppointmentList(result);
          setLoading(!isLoading);
        });
      } catch (e) {
        // failed to fetch
      }
    };

    if (!appointmentList.length) {
      loadData();
    }
  }, [setAppointmentList, setLoading, isLoading, appointmentList]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add"
          onPress={() => navigation.navigate('Form', {handleSave})}
        />
      ),
    });
  }, [handleSave, navigation]);

  const handleSetDates = date => {
    setCurrentFilter({
      ...currentFilter,
      [active]: date,
    });
    setActive();
  };

  const start = new Date(currentFilter.startDate).getTime();
  const end = new Date(currentFilter.endDate).getTime();
  const filterApppointments = appointmentList.filter(({bookDate}) => {
    const currentDate = new Date(bookDate).getTime();

    return currentDate >= start && currentDate <= end;
  });

  const handleSelectAppointment = id => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Delete', 'Edit', 'Cancel'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          handleDeleteAppointment(id);
        } else if (buttonIndex === 1) {
          handleEditAppointment(id);
        }
      },
    );
  };

  const handleDeleteAppointment = id => {
    const arr = appointmentList.filter(({_id}) => id !== _id);

    setAppointmentList(arr);
  };

  const handleEditAppointment = id => {
    const data = appointmentList.find(({_id}) => id === _id);

    navigation.navigate('Form', {data, handleSave});
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSave = data => {
    console.log(data);
    let list = [...appointmentList];

    if (data._id) {
      const index = appointmentList.findIndex(({_id}) => _id === data._id);

      list[index] = data;
      setAppointmentList(list);
    } else {
      list.push({_id: new Date().getTime(), ...data});
      setAppointmentList(list);
    }
  };

  return (
    <Appointments
      isLoading={isLoading}
      appointmentList={filterApppointments}
      setCurrentFilter={setCurrentFilter}
      active={active}
      setActive={setActive}
      handleSetDates={handleSetDates}
      currentFilter={currentFilter}
      filterApppointments={filterApppointments}
      handleSelectAppointment={handleSelectAppointment}
    />
  );
}
