from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from all import CommonOcr
import time
import os
import json
import random

from setpath import *
from utils import determine_file_type
from GPT.GPT import chat

app = Flask(__name__)
CORS(app, supports_credentials=True)

fileNames = os.listdir(picPath)+os.listdir(pdfPath) + \
    os.listdir(pptPath)+os.listdir(excelPath)+os.listdir(wordPath)

fileTypes = []
for fileName in fileNames:
    fileTypes.append(determine_file_type(fileName))

print('current fileName:', fileNames)
print('current fileType:', fileTypes)


@app.route('/chat', methods=['GET'])
def gpt_chat():
    try:
        message = request.args.get('message')
        if not message:
            return jsonify({'error': 'no message carried!'})
        response = chat(message)
        if response:
            try:  # 对gpt模块响应进行处理
                print(response)
                response = json.loads(response)
                if response['type'] == 'operation':
                    return jsonify({'response': '请稍后，处理结果将在文件区展示:)'})
                elif response['type'] == 'rejection':
                    return jsonify({'response': response['content']})
            except Exception as e:  # 无法json化
                return jsonify({'response': 'gpt returned an incorrect form(probably not json)', })
        else:
            return jsonify({'error': 'gpt session is unavilible.'})
    except Exception as e:
        return jsonify({'error': e})


@app.route('/upload', methods=['POST'])  # 逐个上传文件，根据文件类型分类存储
def upload_file():
    uploaded_file = request.files['file']
    fileNames.append(uploaded_file.filename)
    if uploaded_file.filename != '':
        fileType = determine_file_type(uploaded_file.filename)
        fileTypes.append(fileType)
        if fileType == 'images':
            uploaded_file.save(picPath+uploaded_file.filename)
        elif fileType == 'ppt':
            uploaded_file.save(pptPath+uploaded_file.filename)
        elif fileType == 'word':
            uploaded_file.save(wordPath+uploaded_file.filename)
        elif fileType == 'pdf':
            uploaded_file.save(pdfPath+uploaded_file.filename)
        elif fileType == 'excel':
            uploaded_file.save(excelPath+uploaded_file.filename)
        else:
            print('unkown type of file!')
        return jsonify({'message': 'File has been uploaded successfully'})
    return jsonify({'message': 'No file was uploaded'})


@app.route('/delFile', methods=['GET'])  # 单个删除文件
def del_file():
    index = int(request.args.get('index'))
    print('index:', index)
    print('fileupload:', fileNames)
    fileType = fileTypes.pop(index)
    fileName = fileNames.pop(index)
    if fileType == 'images':
        os.remove(picPath+fileName)
    elif fileType == 'ppt':
        os.remove(pptPath+fileName)
    elif fileType == 'word':
        os.remove(wordPath+fileName)
    elif fileType == 'pdf':
        os.remove(pdfPath+fileName)
    elif fileType == 'excel':
        os.remove(excelPath+fileName)
    else:
        print('unkown type of file!')
        return jsonify({'message': 'ubkonwn file'})
    print(fileNames)
    return jsonify({'message': 'File has been removed successfully'})


@app.route('/recognize', methods=['GET'])  # 批量文字识别
def recognize():
    try:
        files = os.listdir(picPath)  # 列出目录下所有文件
    except Exception as e:
        return jsonify({'message': 'Error listing input directory', 'error': str(e)})

    results = []

    for i, filename in enumerate(files):
        file_path = os.path.join(picPath, filename)
        try:
            common_ocr = CommonOcr(file_path)
            texts = common_ocr.recognize()
            if texts:
                results.append({
                    'file_name': str(random.randint(100, 999))+filename,
                    'texts': texts
                })
            else:
                print('something went wrong with main/recognize.')
        except Exception as e:
            print(f"Error processing file {filename}: {e}")
            results.append({
                'file_name': filename,
                'error': str(e)
            })
    return jsonify({
        'message': 'Files processed successfully',
        'results': results
    })


@app.route('/tableRecognize', methods=['GET'])  # 表格识别image->excel
def table():
    results = []
    try:
        files = os.listdir(picPath)  # 列出目录下所有文件
    except Exception as e:
        return jsonify({'message': 'Error listing input directory', 'error': str(e)})
    for i, filename in enumerate(files):
        file_path = os.path.join(picPath, filename)
        try:
            common_ocr = CommonOcr(file_path)
            excel = common_ocr.tableRecognize()
            if excel:
                results.append({
                    'file_name': str(random.randint(100, 999))+filename+'.xls',
                    'res': excel
                })
            else:
                print('something went wrong with all/tableRecognize.')
        except Exception as e:
            print(f"Error processing file {filename}: {e}")
            results.append({
                'file_name': filename,
                'error': str(e)
            })
    return jsonify({
        'message': 'Files processed successfully',
        'results': results
    })


@app.route('/cropEnhance', methods=['GET'])  # 图像切边增强image->image
def cropEnhance():
    results = []
    try:
        files = os.listdir(picPath)  # 列出目录下所有文件
    except Exception as e:
        return jsonify({'message': 'Error listing input directory', 'error': str(e)})
    for i, filename in enumerate(files):
        file_path = os.path.join(picPath, filename)
        try:
            common_ocr = CommonOcr(file_path)
            res = common_ocr.crop_enhance_image()
            if res:
                results.append({
                    'file_name': str(random.randint(100, 999))+filename,
                    'res': res
                })
            else:
                print('something went wrong with all/crop_enhance_image.')
        except Exception as e:
            print(f"Error processing file {filename}: {e}")
            results.append({
                'file_name': filename,
                'error': str(e)
            })
    return jsonify({
        'message': 'Files processed successfully',
        'results': results
    })


@app.route('/waterMarkRemove', methods=['GET'])  # 图像去水印 image->image
def waterMarkRemove():
    results = []
    try:
        files = os.listdir(picPath)  # 列出目录下所有文件
    except Exception as e:
        return jsonify({'message': 'Error listing input directory', 'error': str(e)})
    for i, filename in enumerate(files):
        file_path = os.path.join(picPath, filename)
        try:
            common_ocr = CommonOcr(file_path)
            res = common_ocr.watermark_remove()
            if res:
                results.append({
                    'file_name': filename,
                    'res': res
                })
            else:
                print('something went wrong with all/waterMarkRemove.')
        except Exception as e:
            print(f"Error processing file {filename}: {e}")
            results.append({
                'file_name': str(random.randint(100, 999))+filename,
                'error': str(e)
            })
    return jsonify({
        'message': 'Files processed successfully',
        'results': results
    })


'''
身份证识别
'''


@app.route('/id_card', methods=['POST'])
def id_card():
    uploaded_files = request.files.getlist('files')
    if not uploaded_files:
        return jsonify({'message': 'No files were uploaded'})

    results = []

    for i, uploaded_file in enumerate(uploaded_files):
        try:
            # 使用时间戳创建唯一的文件名
            timestamp = str(int(time.time()))
            file_path = os.path.join(inputPath, f'input_{timestamp}_{i}.png')
            uploaded_file.save(file_path)

            common_ocr = CommonOcr(file_path)

            # 测试，后期删掉
            return send_from_directory(inputPath, f'input_{timestamp}_{i}.png')
            texts = common_ocr.id_card()

            results.append({
                'file_name': uploaded_file.filename,
                'image_base64': texts
            })
        except Exception as e:
            # 记录错误并返回友好的错误信息
            print(f"Error processing file {uploaded_file.filename}: {e}")
            results.append({
                'file_name': uploaded_file.filename,
                'error': str(e)
            })

    return jsonify({
        'message': 'Files processed successfully',
        'results': results
    })


'''
pdf转img
'''


@app.route('/pdf_to_img', methods=['POST'])
def pdf_to_img():
    uploaded_files = request.files.getlist('files')
    if not uploaded_files:
        return jsonify({'message': 'No files were uploaded'})

    results = []

    for i, uploaded_file in enumerate(uploaded_files):
        try:
            # 使用时间戳创建唯一的文件名
            timestamp = str(int(time.time()))
            file_path = os.path.join(inputPath, f'input_{timestamp}_{i}.png')
            uploaded_file.save(file_path)

            common_ocr = CommonOcr(file_path)
            # 测试，后期删掉
            return send_from_directory(inputPath, f'input_{timestamp}_{i}.png')
            texts = common_ocr.pdf_to_img()

            results.append({
                'file_name': uploaded_file.filename,
                'image_base64': texts
            })
        except Exception as e:
            # 记录错误并返回友好的错误信息
            print(f"Error processing file {uploaded_file.filename}: {e}")
            results.append({
                'file_name': uploaded_file.filename,
                'error': str(e)
            })

    return jsonify({
        'message': 'Files processed successfully',
        'results': results
    })


'''
word转img
'''


@app.route('/word_to_img', methods=['POST'])
def word_to_img():
    uploaded_files = request.files.getlist('files')
    if not uploaded_files:
        return jsonify({'message': 'No files were uploaded'})

    results = []

    for i, uploaded_file in enumerate(uploaded_files):
        try:
            # 使用时间戳创建唯一的文件名
            timestamp = str(int(time.time()))
            file_path = os.path.join(inputPath, f'input_{timestamp}_{i}.png')
            uploaded_file.save(file_path)

            common_ocr = CommonOcr(file_path)
            # 测试，后期删掉
            return send_from_directory(inputPath, f'input_{timestamp}_{i}.png')
            texts = common_ocr.word_to_img()

            results.append({
                'file_name': uploaded_file.filename,
                'image_base64': texts
            })
        except Exception as e:
            # 记录错误并返回友好的错误信息
            print(f"Error processing file {uploaded_file.filename}: {e}")
            results.append({
                'file_name': uploaded_file.filename,
                'error': str(e)
            })

    return jsonify({
        'message': 'Files processed successfully',
        'results': results
    })


if __name__ == '__main__':
    app.run(port=5000, debug=True)
