from fastapi import FastAPI, UploadFile, File
import cv2
import os

app = FastAPI()

@app.post("/extract-frames/")
async def extract_frames(file: UploadFile = File(...)):
    contents = await file.read()
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(contents)

    cap = cv2.VideoCapture(file_path)
    frame_count = 0
    saved_frames = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % 10 == 0:
            name = f"frame_{frame_count}.jpg"
            cv2.imwrite(name, frame)
            saved_frames.append(name)
        frame_count += 1

    cap.release()
    os.remove(file_path)
    return {"frames": saved_frames}