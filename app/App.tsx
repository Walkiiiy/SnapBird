import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './view/Home';
import MeScreen from './view/Me';
import ChatScreen from './view/Chat';
import FileView from './view/FileView';
import PicView from './view/PicView';
import {
  FileUploadContext,
  FileOutcomeContext,
  UserContext,
  FileTypeContext,
} from './Context';

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = React.useState(null);
  const [fileOutcome, setFileOutcome] = React.useState([]);
  const [fileUpload, setFileUpload] = React.useState([]);
  const [fileType, setFileType] = React.useState([]);
  return (
    <UserContext.Provider value={{user, setUser}}>
      <FileOutcomeContext.Provider value={{fileOutcome, setFileOutcome}}>
        <FileUploadContext.Provider value={{fileUpload, setFileUpload}}>
          <FileTypeContext.Provider value={{fileType, setFileType}}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Chat"
                  component={ChatScreen}
                  options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTintColor: 'white',
                  }}
                />
                <Stack.Screen
                  name="FileView"
                  component={FileView}
                  options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTintColor: 'black',
                  }}
                />
                <Stack.Screen
                  name="PicView"
                  component={PicView}
                  options={{
                    headerTitle: '',
                    headerTransparent: false,
                    headerTintColor: 'black',
                  }}
                />
                <Stack.Screen
                  name="Me"
                  component={MeScreen}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </FileTypeContext.Provider>
        </FileUploadContext.Provider>
      </FileOutcomeContext.Provider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    // 根据需要添加其他样式
  },
  // ... 其他样式定义
});

export default App;
