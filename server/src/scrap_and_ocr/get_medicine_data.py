'''
# Extracting numeric (float) from a string
re.findall('\d*\.*\d+', s_net)

s = '13'
s_net = '10.75'

re.findall('\d*\.*\d+', s)
['13']
re.findall('\d*\.*\d+', s_net)
['10.75']

BIT setup :
for class : 0
for id : 1
'''

from pprint import pprint
import re

import bs4
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

s=Service('./chromedriver.exe')
driver = webdriver.Chrome(service=s)


def get_med_data(url=None, med_container_class=None, med_name_class=None, bit=None, med_price_container=None):
    med_dict = dict()

    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'lxml')

    all_medicines_in_single_page = soup.find_all(class_ = med_container_class)

    for medicine in all_medicines_in_single_page:
        med_name = medicine.find_all(class_ = med_name_class)[0].contents[0]
        med_price = 0
        med_price_string = ''
        if bit == 1:
            price_list = medicine.find_all(id=med_price_container)[0].contents
            for item in price_list:
                if type(item) != bs4.element.Tag:
                    med_price_string += item
        elif bit == 0:
            price_list = medicine.find_all(class_ = med_price_container)[0].contents
            for item in price_list:
                if type(item) != bs4.element.Tag:
                    med_price_string += item
        else:
            return {"Bad Response" : 404}

        med_price = float(re.findall('\d*\.*\d+', med_price_string)[0])

        med_dict[med_name] = med_price

    # pprint(med_dict)
    return med_dict



# # netmeds
# bit = 1
# url = 'https://www.netmeds.com/catalogsearch/result/calpol/all'
# med_container_class = 'cat-item'
# med_name_class = 'clsgetname'
# med_price_id = 'final_price'
#
# # 1mg
# bit = 0
# url = 'https://www.1mg.com/search/all?name=calpol'
# med_container_class = 'style__horizontal-card___1Zwmt style__height-158___1XIvD'
# med_name_class = 'style__pro-title___3zxNC'
# med_price_class = 'style__price-tag___B2csA'
#
# # apollopharmacy
# bit = 0
# url = 'https://www.apollopharmacy.in/search-medicines/calpol'
# med_container_class = 'ProductCard_productCard__qjji7'
# med_name_class = "ProductCard_productName__f82e9"
# med_price_class = 'ProductCard_priceGroup__V3kKR'
#
# # pharmeasy
# bit = 0
# url = 'https://pharmeasy.in/search/all?name=calpol'
# med_container_class = 'ProductCard_medicineUnitContentWrapper__8thFe'
# med_name_class = "ProductCard_medicineName__8Ydfq"
# med_price_class = 'ProductCard_ourPrice__yDytt'
#
# # For class
# pprint(get_med_data(url, med_container_class, med_name_class, bit, med_price_container))
#
# # For id
# pprint(get_med_data(url, med_container_class, bit, med_price_container))