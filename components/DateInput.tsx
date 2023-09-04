import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { Button } from "react-native";

const DateInput = ({
  showmodal,
  setshowmodal,
  setstartdate,
  setenddate,
  startdate,
}: {
  showmodal: boolean;
  setshowmodal: (newValue: boolean) => void;
  setstartdate: any;
  setenddate: any;
  startdate: any;
}) => {
  const minDate = new Date();
  const maxDate = new Date(2050, 6, 3);
  function handlechange(value: any) {
    if (value) {
      const date = new Date(value);
      if (startdate) {
        setenddate(date);
        setshowmodal(false);
      } else {
        setstartdate(date);
      }
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showmodal}
      onRequestClose={() => {
        setshowmodal(!showmodal);
      }}
    >
      <View style={styles.centeredView}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={handlechange}
        />
        <Button title="Close" onPress={() => setshowmodal(false)} />
      </View>
    </Modal>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
});
