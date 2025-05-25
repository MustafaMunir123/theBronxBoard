import json
import re

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

# Example usage
response = (
    "{\"score\": 4}"
    )
 #"[\n  {\n    \"question\": \"What is the main goal of the Carrera Adolescent Pregnancy Prevention program?\",\n    \"answer\": \"The main goal of the Carrera program is to prevent adolescent pregnancy through education, counseling, and support services.\"\n  },\n  {\n    \"question\": \"According to the NYC Opportunity report, what is one of the most effective ways to prevent teen pregnancy?\",\n    \"answer\": \"One of the most effective ways to prevent teen pregnancy is through education and access to contraception.\"\n  },\n  {\n    \"question\": \"What does the Pregnancy Prevention Program at MMCC aim to achieve?\",\n    \"answer\": \"The Pregnancy Prevention Program at MMCC aims to prevent unintended pregnancies among adolescents and young adults by providing education, counseling, and resources.\"\n  },\n  {\n    \"question\": \"What is a key component of the Carrera program's approach to preventing adolescent pregnancy?\",\n    \"answer\": \"A key component of the Carrera program's approach is providing young people with the knowledge, skills, and support they need to make informed decisions about their health and well-being.\"\n  },\n  {\n    \"question\": \"According to the NYC Opportunity report, what percentage of teen mothers live in poverty?\",\n    \"answer\": \"According to the report, about 44% of teen mothers live in poverty.\"\n  },\n  {\n    \"question\": \"What kind of services does the Carrera program provide to adolescents?\",\n    \"answer\": \"The Carrera program provides a range of services, including education, counseling, and support services, to help adolescents prevent pregnancy and achieve their goals.\"\n  },\n  {\n    \"question\": \"What is the goal of providing education and resources on reproductive health to adolescents?\",\n    \"answer\": \"The goal is to empower them with the knowledge and skills necessary to make informed decisions about their health, relationships, and futures.\"\n  },\n  {\n    \"question\": \"How does the MMCC Pregnancy Prevention Program work to prevent unintended pregnancies?\",\n    \"answer\": \"The program works by providing adolescents and young adults with education, counseling, and resources to help them prevent unintended pregnancies.\"\n  },\n  {\n    \"question\": \"What are some long-term benefits of preventing adolescent pregnancy?\",\n    \"answer\": \"Some long-term benefits include increased educational attainment, economic stability, and improved health outcomes for both mothers and children.\"\n  },\n  {\n    \"question\": \"What kind of impact does the Carrera program aim to have on the lives of adolescents?\",\n    \"answer\": \"The Carrera program aims to have a positive impact on the lives of adolescents by helping them prevent pregnancy, achieve their educational and career goals, and build healthy relationships.\"\n  },\n  {\n    \"question\": \"Why is it important to provide adolescents with access to comprehensive reproductive health education?\",\n    \"answer\": \"It is important because it helps them develop the knowledge, attitudes, and skills necessary to make informed decisions about their health and well-being.\"\n  },\n  {\n    \"question\": \"What is one way that the Carrera program helps adolescents achieve their goals?\",\n    \"answer\": \"One way is by providing them with the support and resources they need to prevent pregnancy and succeed in school and life.\"\n  }\n]"
response = response.lower()
if "json" in response:
    response = response.replace('json', '')

parsed_json = extract_json_from_response(response)
print(parsed_json['score'])
