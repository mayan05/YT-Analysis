from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from YoutubeAPI import YTapi
import logging

app = FastAPI()
yt_api = YTapi()

class URLreq(BaseModel):
    url: str

@app.post("/video")
async def analyze(url_request: URLreq):
    logging.info(f"Received URL: {url_request.url}")
    video_id = yt_api.get_video_id(url_request.url)
    if not video_id:
        logging.error("Invalid YouTube URL")
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")
    
    response = {"video_id": video_id}
    logging.info(f"Response: {response}")
    return response