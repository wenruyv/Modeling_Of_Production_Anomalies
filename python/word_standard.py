import os
import requests
import pymysql
from typing import List, Tuple

class AnomalyClassifier:
    def __init__(self):
        # 数据库配置（建议改为从环境变量读取）
        self.db_config = {
            'host': '8.152.201.39',
            'user': 'graduate',
            'password': 'q1vieV0qO1DYVp7H',
            'database': 'fop_abn',
            'port': 3306,
            'charset': 'utf8mb4'
        }

        # 千问API配置（从环境变量读取密钥）
        self.qwen_api_key = os.getenv("DASHSCOPE_API_KEY", "sk-2098553149fc4589a0ae72cd57f0e523")  # 优先使用环境变量
        self.qwen_base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

    def get_standard_anomalies(self) -> List[str]:
        """从数据库获取最新标准异常列表"""
        connection = None
        try:
            connection = pymysql.connect(**self.db_config)
            with connection.cursor() as cursor:
                sql = "SELECT ab_level2 FROM abnormal_classify"
                cursor.execute(sql)
                result = cursor.fetchall()
                return [item[0] for item in result]
        except pymysql.MySQLError as e:
            print(f"[错误] 数据库操作失败: {str(e)}")
            return []
        except Exception as e:
            print(f"[错误] 未知异常: {str(e)}")
            return []
        finally:
            if connection:
                connection.close()

    def query_qwen(self, prompt: str) -> str:
        """调用Qwen-Plus的API"""
        headers = {
            "Authorization": f"Bearer {self.qwen_api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "qwen-plus",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0
        }

        try:
            response = requests.post(
                self.qwen_base_url,
                headers=headers,
                json=payload,
                timeout=10
            )
            response.raise_for_status()  # 自动处理4xx/5xx错误

            result = response.json()
            return result['choices'][0]['message']['content'].strip()
        except requests.exceptions.RequestException as e:
            print(f"API请求失败: {str(e)}")
            return ""
        except KeyError:
            print("API响应格式异常")
            return ""

    def standardize_description(self, user_input: str) -> Tuple[str, float]:
        """标准化描述的核心逻辑（带严格校验）"""
        standard_list = self.get_standard_anomalies()
        if not standard_list:
            return "标准列表获取失败", 0.0

        # 构建标准列表字符串（关键修改点）
        newline = '\n'
        list_str = newline.join(f'- {name}' for name in standard_list)

        # 构建prompt
        prompt = f"""请严格将用户描述对应到以下标准名称（只能选择且返回一个存在的名称），并给出语义相似度（范围0-1）：
    标准列表：
    {list_str}

    输入内容：{user_input}

    响应必须遵守格式（重要！）：
    标准名称：[此处只能填写一个存在的标准名称，禁止其他内容]
    相似度：[0-1之间的浮点数]"""

        try:
            response = self.query_qwen(prompt)

            # 严格解析响应
            lines = response.split('\n')
            if len(lines) == 2 and lines[0].startswith("标准名称：") and lines[1].startswith("相似度："):
                standard_name = lines[0].split("：", 1)[1].strip()
                similarity_str = lines[1].split("：", 1)[1].strip()
                try:
                    similarity = float(similarity_str)
                    if standard_name in standard_list and 0 <= similarity <= 1:
                        return standard_name, similarity
                except ValueError:
                    pass

            # 二次校验
            for name in standard_list:
                if name.lower() in response.lower():
                    return name, 0.0

            return "未匹配到标准异常", 0.0
        except Exception as e:
            print(f"处理异常: {str(e)}")
            return "处理失败", 0.0


if __name__ == "__main__":
    classifier = AnomalyClassifier()

    test_cases = [
        "员工腹痛请假",
        "钱款异常",
        "铁皮生锈了漏水了",
        "本月考勤记录缺失"
    ]

    for case in test_cases:
        result, similarity = classifier.standardize_description(case)
        print(f"输入：{case} -> 输出：{result}，相似度：{similarity}")