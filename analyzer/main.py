from fastapi import FastAPI, UploadFile, File
import cv2
import os
from mesonet import MesoNetDetector

detector = MesoNetDetector()

app = FastAPI()

@app.post("/extract-frames/")
async def extract_frames(file: UploadFile = File(...)):
    contents = await file.read()
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(contents)

    output_dir = "frames"
    os.makedirs(output_dir, exist_ok=True)

    cap = cv2.VideoCapture(file_path)
    frame_count = 0
    results = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % 10 == 0:
            name = f"frame_{frame_count}.jpg"
            full_path = os.path.join(output_dir, name)
            cv2.imwrite(full_path, frame)

            score = detector.predict_frame(full_path)
            print(f"Frame {frame_count}: {score:.3f}")
            results.append({
                "filename": f"frames/{name}",
                "manipulation_score": round(score, 2)
            })

        frame_count += 1

    cap.release()
    os.remove(file_path)
    return {"frames": results}

from fastapi.staticfiles import StaticFiles
app.mount("/frames", StaticFiles(directory="frames"), name="frames")
