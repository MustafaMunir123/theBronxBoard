import requests
import random
import urllib.parse
from dotenv import load_dotenv
from apps.ai_templates import NEWS_LESSONS_PROMPT 
from apps.ai_utility import get_ai_response
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
import time



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
    url = f"https://api.thenewsapi.com/v1/news/all?api_token={settings.NEWS_API_KEY}&language=en&search={search_query}&limit=3&search_fields=title,keywords,description"
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
        if not structured_news:
            return []
        return structured_news
    else:
        return []
    
def generate_lessons_from_news():
    prompt=NEWS_LESSONS_PROMPT[:]
    news_list = fetch_news()

    if len(news_list) < 2:
        print("hi")
        print(news_list)
        news = news_list[0]
    else:
        print("bye")
        news = news_list[random.randint(0, len(news_list)-1)]
    prompt = prompt.format(NEWS=news)
    retries = 3
    response = None
    last_exception = None

    while retries > 0 and response is None:
        try:
            response = get_ai_response(content=prompt)
            # if len(response) < 12:
            #     raise ValueError("0")
            break
        except Exception as ex:
            response = None
            print(f"Exception occurred: {ex}")
            last_exception = ex
            retries -= 1
            if retries > 0:
                print("Retrying...")
            else:
                print("All retries exhausted.")
            time.sleep(1)
    if response is None and last_exception:
        return Response({
            "success": False,
            "message": "Unable to generate news."
        }, status=status.HTTP_400_BAD_REQUEST)
    return response,news
    