from fastapi import FastAPI
import cv2
import numpy as np
from ultralytics import YOLO

app = FastAPI()

model = YOLO("letterdetector.pt")

def convert_base64_to_image(base64_string):          # converts JSON Blob/Base64 string to an OpenCV image
    img_data = base64.b64decode(base64_string)
    np_arr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return img

@app.post("/detect/letters/")
async def detect_letters(data: ImageRequest):

 img = convert_base64_to_image(data.image)
 results = model.predict(img)
 

 
 
 return JSONResponse(content={"detections": })