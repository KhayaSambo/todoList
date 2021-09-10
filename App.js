import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import {ToastAndroid} from 'react-native' ;
export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const handleAddTask = () => {
    if(task){ Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
    }else{
      showToastWithGravity();
    }
  }
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy); 
  }
  return (
    <View style={styles.container}>
      <View style= {styles.tasksWrapper}>
      <Text style={styles.sectionTitle}> Todo List App </Text>
      </View>
     <View style= {styles.items}>
       {/* WHere the tasks will */}
       {
         taskItems.map((item, index) => {
           return(
            <TouchableOpacity onPress={() => completeTask(index)}>
                <Task text={item} />
            </TouchableOpacity>
           ) 
         })
       }
     </View>

     {/* Write a task */}
      
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
      style = {styles.writeTaskWrapper}>
        <TextInput style = {styles.input} placeholder={'Write a task'} value={task}  onChangeText= {text => setTask(text)}/>

      <TouchableOpacity onPress={() => handleAddTask() } >
        <View style= {styles.addWrapper}>
          <Text style = {styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#EBEAED',

  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold', 
  },
  items:{
    marginTop: 30,
  },
  tasksWrapper:{
    paddingTop: 50,
    paddingHorizontal: 10,
    shadowColor: "#000",

  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
input: {
  paddingVertical: 15,
  paddingHorizontal: 15,
  backgroundColor: '#FFF',
  borderRadius: 60,
  borderColor: '#C0C0C0',
  width: 250,
  shadowColor: "#000",
  shadowOffset: {
	width: 0,
	height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.00,
  elevation: 24,
},
addWrapper: {
  width: 60,
  height: 60, 
  backgroundColor: '#41B5B3',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#C0C0C0',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.00,
  elevation: 24,
},
addText: {
  fontWeight: 'bold', 
},
});
