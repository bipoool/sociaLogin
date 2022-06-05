from fastapi import FastAPI
import requests

app = FastAPI()

clientKey = "sRpm0gblXKfqL1U_B57KdSZvQOJgG4GM_kU_uUGbW_Y"
getImageUrl = getPhotoUrl = "https://api.unsplash.com/photos?client_id="+clientKey+"&per_page=50&page=2"
searchPhotoUrl = "https://api.unsplash.com/search/photos?client_id="+clientKey+"&per_page=30&query="

@app.get('/getImages')
async def hello():
    header = {
        'Content-Type': 'application/json'
    }
    res = requests.get(getImageUrl, headers=header)
    data = res.json()
    return data

@app.get('/searchImg/{query}')
async def hello(query: str):
    header = {
        'Content-Type': 'application/json'
    }
    res = requests.get(searchPhotoUrl+query, headers=header)
    data = res.json()
    return data