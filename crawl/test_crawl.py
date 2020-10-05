import os
import re
import json
import string
import requests
from selenium import webdriver
from bs4 import BeautifulSoup as bs


def clean_text(a):
    r = a.replace('\n', '')
    r = r.replace('\r', '')
    r = r.strip()
    r = re.sub(' +', ' ', r)
    return r

def scrape_basic_data(url, force=False):
    binary_data = None

    if not os.path.exists('basic_cache.html') or force:
        res = requests.get(url, verify=False)
        binary_data = res.content

        with open('basic_cache.html', 'wb') as f:
            f.write(binary_data)
    else:
        with open('basic_cache.html', 'rb') as f:
            binary_data = f.read()
    
    data = {}
    s = bs(binary_data, 'html.parser')

    # Get name
    name = s.select('div.main-info-title > h1[itemprop=name]', limit=1)
    if name:
        data['name'] = name[0].text
    else:
        data['name'] = None

    # Get address
    address = s.select('div.res-common-add > span')
    if address:
        address = ' '.join((a.text for a in address))
        address = clean_text(address)

        data['address'] = address
    else:
        data['address'] = None

    # Get category
    category = s.select('div.category-items > a')
    if category:
        data['category'] = category[0].text
    else:
        data['category'] = None

    data['scores'] = {}
    # Get average score
    avg_score = s.select('div.microsite-point-avg[itemprop=ratingValue]')
    if avg_score:
        data['scores']['avg_score'] = float(avg_score[0].text)
    else:
        data['scores']['avg_score'] = None

    # Get review_count
    review_count = s.select('div.microsite-review-count[itemprop=reviewCount]')
    if review_count:
        data['review_count'] = int(review_count[0].text)
    else:
        data['review_count'] = None
    
    # Get specific points
    point_tags = s.select('div.microsite-top-points')

    a = {
        'Vị trí': 'location',
        'Chất lượng': 'quality',
        'Không gian': 'space',
        'Giá cả': 'price',
        'Phục vụ': 'service'
    }

    for pt in point_tags:
        p = pt.select('div > span.avg-txt-highlight')[0].text
        l = pt.select('div.label')[0].text

        data['scores'][a[l]] = float(p)

    # get opening and closing time
    time_tag = s.select('div.micro-timesopen > span')[2]
    time_texts = time_tag.text.strip().split(' - ')

    data['opening_time'] = time_texts[0]
    data['closing_time'] = time_texts[1]

    # get price min max
    price_tag = s.select('span[itemprop=priceRange]')[0]
    price_tag = price_tag.text.strip().split(' - ')

    data['min_price'] = price_tag[0][:-1]
    data['max_price'] = price_tag[1][:-1]

    # get audiences
    audiences = s.select('div.audiences', limit=1)[0].text

    audiences = audiences.replace('\xa0', '').replace('\r', '').replace('-', '').strip().split(',')

    data['audiences'] = audiences

    # get cuisine
    cuisine = s.select('a.microsite-cuisine', limit=1)[0].text.strip()

    data['cuisine'] = cuisine

    # get url
    data['url'] = url

    return data


def scrape_meny_data(url):

    return {}

if __name__ == '__main__':

    # url = 'https://www.foody.vn/ha-noi/buffet-poseidon-seafood-bbq-hotpot-buffet'
    url = 'https://www.foody.vn/ha-noi/thien-an-ga-met-ga-khong-loi-thoat'    

    basic_data = scrape_basic_data(url, force=True)

    data = basic_data

    print(data)

    with open('test_data.json', 'w+', encoding='utf-8') as f:
        f.write(json.dumps(data, indent=4))

    print('Done!')
