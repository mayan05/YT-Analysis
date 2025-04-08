from googleapiclient.discovery import build
import pandas as pd
from urllib.parse import urlparse, parse_qs

class YTapi():   

    apikey = "AIzaSyArSGWO9fyw5-nP2nVXv2RD4gTLXNZDz4M" 

    def __init__(self):
        self.youtube = build("youtube", "v3", developerKey=YTapi.apikey)

    def get_video_id(self, url):
        parsed_url = urlparse(url)
    
        # Handle different YouTube URL formats
        if parsed_url.hostname == 'youtu.be':
            return parsed_url.path[1:]
        elif parsed_url.hostname in ('www.youtube.com', 'youtube.com'):
            if parsed_url.path == '/watch':
                query_params = parse_qs(parsed_url.query)
                return query_params.get('v', [None])[0]
            elif parsed_url.path.startswith('/embed/'):
                return parsed_url.path.split('/')[2]
            elif parsed_url.path.startswith('/v/'):
                return parsed_url.path.split('/')[2]
    
        return None
    
    def video_details(self, video_id):
        request = self.youtube.videos().list(
            part="snippet,contentDetails,statistics",
            id=video_id
        )
        response = request.execute()

        if not response["items"]:
            return None

        video_info = response["items"][0] # summary of the video info

        title = video_info["snippet"]["title"]
        published_at = video_info["snippet"]["publishedAt"]
        view_count = video_info["statistics"].get("viewCount", 0)
        like_count = video_info["statistics"].get("likeCount", 0)
        comment_count = video_info["statistics"].get("commentCount", 0)
        
        return {
            "video_id": video_id,
            "title": title,
            "published_at": published_at,
            "views": view_count,
            "likes": like_count,
            "comments": comment_count,
        }

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