from openai import OpenAI
from GPT.key import getKey
# 文件栏是否为空在给出完整步骤后由后端执行
# 格式正确性判断在给出完整步骤后由后端执行
# 无上下文
api_base = "https://pro.aiskt.com/v1"
client = OpenAI(api_key=getKey(), base_url=api_base)


def askChatGPT(messages):
    MODEL = "gpt-4-1106-preview"
    chat_completion = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=1)
    return chat_completion.choices[0].message.content


def chat(text):
    f = open("GPT/preSet.txt", 'r')
    preSet = f.read()
    f.close()

    messages = [{"role": "user", "content": ""}]
    a = {"role": "user", "content": preSet}
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
