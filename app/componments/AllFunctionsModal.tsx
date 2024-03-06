import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const imageFunctions = [
  {id: '1', label: '通用文字识别', intro: '图像->文本'},
  {id: '2', label: '图像切边增强', intro: '图像->图像'},
  {id: '3', label: '通用表格识别', intro: '图像->excel'},
  {id: '4', label: '图像水印去除', intro: '图像->图像'},
];
const typeTransformFunctions = [
  {id: '1', label: 'word转图片', intro: 'word->图像'},
  {id: '2', label: '图片转pdf', intro: '图像->pdf'},
  {id: '3', label: 'excel转pdf', intro: 'excel->pdf'},
  {id: '4', label: 'word转pdf', intro: 'word->pdf'},
  {id: '5', label: 'pdf转图片', intro: 'pdf->图像'},
  {id: '6', label: 'pdf转ppt', intro: 'pdf->ppt'},
  {id: '7', label: 'pdf转excel', intro: 'pdf->excel'},
  {id: '8', label: 'pdf转word', intro: 'pdf->word'},
  {id: '9', label: '图片转word', intro: '图像->word'},
];
function CustomModal({handleSelect, visible, onClose}) {
  // 渲染单个功能按钮
  const renderFunctionButton = (option, index) => (
    <TouchableOpacity
      key={option.id}
      style={styles.button}
      onPress={() => {
        handleSelect(option.label); // 确保handleSelect函数在组件中被定义
      }}>
      <Text style={styles.buttonText}>{option.label}</Text>
      <Text style={[styles.buttonText, {color: 'grey'}]}>{option.intro}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalContent}>图像处理</Text>
            <View style={styles.functionContainer}>
              {imageFunctions.map(renderFunctionButton)}
            </View>

            <Text style={styles.modalContent}>格式转换</Text>
            <View style={styles.functionContainer}>
              {typeTransformFunctions.map(renderFunctionButton)}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#222222',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    flexDirection: 'row',
  },
  button: {
    width: '30%',
    height: 95,
    margin: 5,
    backgroundColor: '#444444',
    borderRadius: 20,
    marginVertical: 5, // 调整垂直边距，确保纵向间隔
    paddingVertical: 8,
    paddingHorizontal: 5, // 调整水平内边距，以适应文本
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
  functionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // 每行三个按钮，均匀分布
  },
});

export default CustomModal;
