from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key="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"
)


def askChatGPT(messages):
    MODEL = "gpt-3.5-turbo"
    chat_completion = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=1)
    print(chat_completion)
    return chat_completion.choices[0].message.content


def chat(text):
    messages = [{"role": "user", "content": ""}]
    a = {"role": "user", "content": "首先，我有以下几个功能：1.文字识别2.文档识别3.图片扫描4.在线PDF转器5.pdf转word6.word转pdf7.图片转pdf，接下来我需要你完成以下内容，就是在我对你进行提问的时候你只需回答用得到这些功能或者和文字扫描相关的问题（只要相关即可，范围一定要宽松），其他没有任何关系的问题你要确认是否是和这些功能相关联的，如果实在不对就委婉告诉无法回答，如果你回答那你要根据我给你的信息直接给出操作步骤，比如说你用到了文档识别和文字识别，并且是先用了文档识别再是文字识别，那你的答案就一定要是21（2代表文档识别，1代表文字识别），再是后续你的文字解释，这是答案构成，纯数字+文字说明，上面那个例子的答案就是：21 先文档识别（2），再文字识别（1）。如果你觉得我给的信息不够全面，就可以继续问我相关问题，比如说请问您想要的的输出格式是什么样的，直到我输入测试结束才停止，可以吗"}
    messages.append(a)
    a = {"role": "assistant",
         "content": "你好，我已经明白您的要求。我会根据你提供的信息给出相关的操作步骤和解答。请问有什么问题我可以帮您解决吗？"}
    messages.append(a)
    a = {"role": "user", "content": "请问我想要将一张图片里的文字提取出来之后转化成word该怎么办"}
    messages.append(a)
    a = {"role": "assistant",
         "content": "3145"
                    "使用图片扫描功能（3）对您想要提取文字的图片进行扫描。"
                    "文字识别（1）：将扫描得到的文字进行识别，提取出文本内容。"
                    "在线word转换器（4）：使用在线PDF转换器将提取出的文本内容转化成PDF格式。"
                    "pdf转word(5):使用pdf转word将提出出来的文本内容转化成WORD格式"
                    "通过以上步骤，您可以将一张图片里的文字提取出来，并转化成PDF格式。如果您有其他问题或需要进一步帮助，请随时告诉我。"}
    messages.append(a)

    try:

        d = {"role": "user", "content": text}  # 去掉了上下文记忆功能，后期修改
        messages.append(d)
        text = askChatGPT(messages)
        return text
    except Exception as e:
        messages.pop()
        print(e)
        return 0
