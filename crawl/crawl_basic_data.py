#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re
import sys
import json
import string
import requests
import traceback
from tqdm import tqdm
from time import sleep
from bs4 import BeautifulSoup as bs

def clean_text(a):
    r = a.replace('\n', '')
    r = r.replace('\r', '')
    r = r.strip()
    r = re.sub(' +', ' ', r)
    return r

def scrape_basic_data(url):
    '''
    Get the basic data of restaurant from url

    Input: url (str)
    Output: data (dict)
    '''
    res = requests.get(url, timeout=60)
    binary_data = res.content

    # print(binary_data)
    
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
        p = pt.select('div > span.avg-txt-highlight')
        l = pt.select('div.label')

        if not l:
            continue

        l = l[0].text

        if p:
            p = p[0].text
            data['scores'][a[l]] = float(p)
        else:
            data['scores'][a[l]] = None
        
        

    # get opening and closing time
    time_tag = s.select('div.micro-timesopen > span')

    if time_tag:
        time_texts = time_tag[2].text.strip().split(' - ')

        if time_texts and len(time_texts) == 2:
            data['opening_time'] = time_texts[0]
            data['closing_time'] = time_texts[1]
        else:
            data['opening_time'] = None
            data['closing_time'] = None
    else:
        data['opening_time'] = None
        data['closing_time'] = None

    # get price min max
    price_tag = s.select('span[itemprop=priceRange]')
    if price_tag:
        price_tag = price_tag[0].text.strip().split(' - ')
        data['min_price'] = price_tag[0][:-1]
        data['max_price'] = price_tag[1][:-1]
    else:
        data['min_price'] = None
        data['max_price'] = None
    
    # get audiences
    audiences = s.select('div.audiences', limit=1)
    if audiences:
        audiences = audiences[0].text.replace('\xa0', '').replace('\r', '').replace('-', '').strip().split(',')
        data['audiences'] = audiences
    else:
        data['audiences'] = None
    
    # get cuisine
    cuisine = s.select('a.microsite-cuisine', limit=1)
    if cuisine:
        cuisine = cuisine[0].text.strip()
        data['cuisine'] = cuisine
    else:
        data['cuisine'] = None

    # get url
    data['url'] = url

    return data


if __name__ == '__main__':
    urls = []

    with open('urls.txt', 'r') as f:
        urls = f.readlines()
    
    fail_count = 0  # count consecutive failed tasks
    for i, url in enumerate(tqdm(urls)):
        url = url.replace('\n', '')
        cache_path = os.path.join('basic_data', f"{i}.json")

        if os.path.exists(cache_path):
            continue
        else:
            data = None
            try:
                data = scrape_basic_data(url)
                with open(cache_path, 'w') as f:
                    f.write(json.dumps(data, indent=4))
                
                # fail_count = 0
            except Exception as e:
                traceback.print_exc()
                sys.exit(0) 
                print(f'Failed {i} {e}')
                # fail_count += 1
            

            # if fail_count == 700:
            #     print('Fail too much ! Sleep for 3 mins.')
            #     sleep(180)
            #     continue
    

    print("Done !")
