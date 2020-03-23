import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loading from '../../components/Loading';
import Appointment from './Appointment';
import {formatDate} from '../../utils/helpers';

export default function Appointments({
  isLoading,
  appointmentList,
  handleSetDates,
  currentFilter,
  setCurrentFilter,
  active,
  setActive,
  filterApppointments,
  handleSelectAppointment,
}) {
  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.dates}>
            <Button
              onPress={() => setActive('startDate')}
              label={formatDate(currentFilter.startDate)}
              style={styles.dateButton}
            />
            <Button
              onPress={() => setActive('endDate')}
              label={formatDate(currentFilter.endDate)}
              style={styles.dateButton}
            />
          </View>
          <DateTimePickerModal
            isVisible={!!active}
            mode="date"
            onConfirm={handleSetDates}
            onCancel={setActive}
          />

          {appointmentList.map(item => (
            <Appointment
              key={item._id}
              {...item}
              handleSelectAppointment={handleSelectAppointment}
            />
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dateButton: {
    width: '50%',
    borderRadius: 0,
  },
});
