/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import appStyles from '../../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {formatDate} from '../../utils/helpers';

export default function AppointmentForm({
  handleSelectDoctor,
  handleSave,
  patientName,
  comment,
  isLoading,
  handleChange,
  selectedDoctor,
  doctorOptions,
  isActivePicker,
  setActive,
  bookDate,
  time,
}) {
  return isLoading ? (
    <Loading />
  ) : (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Doctor</Text>
      <View style={{width: '85%'}}>
        <RNPickerSelect
          value={selectedDoctor._id}
          onValueChange={handleSelectDoctor}
          items={doctorOptions}
          style={{inputIOS: {...styles.input, width: '100%', height: 40}}}
        />
      </View>
      <Text style={styles.label}>Patient Name</Text>
      <TextInput
        placeholder="Patient Name"
        value={patientName}
        onChangeText={value => handleChange(value, 'patientName')}
        style={{...styles.input, height: 40}}
      />

      {selectedDoctor._id && (
        <>
          <Text style={styles.label}>Schedule</Text>
          <View style={styles.schedule}>
            {selectedDoctor.schedule.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.schedTime,
                  item.time === time
                    ? {backgroundColor: '#3db9ee', color: '#fff'}
                    : null,
                ]}
                onPress={() => handleChange(item.time, 'time')}>
                <Text style={item.time === time ? {color: '#fff'} : null}>
                  {item.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text style={styles.label}>Date</Text>
      <Button
        onPress={setActive}
        label={formatDate(bookDate)}
        style={styles.bookButton}
        isLight={true}
      />
      <DateTimePickerModal
        isVisible={!!isActivePicker}
        mode="date"
        onConfirm={value => handleChange(value, 'bookDate')}
        onCancel={setActive}
      />

      <Text style={styles.label}>Comment</Text>
      <TextInput
        placeholder="Comment"
        value={comment}
        onChangeText={value => handleChange(value, 'comment')}
        multiline={true}
        numberOfLines={4}
        style={styles.input}
      />
      <Button onPress={handleSave} label="Save" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...appStyles.container,
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  input: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    fontSize: 18,
    marginBottom: 10,
    padding: 8,
    width: '85%',
  },
  label: {
    width: '85%',
    color: '#3db9ee',
  },
  schedule: {
    flexDirection: 'row',
    width: '85%',
    flexWrap: 'wrap',
  },
  schedTime: {
    borderRadius: 4,
    backgroundColor: '#e6e8e8',
    padding: 10,
    justifyContent: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginBottom: 10,
    padding: 10,
    alignItems: 'flex-start',
  },
});
