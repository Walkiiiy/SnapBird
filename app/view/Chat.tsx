import React, {useState, useCallback, useEffect} from 'react';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
} from 'react-native-gifted-chat';
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
import PicShow from '../componments/PicShow';
import UploadImgButton from '../componments/UploadButton';
export default function Example({route, navigation}) {
  const {firstMessage, imageUriPass} = route.params;

  const snapbird = {
    _id: 2,
    name: 'SnapBird',
    avatar: require('../assets/images/snapbird.png'),
  };
  const [messages, setMessages] = useState([]);
  const [showActivativeIndicator, setShowActivativeIndicator] = useState(false);
  const [picVisible, setPicVisible] = useState(false);
  const [imageUri, setImageUri] = useState(imageUriPass);
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
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'SnapBird',
          avatar: require('../assets/images/snapbird.png'),
        },
      },
    ];
    onSend(firstChat);
    if (imageUri.length != 0) {
      setPicVisible(true);
    }
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setShowActivativeIndicator(true);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    await wait(2000);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {
          _id: Date(),
          text: '嘿嘿嘿',
          createdAt: new Date(),
          user: snapbird,
        },
      ]),
    );
    console.log(messages);
    setShowActivativeIndicator(false);
  }, []);

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  return (
    <View style={styles.container}>
      {/* 标题，菜单按钮 */}
      <View style={styles.topBar}></View>
      {/* 图片icon，图片展示，加载指示器 */}
      <View style={styles.picArea}>
        <View style={styles.picShowArea}>
          {!picVisible ? (
            <View style={styles.imageIconArea}>
              <Image
                source={require('../assets/icons/pic.png')}
                style={{height: 50, width: 50}}></Image>
            </View>
          ) : (
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {imageUri.map(uri => (
                  <PicShow
                    key={uri}
                    imageUrl={uri}
                    onClose={() => delImg(uri)}
                  />
                ))}
              </ScrollView>
            </View>
          )}
          <View style={styles.uploadButtonContainer}>
            <UploadImgButton onPress={() => {}}></UploadImgButton>
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
          onSend={messages => onSend(messages)}
          onPress={() => {
            console.log('pressed');
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
    flex: 1,
  },
  activityIndicator: {
    margin: 5,
  },
  topBar: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  picArea: {
    flex: 5,
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
});
