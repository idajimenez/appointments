import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {formatDate} from '../../utils/helpers';

export default function Appointment({
  _id,
  doctor,
  doctorPhoto,
  patientName,
  time,
  bookDate,
  comment,
  handleSelectAppointment,
}) {
  return (
    <TouchableOpacity
      key={_id}
      style={styles.appointment}
      onPress={() => handleSelectAppointment(_id)}>
      <View style={styles.appointmentInfo}>
        <Image source={{uri: doctorPhoto}} style={styles.avatar} />
        <View style={styles.details}>
          <Text style={styles.doctorName}>{doctor}</Text>
          <Text style={styles.patientName}>Patient: {patientName}</Text>
          <Text>{comment}</Text>
        </View>
      </View>
      <View style={{...styles.appointmentInfo, ...styles.footer}}>
        <View style={styles.schedule}>
          <Text>
            {formatDate(bookDate)} | {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appointment: {
    width: '96%',
    padding: 5,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientName: {
    color: '#3db9ee',
    marginVertical: 2,
  },
  schedule: {
    borderRadius: 4,
    backgroundColor: '#e6e8e8',
    padding: 5,
    justifyContent: 'flex-end',
  },
  footer: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
});
