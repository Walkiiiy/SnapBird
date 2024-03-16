import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  Image,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const ReadOnlyTextInputWithCopy = ({textValue}) => {
  const copyToClipboard = () => {
    Clipboard.setString(textValue);
    alert('文本已复制！');
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={textValue}
        editable={true}
        scrollEnabled={true}
      />
      <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
        <Image
          source={require('../assets/icons/copy.png')}
          style={{
            width: 14,
            height: 14,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#222222', // 暗背景色
    position: 'relative',
  },
  textInput: {
    borderWidth: 0, // 无边框
    borderRadius: 5, // 轻微的圆角
    backgroundColor: '#555', // 文本框的深色背景
    color: '#fff', // 文字颜色为白色
    width: 300,
    height: 150,
    padding: 15,
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#333333', // 按钮的深色背景
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReadOnlyTextInputWithCopy;
