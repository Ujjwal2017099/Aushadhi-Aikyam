# token : 6084023169:AAEqy_Vki3Jbyi5OWOyr6zZXlZ7ObOBN-0A
TOKEN = "6084023169:AAEqy_Vki3Jbyi5OWOyr6zZXlZ7ObOBN-0A"

import re, json
import bs4
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service


def get_med_data(url=None, med_container_class=None, med_name_class=None, price_bit=None, med_price_container=None, link_bit=None, link_container=None):
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])

        s = Service('./chromedriver.exe')
        driver = webdriver.Chrome(service=s, options=options)

        bad_response = 'BR'

        try:
            driver.get(url)
            soup = BeautifulSoup(driver.page_source, 'lxml')

            idx = [m.start() for m in re.finditer(r"/",url)][2]
            base_url = url[:idx]

            all_medicines_in_single_page = soup.find_all(class_ = med_container_class)
            count = 0
            res = ''

            for medicine in all_medicines_in_single_page:
                med_dict = dict()
                med_name = medicine.find_all(class_ = med_name_class)[0].contents[0]
                med_name = re.sub('\W+',' ', med_name)
                med_price = 0
                link = None
                med_price_string = ''
                if price_bit == 1:
                    price_list = medicine.find_all(id=med_price_container)[0].contents
                    for item in price_list:
                        if type(item) != bs4.element.Tag:
                            med_price_string += item
                elif price_bit == 0:
                    price_list = medicine.find_all(class_ = med_price_container)[0].contents
                    # print(price_list)
                    for item in price_list:
                        if type(item) != bs4.element.Tag:
                            med_price_string += item
                else:
                    return bad_response

                med_price = re.findall('\d*\.*\d+', med_price_string)[0]

                if link_bit == 0:
                    if link_container == med_container_class:
                        link = medicine.contents[0].get('href')
                    else:
                        link = medicine.find(class_=link_container).get('href')
                elif link_bit == 1:
                    link = medicine.find(id=link_container).get('href')
                else:
                    link = None

                link = base_url + link

                res += med_name + '\n'
                res += 'Price : ' + med_price + '\n'
                res += link + '\n\n'

                count += 1

                if count == 5:
                    break

            driver.quit()
            return res

        except:
            return bad_response



# ----------------------------------------------------------------------------

import telebot
from vision_ocr import detect_text
from pymongo import MongoClient
import json

bot = telebot.TeleBot(TOKEN, parse_mode=None) # You can set parse_mode by default. HTML or MARKDOWN

client = MongoClient("mongodb+srv://Aushadhi-Aikyam:geDYwxbBUR8YFPaS@aushadhi-aikyam.olipfgx.mongodb.net/?retryWrites=true&w=majority")

db = client.get_database('test')
records = db.links
rec_list = list(records.find())
result = ''


@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    reply = "Welcome to Aushadhi Aikyam !!!\n\n" \
            "/start : start the bot\n\n" \
            "/help : detailed instructions\n\n" \
            "Bot features :\n\n"\
            "1. Upload your prescription photo (only medicines part)\n\n" \
            "2. Type your medicine name (correct spelling) to get details on different sites \n\n" \
            "Sites included : \n" \
            "Netmeds \n1mg \nApollopharmacy \nPharmeasy \n"

    bot.reply_to(message, reply)
	# bot.reply_to(message, "Welcome to Aushadi Aikyam !!!")

@bot.message_handler(content_types=['text'])
def med_data(message):
    if message.text in ['69', 'missionary', 'doggy style', 'cowboy', 'reverse cowboy',
                        'anal', 'bj', 'rim job', 'boob job', 'foot job',
                        'fuck alok in double penetration']:

        bot.reply_to(message, "Let's do it")
        return

    bot.reply_to(message, 'Processing ....')
    name = message.text
    flag = 0
    for item in rec_list:
        url = item['url'].replace('^', name)
        med_container_class = item['mainContainer']
        med_name_class = item['container']
        bit = item['bit']
        link_bit = item['linkBit']
        med_price_container = item['priceContainer']
        link_container = item['linkContainer']


        res = get_med_data(url, med_container_class, med_name_class, bit,
                                   med_price_container, link_bit, link_container)
        if (res == 'BR' or (not len(res))):
            flag = 0
            continue

        s = item['name'] + '\n\n'
        s += res

        bot.reply_to(message, s)

        flag = 1
        if flag:
            bot.reply_to(message, 'Getting data from next site ....')

    bot.reply_to(message, 'FINISHED !!!')




@bot.message_handler(content_types=['photo'])
def ocr(message):

    raw = message.photo[3].file_id
    path = "1.jpg"
    # print(raw)
    file_info = bot.get_file(raw)
    # print(file_info)
    dwld_file = bot.download_file(file_info.file_path)
    with open(path, 'wb') as new_file:
        new_file.write(dwld_file)

    bot.reply_to(message, "Processing....")
    s = detect_text(path)
    bot.reply_to(message, s)



# bot.infinity_polling()
bot.infinity_polling(timeout=40, long_polling_timeout = 5)