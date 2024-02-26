import axios from 'axios';
const url = 'http://10.0.2.2:5000/';
export async function ocrInterface() {
  const Url = url + 'recognize';
  try {
    // 发送GET请求到指定的URL
    const response = await axios.get(Url);
    if (response.data.message == 'Files processed successfully') {
      return response.data.results;
    } else {
      return 'server returned a bad signal!';
    }
  } catch (error) {
    console.log(error);
  }
}

export const uploadFile = async (fileUri, fileName) => {
  // 创建 FormData 对象
  const formData = new FormData();
  const extention = getFileExtension(fileUri);
  const now = new Date();
  var fileType = 'application/octet-stream';
  console.log(fileUri);
  // 添加文件
  // React Native中可能需要使用react-native-fs库来获取文件信息
  formData.append('file', {
    uri: fileUri,
    type: fileType,
    name: fileName,
  });
  const Url = url + 'upload';
  try {
    const response = await axios.post(Url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('上传成功：', response.data);
  } catch (error) {
    console.log(error);
  }
};
export async function delFileInterface(index) {
  const Url = url + 'delFile?index=' + index;
  try {
    const response = await axios.get(Url);
    console.log('服务器端删除响应：', response.data);
  } catch (error) {
    console.log(error);
  }
}
function getFileExtension(filePath) {
  // 按点分割字符串，然后取最后一个元素作为扩展名
  const parts = filePath.split('.');
  return parts[parts.length - 1];
}
