import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

//save things to this database
const db = SQLite.openDatabase("events2.db"); //it will check for a database in the phone's file system. If it exist it will open it otherwise it will create it

export default function EventScreen({ navigation, route }) {
  //create a state variable for our events
  const [events, setEvents] = useState([]); //initialise to empty list of events

  function refreshEvents() {
    //function of refreshing events by showing the all the present events aft it has been added or deleted
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM events2",
        null, //pass a null argument object
        //Destructuring // take out rows frm the parameter first then take out _array and set it as events
        (txObj, { rows: { _array } }) => setEvents(_array), //success callback function
        (txObj, error) => console.log("Error ", error)
      );
    });
  }

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          //create table if it does not exist and call the table "events". The columns are id, title and done
          `CREATE TABLE IF NOT EXISTS 
					events2
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
				date TEXT,
                startTime TEXT,
				endTime TEXT,
				location TEXT,
				bring TEXT,
				attire TEXT,
				notes TEXT);`
        );
      },
      null,
      refreshEvents
    ); // (null) if it fails we will ask it to fail silently, if it passes we will ask it to refreshEvents
  }, []); //run the code inside the useEffect function only when this program is first run

  function addNote() {
    navigation.navigate("Add Event");
  }

  function deleteNote(id) {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM events2 WHERE id = ${id}`);
      },
      null,
      refreshEvents
    );
  }

  // console.log("events:\n", events);

  // useEffect(() => {
  //   //code that will happen when route.params change
  //   if (route?.params) {
  //     //if route.params is not undefined
  //     let newNote = route.params[route.params.length - 1]; // access the last element of the array
  //     db.transaction(
  //       (tx) => {
  //         tx.executeSql(
  //           "INSERT INTO events2 (title, date, startTime, endTime, location, bring, attire, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  //           [
  //             newNote.title,
  //             newNote.date,
  //             newNote.startTime,
  //             newNote.endTime,
  //             newNote.location,
  //             newNote.bring,
  //             newNote.attire,
  //             newNote.notes,
  //           ]
  //         );
  //       },
  //       null,
  //       refreshEvents
  //     ); //the ? represent the sql parameter that we passed in using [route.params.text]
  //   }
  // }, [route?.params]);
  // //if route.params doesnt exist then it will return undefined. So we need to check if it exists before we can use it.
  // //if it does exit it will keep going down the list of parameteers

  useEffect(() => {
    if (route?.params) {
      refreshEvents();
    }
  }, [route.params]);

  //This adds the new note button in the header
  useEffect(() => {
    // console.log("This effect happened!");
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          {/* icon copied frm internet */}
          <Entypo
            name="new-message"
            size={24}
            color="black"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  //decides how the diff note items look like
  function renderItem({ item, index }) {
    //ADDED index
    return (
      <View
        style={{
          padding: 10,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          paddingTop: 20,
          paddingBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between", //move the other icon all the way to the right
        }}
      >
        {/* press title to go to Event Details  */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Event Details", { index: index })}
        >
          <Text style={{ fontSize: 16, textAlign: "left" }}>{item.title}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, textAlign: "left" }}>{item.date}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  //display the events
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        style={{ width: "100%" }} //takes up the entire space
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3EBEE",
    alignItems: "center",
    justifyContent: "center",
  },
});
