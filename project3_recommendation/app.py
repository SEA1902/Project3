from flask import Flask, jsonify, request
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from pandas import DataFrame
import pymongo
import cv2
import numpy as np
from sklearn.metrics.pairwise import pairwise_distances
from bson.objectid import ObjectId
import jsonpickle

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"name" : "Hello, Flask!"})


myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["project3"]
mycollection= mydb["products"]
cursor = mycollection.find()
list_cur = list(cursor)
df = DataFrame(list_cur)
# df.to_csv('./data.csv')

# download image by url
# for i in df.index:
#     urllib.request.urlretrieve(df.iloc[i]['image'], "./images/"+ str(i) + ".jpg")

def img_path(idx):
    return "./images/"+ str(idx) + ".jpg"

# Calcule DIstance Matriz
df_embs = pd.read_csv('./embeddings.csv')
cosine_sim = 1-pairwise_distances(df_embs, metric='cosine')

indices = pd.Series(range(len(df)), index=df.index)

@app.route("/get_recommender", methods=["POST"])
# Function that get movie recommendations based on the cosine similarity score of movie genres

def get_recommender(top_n = 4):
    id = request.form['id']
    idx = df[df['_id'] == ObjectId(id)].index.values
    sim_idx    = indices[idx]
    sim_scores = list(enumerate(cosine_sim[sim_idx][0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n+1]
    idx_rec    = [i[0] for i in sim_scores]
    # idx_sim    = [i[1] for i in sim_scores]
    return jsonpickle.encode(indices.iloc[idx_rec].index)

if __name__ == '__main__':
   app.run(debug = True)