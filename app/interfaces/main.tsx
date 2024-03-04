import axios from 'axios';
import RNFS from 'react-native-fs';
const url = 'http://10.0.2.2:5000/';

export async function ocrInterface() {
  console.log('main:ocr');
  const Url = url + 'recognize';
  try {
    // 发送GET请求到指定的URL
    const response = await axios.get(Url);
    if (response.data.message == 'Files processed successfully') {
      return response.data.results; //例：{"file_name": "1000000049.png", "texts": ["中国原指华夏族的发源地
    } else {
      return 'server returned a bad signal!';
    }
  } catch (error) {
    console.log(error);
  }
}

export async function tableInterface() {
  console.log('main:table recognize');
  const Url = url + 'tableRecognize';
  try {
    const response = await axios.get(Url);
    //存储文件到内部
    // for (let i in response.data.results) {
    //   paths.push(
    //     saveFile(
    //       response.data.results[i].file_name,
    //       response.data.results[i].res,
    //     ),
    //   );
    // }
    return response.data.results;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching the Excel file: ', error);
    throw error; // Rethrow or handle as needed
  }
}

export async function cropEnhanceInterface() {
  console.log('main:cropEnchance');
  const Url = url + 'cropEnhance';
  const paths = [];
  try {
    const response = await axios.get(Url);
    //存储文件到内部
    // for (let i in response.data.results) {
    //   paths.push(
    //     saveFile(
    //       response.data.results[i].file_name,
    //       response.data.results[i].res,
    //     ),
    //   );
    // }
    return response.data.results;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching the pic file: ', error);
    throw error; // Rethrow or handle as needed
  }
}

export async function waterMarkRemove() {
  console.log('main:waterMarkRemove');
  const Url = url + 'waterMarkRemove';
  try {
    const response = await axios.get(Url);
    //存储文件到内部
    // for (let i in response.data.results) {
    //   paths.push(
    //     saveFile(
    //       response.data.results[i].file_name,
    //       response.data.results[i].res,
    //     ),
    //   );
    // }
    return response.data.results;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching the pic file: ', error);
    throw error; // Rethrow or handle as needed
  }
}
export async function wordToImage() {
  console.log('main:wordToImage');
  const Url = url + 'word_to_img';
  try {
    const response = await axios.get(Url);
    //存储文件到内部
    // for (let i in response.data.results) {
    //   paths.push(
    //     saveFile(
    //       response.data.results[i].file_name,
    //       response.data.results[i].res,
    //     ),
    //   );
    // }
    return response.data.results;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching the pic file: ', error);
    throw error; // Rethrow or handle as needed
  }
}

export async function imageToPdf() {
  console.log('main:imageToPdf');
  const Url = url + 'img_to_pdf';
  try {
    const response = await axios.get(Url);
    //存储文件到内部
    // for (let i in response.data.results) {
    //   paths.push(
    //     saveFile(
    //       response.data.results[i].file_name,
    //       response.data.results[i].res,
    //     ),
    //   );
    // }
    return response.data.results;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching the pic file: ', error);
    throw error; // Rethrow or handle as needed
  }
}
export async function excelToPdf() {
  console.log('main:excelToPdf');
  const Url = url + 'excel_to_pdf';
  try {
    const response = await axios.get(Url);
    //存储文件到内部
    // for (let i in response.data.results) {
    //   paths.push(
    //     saveFile(
    //       response.data.results[i].file_name,
    //       response.data.results[i].res,
    //     ),
    //   );
    // }
    return response.data.results;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching the excel file: ', error);
    throw error; // Rethrow or handle as needed
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

function saveFile(fileName, fileContent) {
  const path = RNFS.DocumentDirectoryPath + fileName;

  // 写入文件
  RNFS.writeFile(path, fileContent, 'base64')
    .then(success => {
      console.log('outcome文件写入成功');
    })
    .catch(err => {
      console.log('error in main/saveFile Func:', err.message);
    });
}
