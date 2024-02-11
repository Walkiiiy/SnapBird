import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';
export default ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Image
      source={require('../assets/icons/upload.png')} // 图片路径
      style={[styles.buttonImage]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center', // 水平居中
    justifyContent: 'center', // 垂直居中
    flex: 1,
    backgroundColor: '#003366', // 按钮背景颜色
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
