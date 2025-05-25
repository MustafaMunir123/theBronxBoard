PREGNANCY_PREVENTION_QUESTIONS = """
Generate 12 knowledge based questions and their answers on topic: `PREGNANCY_PREVENTION` for middle school students from following links: 1=> https://www.nyc.gov/assets/opportunity/pdf/policybriefs/teen-pregnancy-brief.pdf?utm_source=chatgpt.com 2=> https://www.mmcc.org/pregnancy-prevention-program/ 3=> https://www.childrensaidnyc.org/programs/carrera-adolescent-pregnancy-prevention?utm_source=chatgpt.com. 
Return answer in a json list of objects like: [{}, {}], do not provide anything else other than json.
"""

YOUTH_CRIME_GANG_PREVENTION_QUESTIONS = """
Generate 12 questions and their answers on topic: `YOUTH_CRIME_GANG_PREVENTION` for middle school students from following links: 1=> https://infohub.nyced.org/in-our-schools/programs/gang-prevention-and-intervention?utm_source=chatgpt.com  2=> https://goodshepherds.org/program/brag/?utm_source=chatgpt.com  3=> https://www.innovatingjustice.org/program/save-our-streets-s-o-s/?utm_source=chatgpt.com.
Return answer in a json list of objects like: [{}, {}], do not provide anything else other than json.
"""

LEGAL_LITERACY_CIVIC_EDUCATION_QUESTIONS = """
Generate 12 knowledge based questions and their answers on topic: `LEGAL_LITERACY_CIVIC_EDUCATION` for middle school students from following links: 1=> https://www.bronxlgj.org/about?utm_source=chatgpt.com 2=> https://www.chslsj.org/our-education-design?utm_source=chatgpt.com 3=> https://jrcnyc.org/site/law-enforcement-academy/?utm_source=chatgpt.com. 
Return answer in a json list of objects like: [{}, {}], do not provide anything else other than json.
"""

NEWS_LESSONS_PROMPT="""###############NEWS=====>{NEWS}.. ############.You are tasked with analyzing above crime news and creating engaging `lesson` for teens and kids. Your goal is to teach important values and safety awareness based on above news provided. Format the output with:\n\nA brief `lesson` of the news story. Return answer in a json format like: {{ `lesson`: <LESSON>}}, only return lesson key-value pair in json.
"""

SCORE_PROMPT = """#####Questions=> {QUESTION} ### \n#####Actual-Answer=> {ACTUAL_ANSWER} ###\n#####Students-Answer=> {STUDENTS_ANSWER} ###\ncompare Student-Answer with Actual-Answer and assign score out of 5 in format like: {{'score': <SCORE>}}, do not include word json in response and only return valid json with double quotes."""