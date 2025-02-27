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
export async function billRecognizeInterface() {
  console.log('main:billRec');
  const Url = url + 'bills_recognize';
  try {
    // 发送GET请求到指定的URL
    const response = await axios.get(Url);
    if (response.data.message == 'Files processed successfully') {
      console.log(response.data.results);
      return response.data.results; //例：{"file_name": "1000000049.png", "texts": ["中国原指华夏族的发源地
    } else {
      return 'server returned a bad signal!';
    }
  } catch (error) {
    console.log(error);
  }
}
export async function businessLicense() {
  console.log('main:businessLicense');
  const Url = url + 'business_license';
  try {
    // 发送GET请求到指定的URL
    const response = await axios.get(Url);
    if (response.data.message == 'Files processed successfully') {
      console.log(response.data.results);
      return response.data.results; //例：{"file_name": "1000000049.png", "texts": ["中国原指华夏族的发源地
    } else {
      return 'server returned a bad signal!';
    }
  } catch (error) {
    console.log(error);
  }
}
export async function idCard() {
  console.log('main:idCard');
  const Url = url + 'id_card';
  try {
    // 发送GET请求到指定的URL
    const response = await axios.get(Url);
    if (response.data.message == 'Files processed successfully') {
      console.log(response.data.results);
      return response.data.results; //例：{"file_name": "1000000049.png", "texts": ["中国原指华夏族的发源地
    } else {
      return 'server returned a bad signal!';
    }
  } catch (error) {
    console.log(error);
  }
}
export async function bankCard() {
  console.log('main:bankCard');
  const Url = url + 'bank_card';
  try {
    // 发送GET请求到指定的URL
    const response = await axios.get(Url);
    if (response.data.message == 'Files processed successfully') {
      console.log(response.data.results);
      return response.data.results; //例：{"file_name": "1000000049.png", "texts": ["中国原指华夏族的发源地
    } else {
      return 'server returned a bad signal!';
    }
  } catch (error) {
    console.log(error);
  }
}
export async function driverLicense() {
  console.log('main:driverLicense');
  const Url = url + 'driver_license';
  try {
    // 发送GET请求到指定的URL
    const response = await axios.get(Url);
    if (response.data.message == 'Files processed successfully') {
      console.log(response.data.results);
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
export async function wordToPdf() {
  console.log('main:wordToPdf');
  const Url = url + 'word_to_pdf';
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
    console.error('Error fetching the word file: ', error);
    throw error; // Rethrow or handle as needed
  }
}
export async function pdfToImg() {
  console.log('main:pdfToImg');
  const Url = url + 'pdf_to_image';
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
    console.error('Error fetching the pdf file: ', error);
    throw error; // Rethrow or handle as needed
  }
}

export async function pdfToPpt() {
  console.log('main:pdfToPpt');
  const Url = url + 'pdf_to_ppt';
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
    console.error('Error fetching the pdf file: ', error);
    throw error; // Rethrow or handle as needed
  }
}
export async function pdfToExcel() {
  console.log('main:pdfToExcel');
  const Url = url + 'pdf_to_excel';
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
    console.error('Error fetching the pdf file: ', error);
    throw error; // Rethrow or handle as needed
  }
}
export async function pdfToWord() {
  console.log('main:pdfToWord');
  const Url = url + 'pdf_to_word';
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
    console.error('Error fetching the pdf file: ', error);
    throw error; // Rethrow or handle as needed
  }
}

export async function imgToWord() {
  console.log('main:imgToWord');
  const Url = url + 'img_to_word';
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
    console.error('Error fetching the img file: ', error);
    throw error; // Rethrow or handle as needed
  }
}

export const uploadFile = async (fileUri, fileName) => {
  // 创建 FormData 对象
  const formData = new FormData();
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

export async function sendUserExit() {
  const Url = url + 'userExit';
  try {
    const response = await axios.get(Url);
  } catch (error) {
    console.log(error);
  }
}

export async function typeQuery() {
  const Url = url + 'type_query';
  try {
    const response = await axios.get(Url);
    console.log('main:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

export async function WaterMarker(text: string) {
  console.log('main:waterMarker');
  const Url = url + 'waterMarker?text=' + text;
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
export async function register(name, password, email) {
  try {
    // 发送 POST 请求到注册接口
    const response = await axios.post(url + '/register', {
      name: name,
      password: password,
      email: email,
    });

    // 处理响应结果
    const data = response.data;
    if (response.status === 200) {
      // 注册成功
      console.log(data.message);
      return 1;
      // 执行页面跳转或其他操作
    } else {
      // 注册失败
      console.error(data.message);
      // 提示用户注册失败信息
      return 0;
    }
  } catch (error) {
    console.error('Error:', error);
    // 处理请求错误
  }
}

export async function login(password, email) {
  try {
    // 发送 POST 请求到注册接口
    const response = await axios.post(url + '/login', {
      password: password,
      email: email,
    });

    // 处理响应结果
    const data = response.data;
    if (response.status === 200) {
      console.log(data.name);
      return data.name;
      // 执行页面跳转或其他操作
    } else {
      console.error(data.message);
      return 0;
    }
  } catch (error) {
    console.error('Error:', error);
    // 处理请求错误
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
