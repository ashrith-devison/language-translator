from googletrans import Translator, LANGUAGES
import sys
def translate_to_english(text):
    translator = Translator()
    detected = translator.detect(text)
    #   
    translation = translator.translate(text, dest='en')
    return translation.text

def main():
    telugu_text = sys.argv[1]
    telugu_text = telugu_text.encode().decode('unicode_escape')
    english_text = translate_to_english(telugu_text)
    print(english_text)

if __name__ == "__main__":
    main()

