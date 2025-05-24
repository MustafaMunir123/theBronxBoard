import requests
import json
from django.conf import settings

def extract_json_from_response(response_text: str):
    """
    Extracts JSON from a response that may contain Markdown-like code fences.
    """

    match = re.search(r"```(.*?)```", response_text, re.DOTALL)
    if match:
        json_str = match.group(1).strip()
    else:
        # If no code fences, assume the whole text is JSON
        json_str = response_text.strip()
    
    try:
        data = json.loads(json_str)
        return data
    except json.JSONDecodeError as e:
        print("JSON decode error:", e)
        return None

def get_ai_response(content: str) -> str | None:
    try:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings.GROK_TOKEN}"
        }
        
        payload = {
            "model": "meta-llama/llama-4-scout-17b-16e-instruct",
            "messages": [
                {
                    "role": "system",
                    "content": "An Assitent that follows user instructions and returns json reponse."
                },
                {
                    "role": "user",
                    "content": content
                }
            ]
        }
        
        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            ai_reply = data["choices"][0]["message"]["content"]
            if "json" in ai_reply or "Json" in ai_reply or "JSON" in ai_reply:
                ai_reply = ai_reply.replace('json', '')

            parsed_json = extract_json_from_response(response)
            return parsed_json.strip()
        else:
            None
    except Exception as ex:
        print(ex)
        return None