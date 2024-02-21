// RightSideMenu.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const menuItems = ['账户', 'AI助手', '历史记录', '设置']; // 示例菜单项

function RightSideMenu({visible, onClose, onChoose}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.menuView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.avatarArea}>
              <Image
                style={styles.avatar}
                source={require('../assets/icons/black_me.png')}
              />
            </View>
            <Text style={{color: 'white', fontSize: 18}}>{'未登录'}</Text>
          </View>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onChoose(index);
              }}
              style={{
                width: width * 0.65,
                borderColor: 'white',
                borderTopWidth: 1,
              }}>
              <Text style={styles.menuItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButtonArea} onPress={onClose}>
            <Image
              style={styles.closeButtonImg}
              source={require('../assets/icons/arrow-left.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuView: {
    width: width * 0.7,
    height: height,
    backgroundColor: '#333333',
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  avatar: {
    width: 70, // 图像宽度
    height: 70, // 图像高度
    borderRadius: 50, // 将 borderRadius 设置为宽度和高度的一半可以创建圆形效果
    // 如果你的图像不是正方形，请确保 width 和 height 相等，并将 borderRadius 设置为这两个值的一半
    resizeMode: 'cover', // 覆盖整个图像框
  },
  avatarArea: {
    backgroundColor: 'lightblue',
    borderRadius: 50,
    position: 'relative',
    right: 10,
    margin: 20,
  },
  menuItemText: {
    color: 'white',
    margin: 15,
    marginBottom: 25,
    fontSize: 22,
  },
  closeButtonArea: {
    marginTop: 15,
    marginBottom: 15,
    position: 'absolute',
    bottom: 30,
    left: 25,
  },
  closeButtonImg: {
    width: 40,
    height: 40,
  },
});

export default RightSideMenu;
