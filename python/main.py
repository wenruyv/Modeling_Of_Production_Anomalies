from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from word_standard import AnomalyClassifier  # 替换为实际模块名

app = FastAPI()

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制为前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StandardizeRequest(BaseModel):
    user_input: str


classifier = AnomalyClassifier()


@app.post("/api/standardize")
async def standardize_anomaly(request: StandardizeRequest):
    try:
        result, similarity = classifier.standardize_description(request.user_input)
        return {
            "status": "success",
            "data": {
                "original": request.user_input,
                "standardized": result,
                "similarity": similarity
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }