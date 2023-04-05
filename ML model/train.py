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

def main():
    # Read the csv file into a pandas dataframe
    df = pd.read_csv(os.path.join(DATASET_PATH, 'styles.csv'),
                     nrows=numberOfRowsToRead)
    # Add the image name to the dataframe
    df['image'] = df.apply(lambda row: str(row['id']) + ".jpg", axis=1)
    df = df.reset_index(drop=True)

    # Pre-Trained Model
    base_model = ResNet50(weights='imagenet',
                          include_top=False,
                          input_shape=(img_width, img_height, 3))
    base_model.trainable = False

    # Add Layer Embedding
    model = tf.keras.Sequential([
        base_model,
        GlobalMaxPooling2D()
    ])


    model.summary()

    # Parallel apply
    map_embeddings = df['image'].swifter.apply(
        lambda img: get_embedding(model, img))
    df_embs = map_embeddings.apply(pd.Series)

    # Create a dictionary where the key is the df id and the value is the index
    # of the row in the dataframe
    id_to_index = {}
    for index, row in df.iterrows():
        id_to_index[row['id']] = index

    # Calculate the cosine similarity matrix
    cosine_sim = 1-pairwise_distances(df_embs, metric='cosine')
    cosine_sim_json = cosine_sim.tolist()

    # Save the cosine similarity matrix as a json file
    with open('cosine_sim.json', 'w') as f:
        json.dump(cosine_sim_json, f)

    # Save the id_to_index dictionary as a json file
    with open('id_to_index.json', 'w') as f:
        json.dump(id_to_index, f)


if __name__ == '__main__':
    main()




