import React, {useState} from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';

export default function UploadImgButton({onPress}) {
  const [backgroundColor, setBackgroundColor] = useState('#003366'); // 初始背景颜色

  const handlePress = () => {
    if (backgroundColor == '#003366') {
      setBackgroundColor('#008080');
    } else {
      setBackgroundColor('#003366');
    }
    onPress();
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, {backgroundColor}]}>
      <Image
        source={require('../assets/icons/upload.png')} // 图片路径
        style={[styles.buttonImage]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center', // 水平居中
    justifyContent: 'center', // 垂直居中
    flex: 1,
    height: 40,
    padding: 10, // 按钮内边距
    margin: 10,
    borderRadius: 50,
  },
  buttonImage: {
    width: 20, // 图片宽度
    height: 20, // 图片高度
  },
});
