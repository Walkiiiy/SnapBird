import os


def determine_file_type(filename):
    # 文件类型映射
    file_type_map = {
        'images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'],
        'ppt': ['.ppt', '.pptx'],
        'pdf': ['.pdf'],
        'word': ['.doc', '.docx'],
        'excel': ['.xls', '.xlsx', '.csv']
    }

    # 特殊情况处理：当文件名就是扩展名时（如“.pdf”）
    if filename.startswith(".") and os.path.splitext(filename)[1] == "":
        extension = filename  # 在这种情况下，整个字符串都是“扩展名”
    else:
        # 获取文件的扩展名（转换为小写）
        _, extension = os.path.splitext(filename)
        extension = extension.lower()

    # 遍历映射来决定文件类型
    for file_type, extensions in file_type_map.items():
        if extension in extensions:
            return file_type

    return 'unknown'  # 如果没有匹配的类型，则返回'unknown'
