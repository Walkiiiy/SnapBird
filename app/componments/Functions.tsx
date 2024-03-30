import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default function ScrollableButtonSelector({handleSelect, options}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.button}
          onPress={() => handleSelect(option.label)}>
          <Text style={styles.buttonText}>{option.label}</Text>
          <View style={styles.introArea}>
            <Image
              source={option.introImage1} // 图片路径
              style={styles.introImage}
            />
            <Image
              source={require('../assets/icons/arrow-right-gray.png')} // 图片路径
              style={{width: 12, height: 12}}
            />
            <Image
              source={option.introImage2} // 图片路径
              style={styles.introImage}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
  },
  button: {
    width: 150,
    height: 100,
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#333333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    margin: 2,
  },
  introArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
  },
  introImage: {width: 20, height: 20, margin: 3, marginLeft: 7, marginRight: 7},
});
