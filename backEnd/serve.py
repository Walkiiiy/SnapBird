from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from all import CommonOcr
import time
import os

from setpath import *
from utils import determine_file_type


app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/upload', methods=['POST'])  # 逐个上传文件，根据文件类型分类存储
def upload_file():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        fileType = determine_file_type(uploaded_file.filename)
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
            pass
        return jsonify({'message': 'File has been uploaded successfully'})
    return jsonify({'message': 'No file was uploaded'})


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
            results.append({
                'file_name': filename,
                'texts': texts
            })
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


'''
去水印
return 图片的base64编码
'''


@app.route('/watermark_remove', methods=['POST'])
def watermark_remove():
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
            texts = common_ocr.watermark_remove()

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
    app.run(port=5000)
