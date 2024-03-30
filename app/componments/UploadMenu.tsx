import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
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
  const optionIcon = [
    require('../assets/icons/album.png'),
    require('../assets/icons/camera.png'),
    require('../assets/icons/wechat.png'),
    require('../assets/icons/folder.png'),
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
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={styles.button}
          onPress={() => handleSelect(option.id)}>
          <Text style={styles.buttonText}>{option.label}</Text>
          <Image
            source={optionIcon[index]}
            style={{width: 25, height: 25, margin: 10}}
          />
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
    backgroundColor: '#2f4f4f',
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
    fontSize: 18,
    color: 'white',
  },
});

export default ScrollableButtonSelector;
