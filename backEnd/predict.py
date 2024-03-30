import torch
from torchvision import transforms
from PIL import Image
from module import *


def predict(image_path):
    model, params = get_model(8)

    # 加载模型参数
    model.load_state_dict(torch.load(
        '/home/walkiiiy/tests/img_classify-master - 副本/best_model.h5', map_location=torch.device('cpu')))

    # 读取图片
    image = Image.open(image_path)

    # 定义预处理操作，使输入图片与训练数据一致
    transform = transforms.Compose([
        transforms.Resize((256, 256)),  # 调整大小
        transforms.ToTensor(),  # 转换为Tensor
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[
            0.229, 0.224, 0.225])  # 标准化
    ])

    # 对图片进行预处理
    input_image = transform(image).unsqueeze(0)  # 添加batch维度

    model.eval()  # 切换到评估模式

    with torch.no_grad():
        outputs = model(input_image)
        _, predicted = torch.max(outputs, 1)
    return predicted.item()
    # predicted即为模型的预测结果
