def format_response(response):
    # 确保输入是一个字典并且包含需要的键
    if not isinstance(response, dict) or 'result' not in response or 'object_list' not in response['result']:
        return "输入的响应格式不正确或缺少必要的信息。"

    # 初始化结果字符串
    result_str = ""

    # 遍历所有票据对象
    for obj in response['result']['object_list']:
        class_description = "票据大类：" + obj.get('class', '未知')
        type_description = "票据类型描述：" + obj.get('type_description', '未知')
        item_descriptions = []

        # 遍历所有识别项
        for item in obj.get('item_list', []):
            key_description = item.get('description', '未知字段')
            value = item.get('value', '')
            item_descriptions.append(f"{key_description}：{value}")

        # 将票据的描述加入结果字符串
        result_str += f"{class_description}，{type_description}，" + \
            "，".join(item_descriptions) + "。\\n"

    return result_str


# 假定response是从API获取的JSON响应
response = {
    "code": 200,
    "message": "success",
    "result": {
        "object_list": [
            {
                "image_angle": 270,
                "rotated_image_width": 1440,
                "rotated_image_height": 1080,
                "position": [
                    300,
                    394,
                    1059,
                    411,
                    1059,
                    481,
                    300,
                    459
                ],
                "class": "local_invoice",
                "type": "quota_invoice",
                "type_description": "通用定额发票",
                "item_list": [
                    {
                        "key": "quota_invoice_code",
                        "value": "131001827953",
                        "position": [
                            752,
                            532,
                            1256,
                            535,
                            1256,
                            573,
                            752,
                            567
                        ],
                        "description": "发票代码"
                    },
                    {
                        "key": "money_small",
                        "value": "10.00",
                        "position": [
                            300,
                            394,
                            1059,
                            411,
                            1059,
                            481,
                            300,
                            459
                        ],
                        "description": "金额(小写)"
                    }
                ]
            },
            {
                "image_angle": 270,
                "rotated_image_width": 1330,
                "rotated_image_height": 1280,
                "position": [
                    300,
                    394,
                    1059,
                    411,
                    1059,
                    481,
                    300,
                    459
                ],
                "class": "other",
                "type": "train_ticket",
                "type_description": "火车票",
                "item_list": [
                    {
                        "key": "departure_station",
                        "value": "上海站",
                        "position": [
                            126,
                            275,
                            700,
                            270,
                            700,
                            311,
                            126,
                            320
                        ],
                        "description": "出发地"
                    },
                    {
                        "key": "arrival_station",
                        "value": "北京站",
                        "position": [
                            177,
                            159,
                            1127,
                            149,
                            1127,
                            206,
                            177,
                            217
                        ],
                        "description": "目的地"
                    }
                ]
            }
        ]
    }
}

# 调用函数并打印结果
print(format_response(response))
print(1)
