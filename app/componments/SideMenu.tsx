// RightSideMenu.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
};

const menuItems = ['菜单项 1', '菜单项 2', '菜单项 3']; // 示例菜单项

const RightSideMenu: React.FC<Props> = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.menuView}>
          {menuItems.map((item, index) => (
            <Text key={index} style={styles.menuItem}>
              {item}
            </Text>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuView: {
    width: width * 0.8,
    height: height,
    backgroundColor: '#222222',
    padding: 35,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    color: 'white',
    marginBottom: 15,
    fontSize: 18,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RightSideMenu;
