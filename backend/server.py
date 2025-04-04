from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from YoutubeAPI import YTapi
import logging

app = FastAPI()
yt_api = YTapi()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

@app.post("/video")
async def analyze(url_request: URLRequest):
    video_id = yt_api.get_video_id(url_request.url)
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")
    details = yt_api.video_details(video_id)
    if not details:
        raise HTTPException(status_code=400, detail="Could not fetch Video Details!")

    raw_date = details.get("published_at", "")
    if raw_date:
        try:
            dt = datetime.strptime(raw_date, "%Y-%m-%dT%H:%M:%SZ")
            formatted_date = dt.strftime("%d %B, %Y")
            details["published_at"] = formatted_date
        except ValueError:
            pass 

    return details
