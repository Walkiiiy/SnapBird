import React, {useState, useEffect} from 'react';
import {View, Text, Modal} from 'react-native';

const Notification = ({message}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000); // 消失延时时间，单位为毫秒
    }
  }, [message]);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 20,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Notification;
