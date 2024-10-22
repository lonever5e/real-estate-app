import sys
import google.generativeai as genai
import os
import markdown

def chatbot_response(message):
    # Simple chatbot logic (replace with your chatbot code)

    genai.configure(api_key="AIzaSyCBtigNgIosct5IvxmVXPmCv7bYyO0ZiAg")

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Tell all you know about such as facilities, famous places in the area of" + message)
    html_output = markdown.markdown(response.text)
    return html_output

if __name__ == "__main__":
    user_message = sys.argv[1]
    response = chatbot_response(user_message)
    print(response.encode('utf-8').decode('utf-8'))