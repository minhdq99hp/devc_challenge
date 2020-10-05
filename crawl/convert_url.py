'''
Convert Now url to Foody url and validate it

Input: now_urls.txt
Output: urls.txt

Author: minhdq99hp@gmail.com
'''
import os
import sys
import requests
from tqdm import tqdm


if __name__ == '__main__':
    now_urls = []
    urls = []

    with open('now_urls.txt', 'r') as f:
        now_urls = f.readlines()
    
    if os.path.exists('urls.txt'):
        with open('urls.txt', 'r') as f:
            urls = f.readlines()
    
    for url in tqdm(now_urls):
        foody_url = url.replace('now.vn', 'foody.vn')

        if foody_url in urls:
            continue

        try:
            res = requests.head(foody_url, timeout=20)

            if res.status_code not in (400, 200):
                print(foody_url, res.status_code)

                continue
        except requests.exceptions.RequestException as e:
            print(foody_url, e)
            continue

        urls.append(foody_url)  
    
    with open('urls.txt', 'w') as f:
        f.writelines(urls)
    
    print(f"Done ! {len(urls)}/{len(now_urls)}")

