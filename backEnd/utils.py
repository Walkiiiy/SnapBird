import os


def is_image(filename):
    # 定义一个图片扩展名列表
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    # 获取文件的扩展名
    extension = os.path.splitext(filename)[1].lower()
    # 判断文件的扩展名是否在有效扩展名列表中
    return extension in valid_extensions


def determine_file_type(filename):
    # 文件类型映射
    file_type_map = {
        'images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'],
        'ppt': ['.ppt', '.pptx'],
        'pdf': ['.pdf'],
        'word': ['.doc', '.docx'],
        'excel': ['.xls', '.xlsx', '.csv']
    }

    # 获取文件的扩展名（转换为小写）
    _, extension = os.path.splitext(filename)
    extension = extension.lower()

    # 遍历映射来决定文件类型
    for file_type, extensions in file_type_map.items():
        if extension in extensions:
            return file_type

    return 'unknown'  # 如果没有匹配的类型，则返回'unknown'
