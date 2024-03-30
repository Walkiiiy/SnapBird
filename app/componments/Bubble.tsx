import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomBubble = ({text, isSender}) => {
  return (
    <View
      style={[
        styles.bubble,
        isSender ? styles.senderBubble : styles.receiverBubble,
      ]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '100%',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  senderBubble: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-end',
  },
  receiverBubble: {
    backgroundColor: '#2f4f4f',
    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
  },
});

export default CustomBubble;
