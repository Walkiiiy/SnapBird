import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
function truncateString(str) {
  if (str.length > 10) {
    return str.substring(0, 10) + '……';
  } else {
    return str;
  }
}
export const WordShow = ({onClose, onView, fileName}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/word.png')}
        style={styles.image}
      />
      <TouchableOpacity onPress={onView} style={{marginTop: 7}}>
        <Text style={styles.fileName}>{truncateString(fileName)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
export const ExcelShow = ({onClose, onView, fileName}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/excel.png')}
        style={styles.image}
      />
      <TouchableOpacity onPress={onView} style={{marginTop: 7}}>
        <Text style={styles.fileName}>{truncateString(fileName)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
export const PptShow = ({onClose}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/ppt.png')} style={styles.image} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
export const PdfShow = ({onClose, onView, fileName}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/pdf.png')} style={styles.image} />
      <TouchableOpacity onPress={onView} style={{marginTop: 7}}>
        <Text style={styles.fileName}>{truncateString(fileName)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative', // 为了绝对定位关闭按钮
    width: 120, // 图片宽度
    height: 120, // 图片高度（和宽度相同，形成正方形）
    margin: 15,
    justifyContent: 'center', // 内部文字居中
    alignItems: 'center', // 内部文字居中
    backgroundColor: '#008080',
    borderRadius: 10,
  },
  image: {
    width: '40%', // 图片填充容器
    height: '40%', // 图片填充容器
  },
  closeButton: {
    position: 'absolute', // 绝对定位
    top: -10, // 向上偏移
    right: -10, // 向右偏移
    backgroundColor: '#666666', // 关闭按钮背景颜色
    width: 25, // 宽度
    height: 25, // 高度
    borderRadius: 12.5, // 设置为宽/高的一半，形成圆形
    justifyContent: 'center', // 内部文字居中
    alignItems: 'center', // 内部文字居中
  },
  closeButtonText: {
    color: 'white', // 文字颜色
    fontSize: 12, // 文字大小
  },
  fileName: {
    fontSize: 10,
    color: 'lightblue',
    textDecorationLine: 'underline',
  },
});
