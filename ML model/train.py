import tensorflow as tf
from tensorflow.keras import Model
from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from tensorflow.keras.layers import GlobalMaxPooling2D
from sklearn.metrics.pairwise import pairwise_distances
import numpy as np
import pandas as pd
import os
import json

DATASET_PATH = 'data'
# Define the number of rows to read, set to 500 because
# the first 500 rows were added to the database used by the
# API
numberOfRowsToRead = 500
# Define the image size
img_width, img_height = 224, 224


# Gets the path to the image
def img_path(img):
    return DATASET_PATH+"/images/"+img


# Gets the embedding for a given image using the model
def get_embedding(model, img_name):
    # Reshape
    img = image.load_img(img_path(img_name),
                         target_size=(img_width, img_height))
    # img to Array
    x = image.img_to_array(img)
    # Expand Dim (1, w, h)
    x = np.expand_dims(x, axis=0)
    # Pre process Input
    x = preprocess_input(x)
    return model.predict(x).reshape(-1)





