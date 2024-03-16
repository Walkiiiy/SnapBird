import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';

type ButtonOption = {
  id: string;
  label: string;
};
const options = [
  {
    id: '1',
    label: '通用文字识别',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/text-gray.png'),
  },
  {
    id: '2',
    label: '图像切边增强',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/pic-gray.png'),
  },
  {
    id: '3',
    label: '通用表格识别',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/excel-gray.png'),
  },
  {
    id: '4',
    label: '图像水印去除',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/pic-gray.png'),
  },
  {
    id: '5',
    label: 'word转图片',
    introImage1: require('../assets/icons/word-gray.png'),
    introImage2: require('../assets/icons/pic-gray.png'),
  },
  {
    id: '6',
    label: '图片转pdf',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/pdf-ppt-gray.png'),
  },
  {
    id: '7',
    label: 'excel转pdf',
    introImage1: require('../assets/icons/excel-gray.png'),
    introImage2: require('../assets/icons/pdf-ppt-gray.png'),
  },
  {
    id: '8',
    label: 'word转pdf',
    introImage1: require('../assets/icons/word-gray.png'),
    introImage2: require('../assets/icons/pdf-ppt-gray.png'),
  },
  {
    id: '9',
    label: 'pdf转图片',
    introImage1: require('../assets/icons/pdf-ppt-gray.png'),
    introImage2: require('../assets/icons/pic-gray.png'),
  },
  {
    id: '10',
    label: 'pdf转ppt',
    introImage1: require('../assets/icons/pdf-ppt-gray.png'),
    introImage2: require('../assets/icons/pdf-ppt-gray.png'),
  },
  {
    id: '11',
    label: 'pdf转excel',
    introImage1: require('../assets/icons/pdf-ppt-gray.png'),
    introImage2: require('../assets/icons/excel-gray.png'),
  },
  {
    id: '12',
    label: 'pdf转word',
    introImage1: require('../assets/icons/pdf-ppt-gray.png'),
    introImage2: require('../assets/icons/word-gray.png'),
  },
  {
    id: '13',
    label: '图片转word',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/word-gray.png'),
  },
  {
    id: '14',
    label: '图像信息提取',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/text-gray.png'),
  },
  {
    id: '15',
    label: '通用票据识别',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/text-gray.png'),
  },
  {
    id: '16',
    label: '营业执照识别',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/text-gray.png'),
  },
  {
    id: '17',
    label: '身份证识别',
    introImage1: require('../assets/icons/pic-gray.png'),
    introImage2: require('../assets/icons/text-gray.png'),
  },
];

export default function ScrollableButtonSelector({handleSelect}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.button}
          onPress={() => handleSelect(option.label)}>
          <Text style={styles.buttonText}>{option.label}</Text>
          <View style={styles.introArea}>
            <Image
              source={option.introImage1} // 图片路径
              style={styles.introImage}
            />
            <Image
              source={require('../assets/icons/arrow-right-gray.png')} // 图片路径
              style={{width: 12, height: 12}}
            />
            <Image
              source={option.introImage2} // 图片路径
              style={styles.introImage}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
  },
  button: {
    width: 150,
    height: 100,
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#333333',
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
    margin: 2,
  },
  introArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
  },
  introImage: {width: 20, height: 20, margin: 3, marginLeft: 7, marginRight: 7},
});
