# Open-Study-Server

## MongoDB 삽질 기록

Collection 생성하기

```
db.createCollection('user', collectionOptions)
```

Collection에서 Unique Field 지정하기

```
db.collection('user').createIndex({"email":1, "nickname": 1}, {unique:true})
```
