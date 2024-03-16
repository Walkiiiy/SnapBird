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
  {
    id: '1',
    label: '通用文字识别',
    intro: '对图像中的文字进行快速、精准的检测和识别，返回可一键复制的文本内容',
  },
  {
    id: '2',
    label: '图像切边增强',
    intro:
      '智能判断照片中主体文档的边缘进行切边，同时增强图像突出文字，返回切边后的图像。',
  },
  {
    id: '3',
    label: '通用表格识别',
    intro:
      '识别图片中的表格内容，包括有线表格、无线表格、合并单元格表格，返回excel表格',
  },
  {
    id: '4',
    label: '图像水印去除',
    intro:
      '支持对图片中日期、logo、文字等形式的水印进行自动擦除,返回处理后的图片。',
  },
  {
    id: '5',
    label: '通用票据识别',
    intro:
      '可对通用机打发票、通用定额发票、公路客运发票、火车票等各类发票进行识别，返回识别字段文本信息。',
  },
  {
    id: '6',
    label: '营业执照识别',
    intro:
      '快速精准结构化识别企业营业执照（各类版式，支持新旧版本）中的注册号、公司名称、地址、主体类型、法定代表人等14个关键有效字段',
  },
  {
    id: '7',
    label: '身份证识别',
    intro:
      '对身份证正反面的全部字段进行结构化识别，包括姓名、性别、民族、出生日期、地址、身份证号、有效期限、签发机关',
  },
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
const otherFunctions = [{id: '1', label: '文件重命名', intro: '任意格式'}];
function CustomModal({handleSelect, visible, onClose}) {
  // 渲染单个功能按钮
  const renderFunctionButton = (option, index) => (
    <TouchableOpacity
      key={option.id}
      style={styles.button}
      onPress={() => {
        handleSelect(option.label); // 确保handleSelect函数在组件中被定义
      }}>
      <Text
        style={[styles.buttonText, {color: 'white', fontSize: 15, margin: 5}]}>
        {option.label}
      </Text>
      <Text
        style={[
          styles.buttonText,
          {color: '#faf0e6', fontSize: 11, marginLeft: 20, marginRight: 20},
        ]}>
        {option.intro}
      </Text>
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
            <Text style={styles.modalContent}>其他</Text>
            <View style={styles.functionContainer}>
              {otherFunctions.map(renderFunctionButton)}
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
    fontSize: 19,
  },
  closeButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    top: 7,
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
    width: '100%',
    height: 100,
    margin: 5,
    marginTop: 17,
    backgroundColor: '#517a7b',
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
