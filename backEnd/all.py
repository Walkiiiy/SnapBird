import requests
import json
from apiKey import get_app_id, get_secret_code


def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()


class CommonOcr(object):
    def __init__(self, img_path):
        # 请登录后前往 “工作台-账号设置-开发者信息” 查看 x-ti-app-id
        # 示例代码中 x-ti-app-id 非真实数据
        self._app_id = get_app_id()

        # 请登录后前往 “工作台-账号设置-开发者信息” 查看 x-ti-secret-code
        # 示例代码中 x-ti-secret-code 非真实数据
        self._secret_code = get_secret_code()

        self._img_path = img_path

    def recognize(self):
        # 通用文字识别
        url = 'https://api.textin.com/ai/service/v2/recognize'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            # print(type(result.text))
            # 解析JSON数据
            data = json.loads(result.text)
            # 提取result中的text内容
            texts = [line['text'] for line in data['result']['lines']]
            return texts  # 返回值形如 ['NEW', 'Textin', '市场／价格', '体验中心'] 的list
        except Exception as e:
            print(e)
            return 0

    def tableRecognize(self):
        # 通用表格识别
        url = 'https://api.textin.com/ai/service/v2/recognize/table?excel=1'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            print(1212)
            result = (json.loads(result.text).get(
                'result', {}).get('excel', None))
            return result
        except Exception as e:
            print(e)
            return 0

    def watermark_remove(self):
        # 图像水印去除
        url = 'https://api.textin.com/ai/service/v1/image/watermark_remove'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            # 解析JSON数据
            data = json.loads(result.text)
            # 提取result中的text内容
            texts = data['result']['image']
            return texts
        except Exception as e:
            return e

    def id_card(self):
        # 身份证识别
        url = 'https://api.textin.com/robot/v1.0/api/id_card'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e

    def pdf_to_word(self):
        # PDF转Word
        url = 'https://api.textin.com/ai/service/v1/file-convert/pdf-to-word'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e

    def pdf_to_excel(self):
        # PDF转Excel
        url = 'https://api.textin.com/ai/service/v1/file-convert/pdf-to-excel'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e

    def pdf_to_ppt(self):
        # PDF转PPT
        url = 'https://api.textin.com/ai/service/v1/file-convert/pdf-to-ppt'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e

    def pdf_to_img(self):
        # PDF转图片
        url = 'https://api.textin.com/ai/service/v1/file-convert/pdf-to-image'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e

    def word_to_pdf(self):
        # Word转PDF
        url = 'https://api.textin.com/ai/service/v1/file-convert/word-to-pdf'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e

    def excel_to_pdf(self):
        # Excel转PDF
        url = 'https://api.textin.com/ai/service/v1/file-convert/excel-to-pdf'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e

    def img_to_pdf(self):
        # 图片转PDF
        url = 'https://api.textin.com/ai/service/v1/file-convert/image-to-pdf'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e

    def word_to_img(self):
        # Word转图片
        url = 'https://api.textin.com/ai/service/v1/file-convert/word-to-image'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            return result.text
        except Exception as e:
            return e


if __name__ == "__main__":
    response = CommonOcr(r'back/pics/input.png')
    # print(response.recognize())

    # for text in response.recognize():
    #     print(text)
    print(response.watermark_remove())
