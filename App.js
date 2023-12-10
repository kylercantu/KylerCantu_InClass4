import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useState } from "react";

// Any additional imports
import Task from "./components/Task";

export default function App() {
  // state management for input area
  const [task, setTask] = useState();
  // state management too store all tasks
  const [taskItems, setTaskItems] = useState([]);

  // eventlistener logic for creating a task
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  // eventlistener logic for deleting a task
  const completeTask = (index) => {
    let copyItems = [...taskItems];
    // remove the specific task as selected by the user
    copyItems.splice(index, 1);
    // update the original array by rewriting it with the copied array
    setTaskItems(copyItems);
  };

  return (
    <View style={styles.container}>
      {/* list all the to do items */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>My To Do Items</Text>

        {/* Container/Wrappper for the tasks to be rendered */}
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            // Need to return or else it won't be rendered on screen
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  completeTask(index);
                }}
              >
                <Task text={item} />;
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* User input for todo tasks */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Add your to do item here"}
          value="task"
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },

  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "C0C0C0",
    borderWidth: 1,
  },
});
