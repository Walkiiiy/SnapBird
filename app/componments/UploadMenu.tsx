import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import UploadImgButton from './UploadButton';

const ScrollableButtonSelector = function ({
  uploadImage,
  takePhoto,
  selectFile,
}) {
  const options = [
    {id: '1', label: '相册'},
    {id: '2', label: '拍照'},
    {id: '3', label: '微信'},
    {id: '4', label: '文件'},
    // ... 更多选项
  ];

  const handleSelect = (id: string) => {
    console.log(`Selected option id: ${id}`);
    if (id == '1') {
      uploadImage();
    }
    if (id == '2') {
      takePhoto();
    }
    if (id == '4') {
      selectFile();
    }
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.button}
          onPress={() => handleSelect(option.id)}>
          <Text style={styles.buttonText}>{option.label}</Text>
          <Text style={[styles.buttonText, {color: 'grey'}]}>icon</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
  },
  button: {
    width: 87,
    height: 100,
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#444444',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ScrollableButtonSelector;
