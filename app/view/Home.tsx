import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {useFocusEffect} from '@react-navigation/native';

import ShortCut from '../componments/ShortCut';
import UploadButton from '../componments/UploadButton';
import Functions from '../componments/Functions';
import Notice from '../componments/Notice';
import SideMenu from '../componments/SideMenu';
import SendMessageButton from '../componments/SendMessageButton';
import PicShow from '../componments/PicShow';
import UploadMenu from '../componments/UploadMenu';
import * as FileShow from '../componments/FileShow';
import ShowMoreButton from '../componments/ShowMoreButton';
import AllFunctionsModal from '../componments/AllFunctionsModal';
import TextBox from '../componments/TextBox';
import Bubble from '../componments/Bubble';
import QueryModal from '../componments/QueryModal';

import {
  UserContext,
  FileOutcomeContext,
  FileUploadContext,
  FileTypeContext,
} from '../Context';

import {
  ocrInterface,
  uploadFile,
  delFileInterface,
  tableInterface,
  cropEnhanceInterface,
  waterMarkRemove,
  wordToImage,
  imageToPdf,
  excelToPdf,
  wordToPdf,
  pdfToImg,
  pdfToPpt,
  pdfToExcel,
  pdfToWord,
  imgToWord,
  billRecognizeInterface,
  businessLicense,
  idCard,
  typeQuery,
  WaterMarker,
  bankCard,
  driverLicense,
} from '../interfaces/main';

export default function HomeScreen({navigation}) {
  const defaultOptions = [
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
    {
      id: '18',
      label: '图像添加水印',
      introImage1: require('../assets/icons/pic-gray.png'),
      introImage2: require('../assets/icons/pic-gray.png'),
    },
    {
      id: '19',
      label: '银行卡识别',
      introImage1: require('../assets/icons/pic-gray.png'),
      introImage2: require('../assets/icons/text-gray.png'),
    },
    {
      id: '20',
      label: '驾驶证识别',
      introImage1: require('../assets/icons/pic-gray.png'),
      introImage2: require('../assets/icons/text-gray.png'),
    },
  ];
  // 动态变量
  const {user, setUser} = React.useContext(UserContext);
  const {fileOutcome, setFileOutcome} = React.useContext(FileOutcomeContext);
  const {fileUpload, setFileUpload} = React.useContext(FileUploadContext);
  const {fileType, setFileType} = React.useContext(FileTypeContext);

  const [options, setOptions] = React.useState([
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
    {
      id: '18',
      label: '图像添加水印',
      introImage1: require('../assets/icons/pic-gray.png'),
      introImage2: require('../assets/icons/pic-gray.png'),
    },
    {
      id: '19',
      label: '银行卡识别',
      introImage1: require('../assets/icons/pic-gray.png'),
      introImage2: require('../assets/icons/text-gray.png'),
    },
    {
      id: '20',
      label: '驾驶证识别',
      introImage1: require('../assets/icons/pic-gray.png'),
      introImage2: require('../assets/icons/text-gray.png'),
    },
  ]);
  const [text, setText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(true);
  const [allFunctionsVisible, setAllFunctionsVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [picVisible, setPicVisible] = React.useState(false);
  const [uploadMenuVisible, setUploadMenuVisible] = React.useState(false);
  const [keyboardShown, setKeyboardShown] = React.useState(false);
  const [title1, setTitle1] = React.useState('快速开始');
  const [title2, setTitle2] = React.useState('ShortCut');
  const [shortCutIntroVisible, setShortCutIntroVisible] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [prompt, setPrompt] = React.useState('');
  const [showQueryModal, setShowQueryModal] = React.useState(false);
  const [showActivativeIndicator, setShowActivativeIndicator] =
    React.useState(false);
  //键盘事件监听
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('键盘弹出');
        setKeyboardShown(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('键盘收起');
        setKeyboardShown(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  //页面焦点监听
  useFocusEffect(
    React.useCallback(() => {
      console.log('home获得焦点');
      if (fileUpload.length == 0) {
        setPicVisible(false);
      } else {
        setPicVisible(true);
      }
      return () => {
        console.log('home页面失去焦点');
      };
    }, []),
  );
  // 自定函数
  function moveOptionEleToHead(elements) {
    setOptions(options => {
      const newoptions = [];
      for (let i in elements) {
        newoptions.push(defaultOptions[elements[i]]);
      }
      return newoptions;
    });
  }
  function getFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'PDF Document';
      case 'doc':
      case 'docx':
        return 'Word Document';
      case 'xls':
      case 'xlsx':
        return 'Excel Spreadsheet';
      case 'ppt':
      case 'pptx':
        return 'PowerPoint Presentation';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'svg':
        return 'Image';
      case 'string':
        return 'string';
      default:
        return 'Unknown File Type';
    }
  }

  function onChooseSideMenu(id) {
    if (id == 1) {
      navigation.navigate('Chat', {
        firstMessage: '你能做什么？',
        fileUploadPass: fileUpload,
      });
    } else if (id == 0) {
      navigation.navigate('Me');
    }
  }
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //处理shortcut选择,转ai界面
  async function shortCut(message: string) {
    setShowPrompt(false);
    console.log(`Selected option : ${message}`);
    console.log(`Selected option : ${message}`);
    if (fileUpload.length == 0) {
      setTitle1('请先上传图片或文件！！');
      setUploadMenuVisible(!uploadMenuVisible);
      await wait(1500);
      setTitle1('快速开始');
    } else {
      setTitle2('Snap！！');
      await wait(300);
      navigation.navigate('Chat', {
        firstMessage: message,
        fileUploadPass: fileUpload,
      });
    }
  }
  //处理快速开始选择
  async function quickStart(option: string) {
    setShowPrompt(false);
    console.log(`Selected option: ${option}`);
    setAllFunctionsVisible(false);
    if (fileUpload.length == 0) {
      setTitle1('请先上传图片或文件！！');
      setUploadMenuVisible(!uploadMenuVisible);
      await wait(1500);
      setTitle1('快速开始');
    } else {
      setShowActivativeIndicator(true);
      if (option == '通用文字识别') {
        const res = await ocrInterface();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '通用表格识别') {
        const res = await tableInterface();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '图像切边增强') {
        const res = await cropEnhanceInterface();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '图像水印去除') {
        const res = await waterMarkRemove();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == 'word转图片') {
        const res = await wordToImage();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '图片转pdf') {
        const res = await imageToPdf();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == 'excel转pdf') {
        const res = await excelToPdf();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == 'word转pdf') {
        const res = await wordToPdf();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == 'pdf转图片') {
        const res = await pdfToImg();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == 'pdf转ppt') {
        const res = await pdfToPpt();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == 'pdf转excel') {
        const res = await pdfToExcel();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == 'pdf转word') {
        const res = await pdfToWord();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '图片转word') {
        const res = await imgToWord();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '图像文字信息提取') {
        setTitle1('请使用ai助手调用此功能');
        await wait(3000);
        setTitle1('快速开始');
      } else if (option == '通用票据识别') {
        const res = await billRecognizeInterface();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '营业执照识别') {
        const res = await businessLicense();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '身份证识别') {
        const res = await idCard();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '图像添加水印') {
        setShowQueryModal(true);
      } else if (option == '银行卡识别') {
        const res = await bankCard();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else if (option == '驾驶证识别') {
        const res = await driverLicense();
        setFileOutcome(fileOutcome => fileOutcome.concat(res));
      } else {
        console.log('unknown function');
      }
      setShowActivativeIndicator(false);
    }
  }
  //发送消息，转ai界面
  function sendMessage() {
    console.log('sendMessage');
    Keyboard.dismiss();
    if (text != '') {
      navigation.navigate('Chat', {
        firstMessage: text,
        fileUploadPass: fileUpload,
      });
    }
    setText('');
  }
  //从图片uri列表和outcome列表删除元素
  function delfile(index) {
    setShowPrompt(false);
    setFileUpload(currentFileUploads => {
      const tempArray = [...currentFileUploads];
      if (index >= 0 && index < tempArray.length) {
        tempArray.splice(index, 1);
        if (tempArray.length === 0) {
          setPicVisible(false);
          setOptions(defaultOptions);
        }
      }
      return tempArray;
    });

    setFileOutcome(currentFileOutcomes => {
      const tempArray = [...currentFileOutcomes];
      if (index >= 0 && index < tempArray.length) {
        tempArray.splice(index, 1);
      }
      return tempArray;
    });

    setFileType(currentFileTypes => {
      const tempArray = [...currentFileTypes];
      if (index >= 0 && index < tempArray.length) {
        tempArray.splice(index, 1);
      }
      return tempArray;
    });
    delFileInterface(index); // 假设这是向服务器发送删除请求的函数
  }
  //仅从outcome列表删除元素
  function deloutcomefile(index) {
    setFileOutcome(currentFileOutcomes => {
      const tempArray = [...currentFileOutcomes];
      if (index >= 0 && index < tempArray.length) {
        tempArray.splice(index, 1);
      }
      return tempArray;
    });
  }

  async function promptMessageSet(type) {
    if (type == 'Image') {
      let typeRes = await typeQuery();
      typeRes = typeRes[0].res[0];
      if (typeRes == 'idCard') {
        const content =
          '你似乎上传了身份证照片，你可以在"快速开始"中试试：\n"身份证识别"\n"图片转pdf"\n"图像切边增强"\n"图像水印去除"\n"图像添加水印"\n"图像水印去除"\n或者在ai助手中提出更复杂的功能需求';
        setPrompt(content);
        moveOptionEleToHead([16, 17, 13, 12, 5, 3, 1]);
      } else if (typeRes == 'bill') {
        const content =
          '你似乎上传了发票，你可以在"快速开始"中试试：\n"通用票据识别"\n"图片转pdf"\n"图像切边增强"\n"图像水印去除"\n"图像水印去除"\n"图像添加水印"\n或者在ai助手中提出更复杂的功能需求';
        setPrompt(content);
        moveOptionEleToHead([14, 17, 13, 12, 5, 3, 1]);
      } else if (typeRes == 'driverLicense') {
        const content =
          '你似乎上传了驾驶证，你可以在"快速开始"中试试：\n"驾驶证识别"\n"图片转pdf"\n"图像切边增强"\n"图像水印去除"\n"图像水印去除"\n"图像添加水印"\n或者在ai助手中提出更复杂的功能需求';
        setPrompt(content);
        moveOptionEleToHead([19, 17, 13, 12, 5, 3, 1]);
      } else if (typeRes == 'train tickt') {
        const content =
          '你似乎上传了火车票，你可以在"快速开始"中试试：\n"通用票据识别"\n"图片转pdf"\n"图像切边增强"\n"图像水印去除"\n"图像水印去除"\n"图像添加水印"\n或者在ai助手中提出更复杂的功能需求';
        setPrompt(content);
        moveOptionEleToHead([14, 17, 13, 12, 5, 3, 1]);
      } else if (typeRes == 'bankCard') {
        const content =
          '你似乎上传了银行卡，你可以在"快速开始"中试试：\n"银行卡识别"\n"图片转pdf"\n"图像切边增强"\n"图像水印去除"\n"图像水印去除"\n"图像添加水印"\n或者在ai助手中提出更复杂的功能需求';
        setPrompt(content);
        moveOptionEleToHead([18, 17, 13, 12, 5, 3, 1]);
      } else if (typeRes == 'businessLicense') {
        const content =
          '你似乎上传了营业执照，你可以在"快速开始"中试试：\n"营业执照识别"\n"图片转pdf"\n"图像切边增强"\n"图像水印去除"\n"图像水印去除"\n"图像添加水印"\n或者在ai助手中提出更复杂的功能需求';
        setPrompt(content);
        moveOptionEleToHead([15, 17, 13, 12, 5, 3, 1]);
      } else if (typeRes == 'document') {
        const content =
          '你似乎上传了文档照片，你可以在"快速开始"中试试：\n"图片转pdf"\n"图像切边增强"\n"图像水印去除"\n"图像水印去除"\n"图像添加水印"\n或者在ai助手中提出更复杂的功能需求';
        setPrompt(content);
      } else if (typeRes == 'error') {
        const content = '似乎无法判别您上传的图片内容哦';
        setPrompt(content);
      }
    } else if (type == 'Excel Spreadsheet') {
      const content =
        '你似乎上传了excel文件，你可以在"快速开始"中试试：\n"excel转pdf"\n或者在ai助手中提出更复杂的功能需求';
      setPrompt(content);
    } else if (type == 'Word Document') {
      const content =
        '你似乎上传了word文件，你可以在"快速开始"中试试：\n"word转图片"\n"word转pdf"\n或者在ai助手中提出更复杂的功能需求';
      setPrompt(content);
    } else if (type == 'PDF Document') {
      const content =
        '你似乎上传了pdf文件，你可以在"快速开始"中试试：\n"pdf转图片"\n"pdf转ppt"\n"pdf转excel"\n"pdf转word"\n或者在ai助手中提出更复杂的功能需求';
      setPrompt(content);
    } else if (type == 'PowerPoint Presentation') {
      const content = '我们目前不支持对ppt文件的直接操作哦。';
      setPrompt(content);
    }
    //添加其他情况
    setShowPrompt(true);
  }

  function uploadImg() {
    const options = {
      noData: true,
      selectionLimit: 0, // 允许用户选择任意数量的图片
    };
    launchImageLibrary(options, async response => {
      if (!response.didCancel) {
        setShowActivativeIndicator(true);
        for (const asset of response.assets) {
          await uploadFile(asset.uri, asset.fileName);
          setFileType(fileType =>
            fileType.concat([getFileType(asset.fileName)]),
          );
          setFileUpload(fileUpload => fileUpload.concat([asset.uri]));
        }
        promptMessageSet('Image');
        console.log(fileUpload);
        setShowActivativeIndicator(false);
        setPicVisible(true);
      }
    });
  }

  function takePhoto() {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };
    launchCamera(options, async response => {
      console.log(response);
      if (response.assets && response.assets.length > 0) {
        if (!response.didCancel) {
          setShowActivativeIndicator(true);
          for (const asset of response.assets) {
            await uploadFile(asset.uri, asset.fileName);
            setFileType(fileType =>
              fileType.concat([getFileType(asset.fileName)]),
            );
            setFileUpload(fileUpload => fileUpload.concat([asset.uri]));
          }
          promptMessageSet('Image');
          console.log(fileUpload);
          setShowActivativeIndicator(false);
          setPicVisible(true);
        }
      }
    });
  }

  async function fileSelector() {
    try {
      // 启动文档选择器，并设置类型为 PDF
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.csv,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.images,
        ],
        allowMultiSelection: true,
      });

      // res.uri 是选中文件的 URI
      setShowActivativeIndicator(true);
      for (let i in res) {
        await uploadFile(res[i].uri, res[i].name);
        setFileType(fileType => fileType.concat([getFileType(res[i].name)]));
        setFileUpload(fileUpload => fileUpload.concat([res[i].uri]));
      }
      promptMessageSet(getFileType(res[0].name));
      setShowActivativeIndicator(false);
      setPicVisible(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // 用户取消了选择
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  }
  function goFileView(res, name) {
    navigation.navigate('FileView', {
      base64String: res,
      fileName: name,
    });
  }
  function goPicView(picuri) {
    navigation.navigate('PicView', {
      uri: picuri,
    });
  }
  async function waterMarkerFunc(text: string) {
    setShowQueryModal(false);
    setShowActivativeIndicator(true);
    const res = await WaterMarker(text);
    setFileOutcome(fileOutcome => fileOutcome.concat(res));
    setShowActivativeIndicator(false);
  }
  //home视图
  return (
    <View style={styles.container}>
      {/* 弹出组件 */}
      <Notice
        title="Hello👋👋"
        content="这是一个demo app，为了展示项目的概念设计，只有部分后端功能实现。"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <Notice
        title="关于'ShortCut捷径'"
        content="ShortCut捷径能记录你对SnapBird的复杂指令，当你需要再次调用相同功能时，不用再向AI助手描述你的需求，上传图片后直接点击就能得到结果。"
        visible={shortCutIntroVisible}
        onClose={() => setShortCutIntroVisible(false)}
      />
      <AllFunctionsModal
        handleSelect={quickStart}
        visible={allFunctionsVisible}
        onClose={() => setAllFunctionsVisible(false)}
      />
      <QueryModal
        prompt="添加的水印："
        visible={showQueryModal}
        onConfirm={waterMarkerFunc}
        onCancel={() => {
          setShowQueryModal(false);
        }}
      />
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onChoose={onChooseSideMenu}
        userName={user}
      />

      {/* 顶部标题栏，菜单按钮 */}
      <View style={styles.topBar}>
        <Text style={styles.title}>SnapBird</Text>
        <TouchableOpacity
          onPress={() => {
            setMenuVisible(true);
            console.log('showMenu');
          }}
          style={styles.humburger}>
          <Image
            source={require('../assets/icons/hamburger-button.png')} // 图片路径
            style={[styles.humburgerImage]}
          />
        </TouchableOpacity>
      </View>

      {/* icon,图片展示部分 */}
      {keyboardShown ? null : !picVisible ? (
        <View style={styles.iconArea}>
          <Image
            source={require('../assets/images/snapbird.png')}
            style={styles.roundImage}
          />
        </View>
      ) : (
        <View style={styles.picArea}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {fileUpload.map((uri, index) => {
              if (fileType[index] == 'PDF Document') {
                return (
                  <FileShow.PdfShow
                    key={uri}
                    onClose={() => delfile(index)}
                    onView={async () => {
                      setTitle1('请转换为图片后预览！');
                      await wait(3000);
                      setTitle1('快速开始');
                    }}
                    fileName={uri}
                  />
                );
              } else if (fileType[index] == 'Word Document') {
                return (
                  <FileShow.WordShow
                    key={uri}
                    onClose={() => delfile(index)}
                    onView={async () => {
                      setTitle1('转换为pdf或图片文件才能预览');
                      await wait(3000);
                      setTitle1('快速开始');
                    }}
                    fileName={uri}
                  />
                );
              } else if (fileType[index] == 'Excel Spreadsheet') {
                return (
                  <FileShow.ExcelShow
                    key={uri}
                    onClose={() => delfile(index)}
                    onView={async () => {
                      setTitle1('转换为pdf或图片文件才能预览！');
                      await wait(3000);
                      setTitle1('快速开始');
                    }}
                    fileName={uri}
                  />
                );
              } else if (fileType[index] == 'PowerPoint Presentation') {
                return (
                  <FileShow.PptShow key={uri} onClose={() => delfile(index)} />
                );
              } else if (fileType[index] == 'Image') {
                return (
                  <PicShow
                    key={uri}
                    imageUrl={uri}
                    onClose={() => delfile(index)}
                    onView={() => {
                      goPicView(uri);
                    }}
                  />
                );
              } else {
                console.log('unknown type of file!');
              }
            })}
          </ScrollView>
          {showPrompt ? (
            <ScrollView style={{maxHeight: '50%'}}>
              <Bubble text={prompt} isSender={false} />
            </ScrollView>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {fileOutcome.map((outcome, index) => {
                if (getFileType(outcome.file_name) == 'string') {
                  return (
                    <TextBox
                      key={outcome.file_name}
                      textValue={outcome.res.join('\n')}
                    />
                  );
                } else if (getFileType(outcome.file_name) == 'PDF Document') {
                  return (
                    <FileShow.PdfShow
                      key={outcome.file_name}
                      onClose={() => deloutcomefile(index)}
                      onView={() => goFileView(outcome.res, outcome.file_name)}
                      fileName={outcome.file_name}
                    />
                  );
                } else if (getFileType(outcome.file_name) == 'Word Document') {
                  return (
                    <FileShow.WordShow
                      key={outcome.file_name}
                      onClose={() => deloutcomefile(index)}
                      onView={async () => {
                        setTitle1('转换为pdf或图片文件才能预览！');
                        await wait(3000);
                        setTitle1('快速开始');
                      }}
                      fileName={outcome.file_name}
                    />
                  );
                } else if (
                  getFileType(outcome.file_name) == 'Excel Spreadsheet'
                ) {
                  return (
                    <FileShow.ExcelShow
                      key={outcome.file_name}
                      onClose={() => deloutcomefile(index)}
                      onView={async () => {
                        setTitle1('转换为pdf或图片文件才能预览！');
                        await wait(3000);
                        setTitle1('快速开始');
                      }}
                      fileName={outcome.file_name}
                    />
                  );
                } else if (
                  getFileType(outcome.file_name) == 'PowerPoint Presentation'
                ) {
                  return (
                    <FileShow.PptShow
                      key={outcome.file_name}
                      onClose={() => deloutcomefile(index)}
                    />
                  );
                } else if (getFileType(outcome.file_name) == 'Image') {
                  return (
                    <PicShow
                      key={outcome.file_name}
                      imageUrl={`data:image/jpeg;base64,${outcome.res}`}
                      onClose={() => deloutcomefile(index)}
                      onView={() => {
                        goPicView(`data:image/jpeg;base64,${outcome.res}`);
                      }}
                    />
                  );
                } else {
                  console.log('known type of file!');
                }
              })}
            </ScrollView>
          )}
          <View style={styles.activityIndicatorContainer}>
            {showActivativeIndicator ? (
              <ActivityIndicator
                style={styles.activityIndicator}
                size="small"
                color="#0084ff"
              />
            ) : null}
          </View>
        </View>
      )}

      {/* 快速开始 */}
      <View style={styles.shortCutArea}>
        <View style={styles.functionTitleArea}>
          <Text style={styles.functionTitle}>{title1}</Text>
          <ShowMoreButton
            onPress={() => {
              setAllFunctionsVisible(true);
            }}
          />
        </View>
        <View style={styles.selectionArea}>
          <Functions handleSelect={quickStart} options={options} />
        </View>
      </View>

      {/* 捷径，文件上传菜单 */}
      {uploadMenuVisible ? (
        <View style={styles.shortCutArea}>
          <View style={styles.functionTitleArea}>
            <Text style={styles.functionTitle}>选择上传方式</Text>
          </View>
          <View style={styles.selectionArea}>
            <UploadMenu
              uploadImage={uploadImg}
              takePhoto={takePhoto}
              selectFile={fileSelector}
            />
          </View>
        </View>
      ) : (
        <View style={styles.shortCutArea}>
          <View style={styles.functionTitleArea}>
            <Text style={styles.functionTitle}>{title2}</Text>
            <ShowMoreButton
              onPress={() => {
                setShortCutIntroVisible(true);
              }}
            />
          </View>
          <View style={styles.selectionArea}>
            <ShortCut handleSelect={shortCut} />
          </View>
        </View>
      )}

      {/* 输入框，图片上传，发送请求按钮 */}
      <View style={styles.inputArea}>
        <UploadButton
          onPress={() => {
            setUploadMenuVisible(!uploadMenuVisible);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="您想做什么？"
          placeholderTextColor="#999999"
          value={text}
          onChangeText={setText} // 当文本变化时，更新状态
        />
        <SendMessageButton onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222', // 设置颜色以便于区分
  },
  title: {
    color: 'white',
    fontSize: 25,
    margin: 7,
    left: 5,
  },
  topBar: {
    flex: 1.25,
  },
  iconArea: {
    flex: 7, // flex: 1 表示这部分会占据可用空间的一半
    alignItems: 'center', // 水平居中
    justifyContent: 'center', // 垂直居中
  },
  shortCutArea: {
    flex: 3.5, // flex: 1 表示这部分会占据可用空间的一半
    alignItems: 'flex-start', // 水平居中
    justifyContent: 'center', // 垂直居中
  },
  inputArea: {
    flexDirection: 'row',
    flex: 1.5, // flex: 1 表示这部分也会占据可用空间的一半
  },
  roundImage: {
    width: 95, // 图像宽度
    height: 95, // 图像高度
    borderRadius: 50, // 将 borderRadius 设置为宽度和高度的一半可以创建圆形效果
    // 如果你的图像不是正方形，请确保 width 和 height 相等，并将 borderRadius 设置为这两个值的一半
    resizeMode: 'cover', // 覆盖整个图像框
  },
  input: {
    flex: 13,
    height: 40,
    margin: 10,
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#333333',
    borderRadius: 15,
    borderColor: '#999999',
    color: 'white',
  },
  functionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    left: 15,
  },
  humburger: {
    margin: 7,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  humburgerImage: {
    width: 35, // 图片宽度
    height: 35, // 图片高度
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  picArea: {
    flex: 7, // flex: 1 表示这部分会占据可用空间的一半
  },
  selectionArea: {
    flex: 5,
  },
  functionTitleArea: {
    flex: 1,
    flexDirection: 'row',
  },
  activityIndicatorContainer: {
    flex: 1,
  },
  activityIndicator: {
    margin: 5,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textBoxContainer: {
    height: 150,
    width: 220,
    margin: 7,
    marginRight: 35,
  },
  textBox: {
    borderWidth: 2,
    backgroundColor: '#444444',
    borderRadius: 15,
    borderColor: '#999999',
    color: 'white',
  },
});
