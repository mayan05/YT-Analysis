from googleapiclient.discovery import build
import pandas as pd

class YoutubeAPI:   

    apikey = "AIzaSyArSGWO9fyw5-nP2nXVx2RD4gTLXNZDz4M" 

    def __init__(self):
        self.youtube = build("youtube", "v3", developerKey=YoutubeAPI.apikey)

    def get_video_id(self, url):
        return url.split("v=")[1]

    def get_youtube_comments(self, video_id, max_results=50):
        
        comments = []
        Likes = []
        next_page_token = None

        while True:
            request = self.youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                maxResults=max_results,
                pageToken=next_page_token
            )
            response = request.execute()

            for item in response["items"]:
                comment = item["snippet"]["topLevelComment"]["snippet"]
                likeCount = comment['likeCount']
                comments.append(comment["textDisplay"])
                Likes.append(likeCount)

            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break

        df = pd.DataFrame({'Comments': comments, 'Likes': Likes})
        return df
    