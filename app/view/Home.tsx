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
} from 'react-native';
import SendMessageButton from '../componments/SendMessageButton';
import ShortCut from '../componments/ShortCut';
import UploadButton from '../componments/UploadButton';
import Functions from '../componments/Functions';
import Notice from '../componments/Notice';
import SideMenu from '../componments/SideMenu';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import PicShow from '../componments/PicShow';
import UploadMenu from '../componments/UploadMenu';
import DocumentPicker from 'react-native-document-picker';

export default function HomeScreen({navigation}) {
  // 动态变量
  const [text, setText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(true);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [imageUri, setImageUri] = React.useState([]);
  const [picVisible, setPicVisible] = React.useState(false);
  const [uploadMenuVisible, setUploadMenuVisible] = React.useState(false);
  const [keyboardShown, setKeyboardShown] = React.useState(false);
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

  // 自定函数
  function sendMessage() {
    console.log('sendMessage');
    Keyboard.dismiss();
    if (text != '') {
      navigation.navigate('Chat', {
        firstMessage: text,
        imageUriPass: imageUri,
      });
    }
    setText('');
  }
  function delImg(uri) {
    setImageUri(currentImageUris => {
      const index = currentImageUris.findIndex(element => element === uri);
      if (index !== -1) {
        // 创建数组的副本
        const tempArray = [...currentImageUris];
        // 删除指定索引的元素
        tempArray.splice(index, 1);
        // 返回新数组作为新状态
        if (tempArray.length == 0) {
          setPicVisible(false);
        }
        return tempArray;
      }
      return currentImageUris; // 如果没有找到，返回原始数组
    });
  }
  function uploadImg() {
    const options = {
      noData: true,
      selectionLimit: 0, // 允许用户选择任意数量的图片
    };
    launchImageLibrary(options, response => {
      const newUris = [];
      if (!response.didCancel) {
        for (const asset of response.assets) {
          newUris.push(asset.uri);
        }
        console.log(newUris);
        setImageUri(imageUri.concat(newUris));
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
        setImageUri(response.assets[0].uri);
      }
    });
  }

  async function fileSelector() {
    try {
      // 启动文档选择器，并设置类型为 PDF
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      // res.uri 是选中文件的 URI
      console.log(
        `URI: ${res.uri}\nType: ${res.type}\nName: ${res.name}\nSize: ${res.size}`,
      );

      // 这里可以添加上传文件的代码
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
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

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

      {/* icon,传入图片展示部分 */}
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
            {imageUri.map(uri => (
              <PicShow key={uri} imageUrl={uri} onClose={() => delImg(uri)} />
            ))}
          </ScrollView>
        </View>
      )}

      {/* 快速开始 */}
      <View style={styles.shortCutArea}>
        <View style={styles.functionTitleArea}>
          <Text style={styles.functionTitle}>快速开始</Text>
        </View>
        <View style={styles.selectionArea}>
          <Functions />
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
            <Text style={styles.functionTitle}>ShortCut</Text>
          </View>
          <View style={styles.selectionArea}>
            <ShortCut />
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
  },
});
