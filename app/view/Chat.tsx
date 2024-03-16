import React, {useState, useCallback, useEffect} from 'react';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {ActivityIndicator, ScrollView} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import axios from 'axios';

import {uploadFile, delFileInterface} from '../interfaces/main';

import PicShow from '../componments/PicShow';
import * as FileShow from '../componments/FileShow';
import UploadImgButton from '../componments/UploadButton';
import UploadMenu from '../componments/UploadMenu';
import TextBox from '../componments/TextBox';

import {
  UserContext,
  FileOutcomeContext,
  FileUploadContext,
  FileTypeContext,
} from '../Context';

export default function Chat({route, navigation}) {
  //变量
  const url = 'http://10.0.2.2:5000/chat?message=';
  const {user, setUser} = React.useContext(UserContext);
  const {fileOutcome, setFileOutcome} = React.useContext(FileOutcomeContext);
  const {fileUpload, setFileUpload} = React.useContext(FileUploadContext);
  const {fileType, setFileType} = React.useContext(FileTypeContext);

  const {firstMessage} = route.params;

  const snapbird = {
    _id: 2,
    name: 'SnapBird',
    avatar: require('../assets/images/snapbird.png'),
  };
  //键盘事件监听
  useEffect(() => {
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
  const [keyboardShown, setKeyboardShown] = React.useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showActivativeIndicator, setShowActivativeIndicator] = useState(false);
  const [picVisible, setPicVisible] = useState(false);
  //预处理
  useEffect(() => {
    const firstChat = [
      {
        _id: 2,
        text: firstMessage,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      },
    ];
    onSend(firstChat);
    if (fileUpload.length != 0) {
      setPicVisible(true);
    }
  }, []);
  const chat = async message => {
    const chatUrl = url + message;
    try {
      // 发送GET请求到指定的URL
      const response = await axios.get(chatUrl);
      // 打印响应数据
      console.log(response.data.response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return 'error';
  };
  const onSend = useCallback(async (messages = []) => {
    setShowActivativeIndicator(true);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const response = await chat(messages[0].text); //返回值有response和results属性
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {
          _id: Date(),
          text: response.response,
          createdAt: new Date(),
          user: snapbird,
        },
      ]),
    );
    setFileOutcome(fileOutcome => fileOutcome.concat(response.results));
    setShowActivativeIndicator(false);
  }, []);

  function delfile(index) {
    setFileUpload(currentFileUploads => {
      const tempArray = [...currentFileUploads];
      if (index >= 0 && index < tempArray.length) {
        tempArray.splice(index, 1);
        if (tempArray.length === 0) {
          setPicVisible(false);
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
    setShowUploadMenu(false);
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
    setShowUploadMenu(false);
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
    setShowUploadMenu(false);
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
  return (
    <View style={styles.container}>
      {/* 顶部空白条 */}
      <View style={styles.topBar}></View>
      {/* 图片icon，图片展示，加载指示器 */}

      {keyboardShown ? null : (
        <View style={styles.picArea}>
          <View style={styles.picShowArea}>
            {showUploadMenu ? (
              <View style={{top: 40}}>
                <UploadMenu
                  uploadImage={uploadImg}
                  takePhoto={takePhoto}
                  selectFile={fileSelector}
                />
              </View>
            ) : !picVisible ? (
              <View style={styles.imageIconArea}>
                <Image
                  source={require('../assets/icons/pic.png')}
                  style={{height: 50, width: 50}}></Image>
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
                          onView={() => {}}
                          fileName={uri}
                        />
                      );
                    } else if (fileType[index] == 'Word Document') {
                      return (
                        <FileShow.WordShow
                          key={uri}
                          onClose={() => delfile(index)}
                          onView={() => {}}
                          fileName={uri}
                        />
                      );
                    } else if (fileType[index] == 'Excel Spreadsheet') {
                      return (
                        <FileShow.ExcelShow
                          key={uri}
                          onClose={() => delfile(index)}
                          onView={() => {}}
                          fileName={uri}
                        />
                      );
                    } else if (fileType[index] == 'PowerPoint Presentation') {
                      return (
                        <FileShow.PptShow
                          key={uri}
                          onClose={() => delfile(index)}
                        />
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {fileOutcome.map((outcome, index) => {
                    console.log(outcome.file_name);
                    if (getFileType(outcome.file_name) == 'string') {
                      return (
                        <TextBox
                          key={outcome.file_name}
                          textValue={outcome.res.join('\n')}
                        />
                      );
                    } else if (
                      getFileType(outcome.file_name) == 'PDF Document'
                    ) {
                      return (
                        <FileShow.PdfShow
                          key={outcome.file_name}
                          onClose={() => deloutcomefile(index)}
                          onView={() =>
                            goFileView(outcome.res, outcome.file_name)
                          }
                          fileName={outcome.file_name}
                        />
                      );
                    } else if (
                      getFileType(outcome.file_name) == 'Word Document'
                    ) {
                      return (
                        <FileShow.WordShow
                          key={outcome.file_name}
                          onClose={() => deloutcomefile(index)}
                          onView={() => {}}
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
                          onView={() => {}}
                          fileName={outcome.file_name}
                        />
                      );
                    } else if (
                      getFileType(outcome.file_name) ==
                      'PowerPoint Presentation'
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
            <View style={styles.uploadButtonContainer}>
              <UploadImgButton
                onPress={() => {
                  setShowUploadMenu(!showUploadMenu);
                }}></UploadImgButton>
            </View>
          </View>
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
      {/* 聊天组件 */}
      <View style={styles.chatArea}>
        <GiftedChat
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: '#0084ff',
                  },
                  left: {
                    backgroundColor: '#e6e6e6',
                  },
                }}
                textStyle={{
                  right: {
                    color: 'white',
                  },
                  left: {
                    color: '#000',
                  },
                }}
              />
            );
          }}
          renderInputToolbar={props => (
            <InputToolbar {...props} containerStyle={styles.input} />
          )}
          renderComposer={props => (
            <Composer {...props} textInputStyle={styles.inputText} />
          )}
          messages={messages}
          onSend={messages => {
            onSend(messages);
            Keyboard.dismiss();
          }}
          user={{
            _id: 1,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  activityIndicatorContainer: {
    flex: 0.6,
  },
  activityIndicator: {
    margin: 5,
  },
  topBar: {
    flex: 0.5,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  picArea: {
    paddingTop: 9,
    flex: 9,
    position: 'relative',
  },
  chatArea: {
    flex: 8,
  },
  input: {
    height: 47,
    borderColor: '#999999',
    backgroundColor: '#444444',
  },
  inputText: {
    color: 'white',
  },
  picShowArea: {
    flex: 6,
    borderBottomWidth: 0.5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIconArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  textBox: {
    borderWidth: 2,
    backgroundColor: '#444444',
    borderRadius: 15,
    borderColor: '#999999',
    color: 'white',
  },
  textBoxContainer: {
    height: 150,
    width: 200,
    margin: 7,
    marginRight: 35,
  },
});
