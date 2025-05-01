import tensorflow as tf
import numpy as np
import cv2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import (
    Input, Conv2D, MaxPooling2D, Flatten, Dense, BatchNormalization, Activation
)


class Meso4(Model):
    def __init__(self):
        super(Meso4, self).__init__()

        self.conv1 = Conv2D(8, (3, 3), padding='same')
        self.bn1 = BatchNormalization()
        self.act1 = Activation('relu')
        self.pool1 = MaxPooling2D(pool_size=(2, 2), padding='same')

        self.conv2 = Conv2D(8, (5, 5), padding='same')
        self.bn2 = BatchNormalization()
        self.act2 = Activation('relu')
        self.pool2 = MaxPooling2D(pool_size=(2, 2), padding='same')

        self.conv3 = Conv2D(16, (5, 5), padding='same')
        self.bn3 = BatchNormalization()
        self.act3 = Activation('relu')
        self.pool3 = MaxPooling2D(pool_size=(2, 2), padding='same')

        self.conv4 = Conv2D(16, (5, 5), padding='same')
        self.bn4 = BatchNormalization()
        self.act4 = Activation('relu')
        self.pool4 = MaxPooling2D(pool_size=(4, 4), padding='same')

        self.flatten = Flatten()
        self.dense1 = Dense(16, activation='relu')
        self.dense2 = Dense(1, activation='sigmoid')

    def call(self, x):
        x = self.pool1(self.act1(self.bn1(self.conv1(x))))
        x = self.pool2(self.act2(self.bn2(self.conv2(x))))
        x = self.pool3(self.act3(self.bn3(self.conv3(x))))
        x = self.pool4(self.act4(self.bn4(self.conv4(x))))
        x = self.flatten(x)
        x = self.dense1(x)
        return self.dense2(x)


class MesoNetDetector:
    def __init__(self, weight_path='mesonet_model.h5'):
        self.model = Meso4()
        dummy_input = tf.random.normal([1, 256, 256, 3])
        self.model(dummy_input, training=False)
        self.model.load_weights(weight_path)

        # Load OpenCV face detector once
        self.face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        )

    def predict_frame(self, image_path: str) -> float:
        img = cv2.imread(image_path)
        if img is None:
            return 0.0

        # Detect face and crop
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = self.face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        if len(faces) > 0:
            x, y, w, h = faces[0]
            img = img[y:y+h, x:x+w]
        else:
            # fallback center crop
            h, w, _ = img.shape
            print(f"[{image_path}] Detected face at ({x}, {y}, {w}, {h})")
            img = img[h//4:h*3//4, w//4:w*3//4]

        # Continue processing
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (256, 256))
        img = img.astype(np.float32) / 255.0
        img = np.expand_dims(img, axis=0)

        pred = self.model(img, training=False).numpy()
        return float(pred[0][0])
