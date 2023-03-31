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

import re, json
import bs4
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service


def get_med_data(url=None, med_container_class=None, med_name_class=None, price_bit=None, med_price_container=None, link_bit=None, link_container=None):
    s = Service('./chromedriver.exe')
    driver = webdriver.Chrome(service=s)

    bad_response = json.dumps([dict({"B_R": 404})])

    res_list = list()

    try:
        driver.get(url)
        soup = BeautifulSoup(driver.page_source, 'lxml')

        idx = [m.start() for m in re.finditer(r"/",url)][2]
        base_url = url[:idx]

        all_medicines_in_single_page = soup.find_all(class_ = med_container_class)
        count = 0

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
                for item in price_list:
                    if type(item) != bs4.element.Tag:
                        med_price_string += item
            else:
                return bad_response

            med_price = float(re.findall('\d*\.*\d+', med_price_string)[0])

            if link_bit == 0:
                if link_container == med_container_class:
                    link = medicine.contents[0].get('href')
                else:
                    link = medicine.find(class_=link_container).get('href')
            elif link_bit == 1:
                link = medicine.find(id=link_container).get('href')
            else:
                link = None


            # med_dict[med_name] = med_price
            med_dict['name'] = med_name
            med_dict['price'] = med_price
            med_dict['link'] = base_url+link

            res_list.append(med_dict)

            count += 1

            if count == 5:
                break

        # pprint(med_dict)
        driver.quit()
        return json.dumps(res_list)

    except:
        driver.quit()
        return bad_response



# # netmeds
# bit = 1
# url = 'https://www.netmeds.com/catalogsearch/result/calpol/all'
# med_container_class = 'cat-item'
# med_name_class = 'clsgetname'
# med_price_container = 'final_price'
# link_bit = 0
# link_container = 'category_name'
# medicine.find(class_=link_container_class).get('href')

#
# # 1mg
# bit = 0
# url = 'https://www.1mg.com/search/all?name=calpol'
# med_container_class = 'style__horizontal-card___1Zwmt style__height-158___1XIvD'
# med_name_class = 'style__pro-title___3zxNC'
# med_price_container = 'style__price-tag___B2csA'
# link_bit = 0
# link_container = 'style__horizontal-card___1Zwmt style__height-158___1XIvD'
# medicine.contents[0].get('href')

#
# # apollopharmacy
# bit = 0
# url = 'https://www.apollopharmacy.in/search-medicines/calpol'
# med_container_class = 'ProductCard_productCard__qjji7'
# med_name_class = "ProductCard_productName__f82e9"
# med_price_container = 'ProductCard_priceGroup__V3kKR'
# link_bit = 0
# link_container = 'ProductCard_proDesMain__LWq_f'
#
# # pharmeasy
# bit = 0
# url = 'https://pharmeasy.in/search/all?name=calpol'
# med_container_class = 'ProductCard_medicineUnitContainer__cBkHl'
# med_name_class = "ProductCard_medicineName__8Ydfq"
# med_price_container = 'ProductCard_striked__jkSiD'
# link_bit = 0
# link_container = 'ProductCard_medicineUnitWrapper__eoLpy ProductCard_defaultWrapper__nxV0R'
#

# # For id
# get_med_data(url, med_container_class, med_name_class, bit, med_price_container, link_bit, link_container)

# # For class
# get_med_data(url, med_container_class, med_name_class, bit, med_price_container, link_bit, link_container)