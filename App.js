import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Button,
  SafeAreaView,
  Text,
  View,
  Alert,
  TextInput
} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar style="auto" />
        <Text>Type question below!</Text>
        <TextInput
          style={{ 
            height: 40,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#000000',
            minWidth: 200,
            paddingVertical: 8,
            paddingHorizontal: 10
          }}
          placeholder="Type here to translate!"
          onChangeText={newText => {
            console.log(newText);
            setText(newText);
          }}
          defaultValue={text}
        />
        <Button
          title="Submit"
          onPress={() => {
            //Get the question and send to API
            //Add Fetch API here
            //#Code Here
            fetch('http://192.168.1.155:8000/question',
            {
              method: 'POST',
              headers: {Accept: 'application/json','Content-Type': 'application/json' },
              body: JSON.stringify({question : text})
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                setResponseText(data)
              })
              .catch(error => console.error(error))

            //Set response text to display

          }}
        />
        <Text style={styles.responseText}>
          {responseText}
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responseText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
