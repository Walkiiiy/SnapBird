A demo app for image processing.
#### 正在对接功能
* √ 通用文字识别：通过前沿的深度学习技术，对各种表格，图片，文档、证件、面单等多种通用场景进行快速、精准的检测和识别，支持简体中文/繁体中文/英文/数字/西欧主流语言/东欧主流语言等共52种语言，同时支持印刷体、手写体、倾斜、折叠、旋转等。
* √ 通用表格识别：支持识别图片/PDF格式文档中的表格内容，包括有线表格、无线表格、合并单元格表格，同时支持单张图片内的多个表格内容识别，返回各表格的表头表尾内容、单元格文字内容及其行列位置信息。
* 通用国内票据识别：支持对多种票据类型（多票据）进行票据切分、票据分类、票据识别，同时支持在混贴报销场景下对多种票据检测以及关键信息提取，当前支持27种票据类型。
* √ 图像切边增强：智能判断照片中主体文档的边缘进行切边，同时增强图像突出文字，支持识别背景复杂的文字内容，返回切边后的图像。
* ps检测：基于自研篡改检测系统，判断图片是否被篡改，支持包含身份证、护照、驾驶证、行驶证、教师资格证，港澳通行证、海外身份证等证照，及增值税发票、普通发票、小票、合同等文档。 
* √ 图片转word：图片版面还原，把图片还原为doc文件，保留照片中文档的版面格式的同时，提取图片中的文字，包含表格图片、手写文字，并支持印章单独提取，实现印章的提取，分离和还原等功能。
* √ pdf转word：提供高并发高可靠的API，将PDF文档转换为Word。转换出的文件尽可能保持PDF原有格式，强化易读性。
* √ pdf转excel：提供高并发高可靠的API，将PDF文档转换为Excel。转换出的文件尽可能保持PDF原有格式，强化易读性。
* √ PDF转PPT：提供高并发高可靠的API，将PDF文档转换为PPT。转换出的文件尽可能保持PDF原有格式，强化易读性。
* √ PDF转图片：提供高并发高可靠的API，将PDF文档转换为图片。转换出的文件尽可能保持PDF原有格式，强化易读性。
* √ Word转PDF：提供高并发高可靠的API，将Word文档转换为PDF。转换出的文件尽可能保持Word原有格式，强化易读性。
* √ Excel转PDF：提供高并发高可靠的API，将Excel文档转换为PDF。转换出的文件尽可能保持Excel原有格式，强化易读性。
* √ 图片转PDF：提供高并发高可靠的API，将图片文档转换为PDF。转换出的文件尽可能保持图片原有格式，强化易读性。
* √ Word转图片：提供高并发高可靠的API，将Word文档转换为图片。转换出的文件尽可能保持Word文档原有格式，强化易读性。
  
### bugs:
* 中文文件名丢失
* 并发性问题