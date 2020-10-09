# Crawl dữ liệu từ Foody
Mục tiêu: crawl các dữ liệu về quán ăn ở Foody bao gồm: thông tin cơ bản, thực đơn, bình luận.

Lưu ý rằng các cửa hàng ở đây đều liên kết với Now -> hỗ trợ đặt hàng online. Một số cửa hàng sẽ không xuất hiện, trong đó có các quán ăn buffet.


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

Kết quả đợt 1: bị fail khá nhiều, có thể là do một số trang bị thiếu dữ liệu. Sẽ điều chỉnh lại script sau đợt này.

Kết quả đợt 2:

### 3. Crawl menu từ now_urls.txt
Do đạt được kết quả thành công 100% ở task 1 thế nên sẽ crawl từ now thay vì crawl menu trong foody thì sử dụng luôn của Now.
