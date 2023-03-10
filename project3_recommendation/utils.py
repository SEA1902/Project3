import tensorflow as tf
import keras
from keras import Model
from tensorflow.keras.applications.resnet50 import ResNet50
import keras.utils as image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from keras.layers import GlobalMaxPooling2D
import pandas as pd
import numpy as np
import cv2

df = pd.read_csv('./data/data_train.csv')


def img_path(id):
    image = cv2.imread("./data/images/"+ str(id) + ".jpg")
    if image is None:
        return "./data/images/blank.jpg"
    else:
        return "./data/images/"+ str(id) + ".jpg"
# Input Shape
img_width, img_height, _ = 224, 224, 3 #load_image(df.iloc[0].image).shape

# Pre-Trained Model
base_model = ResNet50(weights='imagenet', 
                      include_top=False, 
                      input_shape = (img_width, img_height, 3))
base_model.trainable = False

# Add Layer Embedding
model = keras.Sequential([
    base_model,
    GlobalMaxPooling2D()
])

model.summary()

def get_embedding(model, id):
    # Reshape
    img = image.load_img(img_path(id), target_size=(img_width, img_height))
    # img to Array
    x   = image.img_to_array(img)
    # Expand Dim (1, w, h)
    x   = np.expand_dims(x, axis=0)
    # Pre process Input
    x   = preprocess_input(x)
    return model.predict(x).reshape(-1)

# Parallel apply
df_sample      = df#.sample(10)
map_embeddings = df_sample['id'].apply(lambda id: get_embedding(model, id))
df_embs        = map_embeddings.apply(pd.Series)

df_embs.to_csv('./data/embeddings.csv')