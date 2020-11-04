#GUIDE

Hướng dẫn cài đặt project tại máy local.

## Clone project github

https://github.com/anhhajilo09/bai2_congnghemoi_nguyenngocha_17074451.git

```bash
git clone https://github.com/anhhajilo09/bai2_congnghemoi_nguyenngocha_17074451.git
```

## Install

```bash
cd bai2_congnghemoi_nguyenngocha_17074451

npm install
```
## Config IAM AWS

Chỉnh sửa đoạn sau trong file theo path sau services/products.js
```bash
aws.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-southeast-1"
})
```

## Config Dynamodb

Truy cập Aws dynamodb tạo Table Products
```bash
primary key {name: id, type: NUMBER}
```

Add Item
```bash
[{
        "id": 1,
        "title": "Samsung J2 Pro",
        "image": "1.jpg",
        "price": 100
    },
    {
        "id": 2,
        "title": "HP Notebook",
        "image": "2.jpg",
        "price": 299
    },
    {
        "id": 3,
        "title": "Panasonic T44 Lite",
        "image": "3.jpg",
        "price": 125
    },
    {
        "id": 4,
        "title": "Wrist Watch",
        "image": "4.jpg",
        "price": 85
    }
]
```

## Run project
```bash
npm start
```
## Access URL
```bash
http://localhost:3000/
```
#DEMO ONLINE
```bash
http://hanguyen.website/
```
