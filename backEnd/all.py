import requests
import json
from apiKey import get_app_id, get_secret_code
import base64


def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()


def get_file_base64(filePath):
    with open(filePath, 'rb') as fp:
        image_content = fp.read()
    return base64.b64encode(image_content).decode('utf-8')


def format_bills_rec_response(response):
    try:
        response = eval(response)
    except (SyntaxError, ValueError):
        return "输入的响应文本格式不正确。"

    # 确保输入是一个字典并且包含需要的键
    if not isinstance(response, dict) or 'result' not in response or 'object_list' not in response['result']:
        return "输入的响应格式不正确或缺少必要的信息。"

    # 初始化结果字符串
    result_str = ""

    # 遍历所有票据对象
    for obj in response['result']['object_list']:
        type_description = "票据类型描述：" + obj.get('type_description', '未知')
        kind_description = "票据使用类型描述：" + obj.get('kind_description', '未知')
        item_descriptions = []

        # 遍历所有识别项
        for item in obj.get('item_list', []):
            key_description = item.get('description', '未知字段')
            value = item.get('value', '')
            item_descriptions.append(f"{key_description}：{value}")

        # 将票据的描述加入结果字符串
        result_str += f"{type_description}，{kind_description}，" + \
            "，".join(item_descriptions) + "。\n"

    return result_str


def format_business_license_response(response):
    try:
        response = eval(response)
    except (SyntaxError, ValueError):
        return "输入的响应文本格式不正确。"
    # 确保输入是一个字典并且包含需要的键
    if not isinstance(response, dict) or 'result' not in response or 'item_list' not in response['result']:
        return "输入的响应格式不正确或缺少必要的信息。"

    # 初始化结果字符串
    result_str = "营业执照识别结果：\n"

    # 遍历识别结果中的每一个项
    for item in response['result']['item_list']:
        # 获取字段的中文描述和对应的值
        description = item.get('description', '未知字段')
        value = item.get('value', '')

        # 将字段描述和值加入到结果字符串中
        result_str += f"{description}：{value}\n"

    return result_str


def format_id_card_response(response):
    try:
        response = eval(response)
    except (SyntaxError, ValueError):
        return "输入的响应文本格式不正确。"
    # 检查是否为有效的响应格式
    if not isinstance(response, dict) or 'result' not in response or 'item_list' not in response['result']:
        return "输入的响应格式不正确或缺少必要的信息。"

    # 初始化结果字符串
    result_str = "身份证识别结果：\n"

    # 排除的字段列表
    exclude_keys = ['id_number_image', 'crop_image', 'head_portrait']

    # 遍历识别结果中的每一个项
    for item in response['result']['item_list']:
        key = item.get('key', '')

        # 如果当前字段在排除列表中，则跳过
        if key in exclude_keys:
            continue

        # 获取字段的中文描述和对应的值
        description = item.get('description', '未知字段')
        value = item.get('value', '')

        # 将字段描述和值加入到结果字符串中
        result_str += f"{description}：{value}\n"

    return result_str


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
            result = (json.loads(result.text).get(
                'result', {}).get('excel', None))
            return result
        except Exception as e:
            print(e)
            return 0

    def crop_enhance_image(self):
        # 图片切边增强
        url = 'https://api.textin.com/ai/service/v1/crop_enhance_image'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}).get('image_list', None))[0].get('image', None)
            return result
        except Exception as e:
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
            result = (json.loads(result.text).get(
                'result', {}).get('image', None))
            return result
        except Exception as e:
            print(e)
            return 0

    def pdf_to_word(self):
        # PDF转Word
        url = 'https://api.textin.com/ai/service/v1/file-convert/pdf-to-word'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def pdf_to_excel(self):
        # PDF转Excel
        url = 'https://api.textin.com/ai/service/v1/file-convert/pdf-to-excel'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def pdf_to_ppt(self):
        # PDF转PPT
        url = 'https://api.textin.com/ai/service/v1/file-convert/pdf-to-ppt'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def pdf_to_img(self):
        # PDF转图片
        url = 'https://api.textin.com/ai/service/v1/file-convert/pdf-to-image'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def word_to_pdf(self):
        # Word转PDF
        url = 'https://api.textin.com/ai/service/v1/file-convert/word-to-pdf'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def excel_to_pdf(self):
        # Excel转PDF
        url = 'https://api.textin.com/ai/service/v1/file-convert/excel-to-pdf'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def img_to_pdf(self):
        url = 'https://api.textin.com/ai/service/v1/file-convert/image-to-pdf'
        headers = {
            'x-ti-app-id': self._app_id,
            'x-ti-secret-code': self._secret_code,
            'Content-Type': 'application/json'
        }
        # 这里特别要求要图片的base64
        base64_image = get_file_base64(self._img_path)

        # 构建JSON请求体
        payload = json.dumps({
            "files": [base64_image]  # 可以添加更多的图片Base64字符串
        })

        try:
            # 发送请求
            result = requests.post(url, data=payload, headers=headers)
            result = (json.loads(result.text).get(
                'result', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def word_to_img(self):
        # Word转图片
        url = 'https://api.textin.com/ai/service/v1/file-convert/word-to-image'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def img_to_word(self):
        # 图片转word
        url = 'https://api.textin.com/robot/v1.0/api/doc_restore'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = (json.loads(result.text).get(
                'result', {}).get('docx', {}))
            return result
        except Exception as e:
            print(e)
            return 0

    def content_extract(self, keys):
        # 通用NLP信息抽取
        url = 'https://api.textin.com/ai/service/v1/contents-extract'
        head = {}
        try:
            # image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code

            type = "image"  # image 类型
            image = get_file_content(self._img_path)
            image_base64 = base64.b64encode(image).decode()  # 将图像数据转为base64编码
            request_body = json.dumps(
                {"keys": keys, "file": image_base64, "type": type})  # 构造请求体
            result = requests.post(url, data=request_body, headers=head)

            result = (json.loads(result.text).get(
                'result', {}).get('item_list', {}))
            res = []
            for item in result:
                res.append(item['key']+':\n')
                candidates = item['candidates']
                for it in candidates:
                    res.append(it['value']+'\n')
            return res
        except Exception as e:
            print(e)
            return 0

    def bills_recognize(self):
        # 国内通用票据识别
        url = 'https://api.textin.com/robot/v1.0/api/bills_crop'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = format_bills_rec_response(result.text)
            return result
        except Exception as e:
            print(e)
            return 0

    def business_license(self):
        # 营业执照识别
        url = 'https://api.textin.com/robot/v1.0/api/business_license'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = format_business_license_response(result.text)
            return result
        except Exception as e:
            print(e)
            return 0

    def idCard(self):
        # 身份证识别
        url = 'https://api.textin.com/robot/v1.0/api/id_card'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = format_id_card_response(result.text)
            print(result)
            return result
        except Exception as e:
            print(e)
            return 0

    def bankCard(self):
        # 银行卡识别
        url = 'https://api.textin.com/robot/v1.0/api/bank_card'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = format_id_card_response(result.text)
            print(result)
            return result
        except Exception as e:
            print(e)
            return 0

    def driverLicense(self):
        # 银行卡识别
        url = 'https://api.textin.com/robot/v1.0/api/driver_license'
        head = {}
        try:
            image = get_file_content(self._img_path)
            head['x-ti-app-id'] = self._app_id
            head['x-ti-secret-code'] = self._secret_code
            result = requests.post(url, data=image, headers=head)
            result = format_id_card_response(result.text)
            print(result)
            return result
        except Exception as e:
            print(e)
            return 0
