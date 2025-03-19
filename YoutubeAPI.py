from googleapiclient.discovery import build
import pandas as pd
from urllib.parse import urlparse, parse_qs

class YoutubeAPI:   

    apikey = "AIzaSyArSGWO9fyw5-nP2nXVx2RD4gTLXNZDz4M" 

    def __init__(self):
        self.youtube = build("youtube", "v3", developerKey=YoutubeAPI.apikey)

    def get_video_id(url):
        parsed_url = urlparse(url)
    
    # Handle different YouTube URL formats
        if parsed_url.hostname == 'youtu.be': # For shortened URLs like https://youtu.be/VIDEO_ID
        
            return parsed_url.path[1:]
        elif parsed_url.hostname in ('www.youtube.com', 'youtube.com'):
            if parsed_url.path == '/watch':
            # For standard URLs like https://www.youtube.com/watch?v=VIDEO_ID
                query_params = parse_qs(parsed_url.query)
                return query_params.get('v', [None])[0]
            elif parsed_url.path.startswith('/embed/'):
            # For embedded URLs like https://www.youtube.com/embed/VIDEO_ID
                return parsed_url.path.split('/')[2]
            elif parsed_url.path.startswith('/v/'):
            # For legacy URLs like https://www.youtube.com/v/VIDEO_ID
                return parsed_url.path.split('/')[2]
    
        return None

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
    