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

const db = SQLite.openDatabase("events.db");

export default function EventDetailScreen({ route, navigation }) {
  function refreshEvents() {
    //function of refreshing events by showing the all the present events aft it has been added or deleted
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM events",
        null, //pass a null argument object
        //Destructuring // take out rows frm the parameter first then take out _array and set it as events
        (txObj, { rows: { _array } }) => setEvents(_array), //success callback function
        (txObj, error) => console.log("Error ", error)
      );
    });
  }

  function deleteEvent(id) {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM events WHERE id = ${id}`);
      },
      null,
      refreshEvents
    );
  }

  //   function addEvent() {
  //     setEvent([...event, { title: title, startingTime: sTime }]);
  //   }

  function onPress(id) {
    return deleteEvent(id), navigation.navigate("EventsHome"), refreshEvents();
  }

  return (
    <SafeAreaView style={styles.containerBody}>
      <ScrollView>
        <View>
          <Text style={styles.titleLabel}>Title</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Date</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Start Time</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View>
          <Text style={styles.label}>End Time</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View>
          <Text style={styles.label}>To Bring</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Attire</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Notes</Text>
          <TextInput style={styles.textInput}></TextInput>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onPress}
          >
            <Text style={styles.buttonText}> Delete Event </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.saveButton]}>
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
