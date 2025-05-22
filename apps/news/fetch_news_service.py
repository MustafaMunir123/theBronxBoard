import requests
import random
import urllib.parse
import os
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv('NEWS_API_KEY')


# List of keywords related to Bronx
bronx_keywords = [
    "crime",
    "shot",
    "shooting",
    "colleg%20crime",
    "school%20crime",
    "disturbing",
    "kills",
    "killed",
    "gang",
    "gangs",
    "harassment",
    "stab"
]

def fetch_news():
    selected_keywords = random.choice(bronx_keywords)
    search_query = urllib.parse.quote(f"bronx {selected_keywords}")
    url = f"https://api.thenewsapi.com/v1/news/all?api_token={NEWS_API_KEY}&language=en&search={search_query}&limit=3&search_fields=title,keywords,description"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        structured_news = []

        for item in data.get('data', []):
            structured_news.append({
                'external_uuid': item.get('uuid'),
                'title': item.get('title'),
                'description': item.get('description'),
                'keywords': item.get('keywords'),
                'snippet': item.get('snippet'),
                'url': item.get('url'),
                'image_url': item.get('image_url'),
                'published_at': item.get('published_at'),
                'source': item.get('source'),
                'categories': item.get('categories'),
            })
        return structured_news
    else:
        return []