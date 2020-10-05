# Crawl dữ liệu từ Foody

## Tasks

### 1. Từ link now của Đạt, chuyển về link Foody và validate
Đầu vào: file now_urls.txt (3210 lines)
Đầu ra: file urls.txt

Chạy script `python convert_url.py`

Kết quả: 100% urls đều ok

### 2. Crawl basic data từ urls.txt
Đầu vào: urls.txt
Đầu ra: basic_data/<int:id>.json

id ở đây là index dòng ở trong urls.txt. Nếu đã có file ở trong basic_data rồi thì skip.

Chạy script `python crawl_basic_data.py`



