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
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

if __name__ == '__main__':
    # start web driver
    options = webdriver.ChromeOptions()
    options.headless = True
    driver = webdriver.Chrome(options=options)
    print("Driver is started !")

    urls = []

    with open('now_urls.txt', 'r') as f:
        urls = f.readlines()

    init = 3000
    end = 3210

    for i, url in enumerate(tqdm(urls[init:end], initial=init, total=len(urls))):
        cache_path = os.path.join('menu_html_cache', f"{i+init}.html")

        if os.path.exists(cache_path):
            continue
        try:
            driver.get(url)
            # element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "delivery-footer-logo")))
            sleep(10)

            with open(cache_path, 'w') as f:
                f.write(driver.page_source)
        except:
            traceback.print_exc()
            driver.close()
            break

    driver.close()
    # sleep(5)
    sys.exit(0)
