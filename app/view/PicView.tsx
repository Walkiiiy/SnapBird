import React from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const FullScreenImageViewer = ({route, navigation}) => {
  const {uri} = route.params;
  const images = [
    {
      // 将传递的uri转换为image-zoom-viewer需要的格式
      url: uri,
    },
  ];

  return (
    <ImageViewer
      imageUrls={images}
      onSwipeDown={() => navigation.goBack()}
      enableSwipeDown={true}
      renderIndicator={() => null} // 不渲染图片序号
    />
  );
};

export default FullScreenImageViewer;
