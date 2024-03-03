import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

type ButtonOption = {
  id: string;
  label: string;
};
const options = [
  {id: '1', label: '通用文字识别', intro: '图像->文本'},
  {id: '2', label: '图像切边增强', intro: '图像->图像'},
  {id: '3', label: '通用表格识别', intro: '图像->excel'},
  {id: '4', label: '图像水印去除', intro: '图像->图像'},
  {id: '5', label: 'word转图片', intro: 'word->图像'},
  {id: '6', label: '图片转pdf', intro: '图像->pdf'},
  {id: '7', label: 'excel转pdf', intro: 'excel->pdf'},
  {id: '8', label: 'word转pdf', intro: 'word->pdf'},
  {id: '9', label: 'pdf转图片', intro: 'pdf->图像'},
  {id: '10', label: 'pdf转ppt', intro: 'pdf->ppt'},
  {id: '11', label: 'pdf转excel', intro: 'pdf->excel'},
  {id: '12', label: 'pdf转word', intro: 'pdf->word'},
  {id: '13', label: '图片转word', intro: '图像->word'},

  // ... 更多选项
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
          <Text style={[styles.buttonText, {color: 'grey'}]}>
            {option.intro}
          </Text>
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
    margin: 2,
  },
});
