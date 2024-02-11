import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SendMessageButton from '../componments/SendMessage';
import ShortCut from '../componments/ShortCut';
import UploadImgButton from '../componments/UploadImg';
import Functions from '../componments/Functions';
import Notice from '../componments/Notice';
import SideMenu from '../componments/SideMenu';
import {launchImageLibrary} from 'react-native-image-picker';

export default function HomeScreen() {
  const [text, setText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(true);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [imageUri, setImageUri] = React.useState(null);
  const [picVisible, setPicVisible] = React.useState(false);
  function sendMessage() {
    console.log('sendMessage');
  }
  function uploadImg() {
    console.log('uploadImage');
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.assets && response.assets[0].uri) {
        setImageUri(response.assets[0].uri);
        console.log(imageUri);
      }
    });

    setPicVisible(true);
  }
  return (
    <View style={styles.container}>
      <Notice
        title="Hello👋👋"
        content="这是一个demo app，为了展示项目的概念设计，暂时没有后端功能实现。"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
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
      {!picVisible ? (
        <View style={styles.iconArea}>
          <Image
            source={require('../assets/images/snapbird.png')}
            style={styles.roundImage}
          />
        </View>
      ) : (
        <View style={styles.picArea}>
          <Image source={{uri: imageUri}} style={styles.picUploaded} />
        </View>
      )}
      <View style={styles.shortCutArea}>
        <View style={styles.functionTitleArea}>
          <Text style={styles.functionTitle}>快速开始</Text>
        </View>
        <View style={styles.selectionArea}>
          <Functions />
        </View>
      </View>
      <View style={styles.shortCutArea}>
        <View style={styles.functionTitleArea}>
          <Text style={styles.functionTitle}>ShortCut</Text>
        </View>
        <View style={styles.selectionArea}>
          <ShortCut />
        </View>
      </View>
      <View style={styles.inputArea}>
        <UploadImgButton onPress={uploadImg} />
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
  picUploaded: {
    width: 100,
    height: 100,
    margin: 15,
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
