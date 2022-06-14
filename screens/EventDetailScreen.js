import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect, useRef } from "react";

const db = SQLite.openDatabase("events2.db");

export default function EventDetailScreen({ navigation, route }) {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    //get event id
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM events2 WHERE id=${route.params.index}`,
        null, //pass a null argument object
        //Destructuring // take out rows frm the parameter first then take out _array and set it as events
        (txObj, { rows: { _array } }) => setEvent(_array), //success callback function
        (txObj, error) => console.log("Error ", error)
      );
    });
  });

  //create a state variable to keep track of the text input
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [bring, setBring] = useState(event.bring);
  const [attire, setAttire] = useState(event.attire);
  const [notes, setNotes] = useState(event.notes);

  // const isFirstRender = useRef(true);
  // useEffect(() => {
  //   if (!isFirstRender.current) {
  //     console.log("\n'Event' state was updated");
  //     console.log("\nUpdated event array:\n", event);
  //     navigation.navigate("EventsHome", event); // event is JS Array
  //   }
  // }, [event]);

  // // after the screen is rendered for the first time, we set isFirstRender flag to false
  // useEffect(() => {
  //   console.log("\nScreen rendered");
  //   isFirstRender.current = false; // toggle flag after first render/mounting
  // }, []);

  //updateEvent button
  function updateEvent() {
    useEffect(() => {
      //update sql table
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE events2 SET title = title, location = location, date = date, startTime = startTime, endTime = endTime, bring = bring, attire = attire, notes = notes",
          null, //pass a null argument object
          //Destructuring // take out rows frm the parameter first then take out _array and set it as events
          (txObj, { rows: { _array } }) => setEvent(_array), //success callback function
          (txObj, error) => console.log("Error ", error)
        );
      });
    });
    navigation.navigate("EventsHome");
  }

  return (
    <SafeAreaView style={styles.containerBody}>
      <ScrollView>
        <View>
          <Text style={styles.titleLabel}>Title</Text>
          <TextInput
            style={styles.textInput}
            value={title}
            onChangeText={(newText) => setTitle(newText)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.textInput}
            value={date}
            onChangeText={(newText) => setDate(newText)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Start Time</Text>
          <TextInput
            style={styles.textInput}
            value={startTime}
            onChangeText={(newText) => setStartTime(newText)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>End Time</Text>
          <TextInput
            style={styles.textInput}
            value={endTime}
            onChangeText={(newText) => setEndTime(newText)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.textInput}
            value={location}
            onChangeText={(newText) => setLocation(newText)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>To Bring</Text>
          <TextInput
            style={styles.textInput}
            value={bring}
            onChangeText={(newText) => setBring(newText)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Attire</Text>
          <TextInput
            style={styles.textInput}
            value={attire}
            onChangeText={(newText) => setAttire(newText)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.textInput}
            value={notes}
            onChangeText={(newText) => setNotes(newText)}
          ></TextInput>
        </View>

        <View style={styles.buttons}>
          {/* <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onPress}
          >
            <Text style={styles.buttonText}> Delete Event </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={updateEvent}
          >
            <Text style={styles.buttonText}> Save </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerBody: {
    marginTop: 30,
    backgroundColor: "#E3EBEE",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  titleLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    height: 35,
  },
  label: {
    fontSize: 17,
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "center",
  },
  button: {
    padding: 10,
    margin: 20,
  },
  saveButton: {
    backgroundColor: "#0D532F",
    borderRadius: 15,
    paddingLeft: 38,
    paddingRight: 38,
  },
  deleteButton: {
    backgroundColor: "#A12626",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
