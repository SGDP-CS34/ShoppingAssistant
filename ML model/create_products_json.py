import csv
import json
import random

DATASET_PATH = 'data'
number_of_rows_to_read = 500
csv_file = DATASET_PATH + '/styles.csv'

def main():
    json_array = []

    # Open CSV file and read in data
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        # Loop through rows and create JSON objects
        for row in reader:
            # Create JSON object for row
            json_object = {
                "id": int(row['id']),
                "name": row['productDisplayName'],
                "price": random.randint(1000, 10000),
                "color": row['baseColour'],
                "gender": row['gender'],
                "masterCategory": row['masterCategory'],
                "subCategory": row['subCategory'],
                "articleType": row['articleType'],
                "season": row['season'],
                "year": int(row['year']),
                "productImageURL": row['productImageURL']
            }
            # Add JSON object to array
            json_array.append(json_object)
            if len(json_array) >= number_of_rows_to_read:
                break

    with open('products.json', 'w') as f:
        json.dump(json_array, f)


if __name__ == '__main__':
    main()