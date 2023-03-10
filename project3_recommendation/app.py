from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from pandas import DataFrame
import pymongo
# import cv2
import numpy as np
from sklearn.metrics.pairwise import pairwise_distances
from bson.objectid import ObjectId
# import jsonpickle
import json
import urllib

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return jsonify({"name" : "Hello, Flask!"})


# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# mydb = myclient["project3"]
# mycollection= mydb["products"]
# cursor = mycollection.find()
# list_cur = list(cursor)
# df = DataFrame(list_cur)
# df.to_csv('./data.csv')
df = pd.read_csv("./data/data.csv")
# download image by url
# for i in df.index:
    # urllib.request.urlretrieve(df.iloc[i]['image'], "./images/"+ str(i) + ".jpg")


# Calcule DIstance Matriz

df_embs = pd.read_csv('./data/embeddings1.csv')
cosine_sim = 1-pairwise_distances(df_embs, metric='cosine')

# from numpy import genfromtxt
# cosine_sim = genfromtxt('./data/cosine_sim10.csv', delimiter=',')
# cosine_sim = pd.read_csv('./data/cosine_sim10.csv')
# print(cosine_sim[:4, :4])

indices = pd.Series(range(len(df)), index=df.index)

@app.route("/product/get_recommender", methods=["POST"])
# Function that get movie recommendations based on the cosine similarity score of movie genres

def get_recommender(top_n = 4):
    id = request.get_json()
    idx = df[df['id'] == int(id['idImage'])].index.values
    
    sim_idx    = indices[idx[0]]
    sim_scores = list(enumerate(cosine_sim[sim_idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n+1]
    idx_rec    = [i[0] for i in sim_scores]
    res = indices.iloc[idx_rec].index
    result = []
    for i in res: 
        i = df.iloc[i]
        product = {
            "id": i['id'],
            "subCategory": i['subCategory'],
            "articleType": i['articleType'],
            "productDisplayName": i['productDisplayName'],
            "productDisplayName": i['productDisplayName'],
            "imageLink": i['imageLink'],
            "price": i['price']
        }
        result.append(product)
    json_string = pd.DataFrame(result).to_json(orient="values")
    return json_string

if __name__ == '__main__':
   app.run(debug = True)