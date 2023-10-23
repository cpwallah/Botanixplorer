from flask import Flask,request
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img,img_to_array
from flask_cors import CORS
import cv2
from tensorflow.image import resize
app = Flask(__name__)
CORS(app)

model= load_model("./model/medleaves.h5")
print('@@ Model loaded')
pred = ''
def predict_medleaves(images):
    img = load_img(images)
    img = img_to_array(img)
    img = resize(img, (224, 224))
    img = img / 255.0

    # Expand the dimensions to match the expected input shape (add a batch dimension)
    img = np.expand_dims(img, axis=0)
    result = model.predict(img).argmax()
    report = model.predict(img)
    print("@@@@@ Model Array ", report)
    class_names=['Aloevera','Amla','Amruthaballi','Arali','Astma_weed','Badipala','Balloon_Vine',
 'Bamboo',
 'Beans',
 'Betel',
 'Bhrami',
 'Bringaraja',
 'Caricature',
 'Castor',
 'Catharanthus',
 'Chakte',
 'Chilly',
 'Citron lime (herelikai)',
 'Coffee',
 'Common rue(naagdalli)',
 'Coriender',
 'Curry',
 'Doddpathre',
 'Drumstick',
 'Ekka',
 'Eucalyptus',
 'Ganigale',
 'Ganike',
 'Gasagase',
 'Ginger',
 'Globe Amarnath',
 'Guava',
 'Henna',
 'Hibiscus',
 'Honge',
 'Insulin',
 'Jackfruit',
 'Jasmine',
 'Kambajala',
 'Kasambruga',
 'Kohlrabi',
 'Lantana',
 'Lemon',
 'Lemongrass',
 'Malabar_Nut',
 'Malabar_Spinach',
 'Mango',
 'Marigold',
 'Mint','Neem','Nelavembu','Nerale','Nooni','Onion','Padri','Palak(Spinach)','Papaya','Parijatha','Pea','Pepper','Pomoegranate','Pumpkin','Raddish','Rose','Sampige','Sapota','Seethaashoka','Seethapala','Spinach1','Tamarind','Taro','Tecoma','Thumbe','Tomato','Tulsi','Turmeric','ashoka','camphor','kamakasturi','kepala']
    result = class_names[result]
    return result
    # return result


@app.route("/plantidentification",methods=['GET','POST'])
def plantidentification(): #for getting the image file
    global pred
    if request.method == 'POST':
        file = request.files['image']
        filename = file.filename
        print("@@ Input posted = ", filename)
        filepath = os.path.join('userInput/images',filename)
        file.save(filepath)
        print("@@ Predicting class......")
        prediction = predict_medleaves(images=filepath)
        pred = prediction
        print(pred)
        return pred
    if request.method == 'GET':
        return pred
        


if __name__ == "__main__":
    app.run(debug=True)