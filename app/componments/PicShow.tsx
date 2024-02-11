import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
const SquareImageWithCloseButton = ({imageUrl, onClose}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative', // 为了绝对定位关闭按钮
    width: 200, // 图片宽度
    height: 200, // 图片高度（和宽度相同，形成正方形）
  },
  image: {
    width: '100%', // 图片填充容器
    height: '100%', // 图片填充容器
  },
  closeButton: {
    position: 'absolute', // 绝对定位
    top: -10, // 向上偏移
    right: -10, // 向右偏移
    backgroundColor: 'red', // 关闭按钮背景颜色
    width: 30, // 宽度
    height: 30, // 高度
    borderRadius: 15, // 设置为宽/高的一半，形成圆形
    justifyContent: 'center', // 内部文字居中
    alignItems: 'center', // 内部文字居中
  },
  closeButtonText: {
    color: 'white', // 文字颜色
    fontSize: 16, // 文字大小
  },
});

export default SquareImageWithCloseButton;
