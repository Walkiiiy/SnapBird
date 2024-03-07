// PDFViewer.js

import React from 'react';
import Pdf from 'react-native-pdf';
import {View, StyleSheet} from 'react-native';

import {PermissionsAndroid} from 'react-native';

async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Storage Permission',
        message:
          'Cool Photo App needs access to your storage ' +
          'so you can save awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the storage');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const PDFViewer = ({route}) => {
  const {base64String, fileName} = route.params;

  //requestStoragePermission();
  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: 'data:application/pdf;base64,' + base64String}}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default PDFViewer;
