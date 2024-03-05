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
import axios from 'axios';
import RNFS from 'react-native-fs';

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
} from '../interfaces/main';

export default function HomeScreen({navigation}) {
  // 动态变量
  const {user, setUser} = React.useContext(UserContext);
  const {fileOutcome, setFileOutcome} = React.useContext(FileOutcomeContext);
  const {fileUpload, setFileUpload} = React.useContext(FileUploadContext);
  const {fileType, setFileType} = React.useContext(FileTypeContext);

  const [text, setText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(true);
  const [allFunctionsVisible, setAllFunctionsVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [picVisible, setPicVisible] = React.useState(false);
  const [uploadMenuVisible, setUploadMenuVisible] = React.useState(false);
  const [keyboardShown, setKeyboardShown] = React.useState(false);
  const [title1, setTitle1] = React.useState('快速开始');
  const [title2, setTitle2] = React.useState('ShortCut');
  const [showActivativeIndicator, setShowActivativeIndicator] =
    React.useState(false);
  const [showTextBox, setShowTextBox] = React.useState(false);
  const [textBoxvalue, setTextBoxValue] = React.useState('');
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
      }
      return () => {
        console.log('home页面失去焦点');
      };
    }, []),
  );
  // 自定函数
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
      default:
        return 'Unknown File Type';
    }
  }

  function onChooseSideMenu(id) {
    if (id == 1) {
      navigation.navigate('Chat', {
        firstMessage: '请帮我……',
        fileUploadPass: fileUpload,
      });
    }
  }
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //处理shortcut选择,转ai界面
  async function shortCut(message: string) {
    console.log(`Selected option : ${message}`);
    console.log(`Selected option : ${message}`);
    setTitle2('Snap！！');
    await wait(300);
    navigation.navigate('Chat', {
      firstMessage: message,
      fileUploadPass: fileUpload,
    });
  }
  //处理快速开始选择
  async function quickStart(option: string) {
    console.log(`Selected option: ${option}`);
    setAllFunctionsVisible(false);
    setShowTextBox(false);
    if (fileUpload.length == 0) {
      setTitle1('请先上传图片或文件！！');
      await wait(1500);
      setTitle1('快速开始');
    } else {
      setShowActivativeIndicator(true);
      if (option == '通用文字识别') {
        const outcome = await ocrInterface();
        if (outcome == 'server returned a bad signal!') {
          console.log('server returned a bad signal!');
        } else {
          for (let i in outcome) {
            setTextBoxValue(outcome[0].texts.join('\n'));
            setShowTextBox(true);
          }
        }
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
    setFileUpload(currentFileUploads => {
      const tempArray = [...currentFileUploads];
      if (index >= 0 && index < tempArray.length) {
        tempArray.splice(index, 1);
        if (tempArray.length === 0) {
          setPicVisible(false);
          setTextBoxValue(false);
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
    launchCamera(options, response => {
      console.log(response);
      if (response.assets && response.assets.length > 0) {
        setFileUpload(response.assets[0].uri);
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

  //home视图
  return (
    <View style={styles.container}>
      {/* 弹出组件 */}
      <Notice
        title="Hello👋👋"
        content="这是一个demo app，为了展示项目的概念设计，暂时没有后端功能实现。"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <AllFunctionsModal
        handleSelect={quickStart}
        visible={allFunctionsVisible}
        onClose={() => setAllFunctionsVisible(false)}
      />
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onChoose={onChooseSideMenu}
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
                  <FileShow.PdfShow key={uri} onClose={() => delfile(index)} />
                );
              } else if (fileType[index] == 'Word Document') {
                return (
                  <FileShow.WordShow key={uri} onClose={() => delfile(index)} />
                );
              } else if (fileType[index] == 'Excel Spreadsheet') {
                return (
                  <FileShow.ExcelShow
                    key={uri}
                    onClose={() => delfile(index)}
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
                  />
                );
              } else {
                console.log('unknown type of file!');
              }
            })}
          </ScrollView>
          {showTextBox ? (
            <TextInput
              style={styles.textBox}
              editable={false}
              value={textBoxvalue}
              keyboardType="default" // 键盘类型
              secureTextEntry={false} // 是否隐藏输入内容，常用于密码输入
              multiline={true}
            />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {fileOutcome.map((outcome, index) => {
                console.log(outcome.file_name);
                if (getFileType(outcome.file_name) == 'PDF Document') {
                  return (
                    <FileShow.PdfShow
                      key={outcome.file_name}
                      onClose={() => deloutcomefile(index)}
                    />
                  );
                } else if (getFileType(outcome.file_name) == 'Word Document') {
                  return (
                    <FileShow.WordShow
                      key={outcome.file_name}
                      onClose={() => deloutcomefile(index)}
                    />
                  );
                } else if (
                  getFileType(outcome.file_name) == 'Excel Spreadsheet'
                ) {
                  return (
                    <FileShow.ExcelShow
                      key={outcome.file_name}
                      onClose={() => deloutcomefile(index)}
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
                    />
                    // <Image
                    //   source={{uri: `data:image/jpeg;base64,${outcome.res}`}}
                    //   style={styles.image}
                    // />
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
          <Functions handleSelect={quickStart} />
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
    backgroundColor: '#333333', // 设置颜色以便于区分
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
    width: 100, // 图像宽度
    height: 100, // 图像高度
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
    backgroundColor: '#444444',
    borderRadius: 15,
    borderColor: '#999999',
    color: 'white',
  },
  functionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
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
  textBox: {
    flex: 13,
    height: 40,
    margin: 7,
    borderWidth: 2,
    backgroundColor: '#444444',
    borderRadius: 15,
    borderColor: '#999999',
    color: 'white',
  },
});
