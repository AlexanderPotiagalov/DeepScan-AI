<div align="left">
  <div style="display: inline-block;">
    <h1 style="display: inline-block; vertical-align: middle; margin-top: 0;">DeepScan-AI</h1>
    <img
      src="https://raw.githubusercontent.com/AlexanderPotiagalov/DeepScan-AI/main/DeepScanImage.jpeg"
      width="25%"
      align="left"
      style="margin-right: 15; margin-top: 60;"
    />
    <p><em>AI-powered DeepFake Detection using frame-by-frame video analysis</em></p>
    <p>
      <img src="https://img.shields.io/github/license/AlexanderPotiagalov/DeepScan-AI?style=flat-square&color=blueviolet" alt="license">
      <img src="https://img.shields.io/github/last-commit/AlexanderPotiagalov/DeepScan-AI?style=flat-square&color=blueviolet" alt="last-commit">
      <img src="https://img.shields.io/github/languages/top/AlexanderPotiagalov/DeepScan-AI?style=flat-square&color=blueviolet" alt="top-language">
      <img src="https://img.shields.io/github/languages/count/AlexanderPotiagalov/DeepScan-AI?style=flat-square&color=blueviolet" alt="languages">
    </p>
    <p>Built with:</p>
    <p>
      <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
      <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
      <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI">
      <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" alt="TensorFlow">
      <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
      <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" alt="Axios">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
      <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white" alt="OpenCV">
      <img src="https://img.shields.io/badge/Keras-D00000?style=flat-square&logo=keras&logoColor=white" alt="Keras">
      <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js">
      <img src="https://img.shields.io/badge/Multer-665A4F?style=flat-square" alt="Multer">
      <img src="https://img.shields.io/badge/Neural_Networks-563D7C?style=flat-square" alt="Neural Networks">
    </p>
  </div>
</div>

<br clear="left"/>

---

<details><summary>📜 Table of Contents</summary>

- [📖 Overview](#-overview)
- [📷 UI Screenshots](#-ui-screenshots)
- [✨ Features](#-features)
- [🧠 Technology Stack](#-technology-stack)
- [🧠 How It Works](#-how-it-works)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🧑‍💻 Author](#-author)

</details>

---

## 📖 Overview

**DeepScan-AI** is a full-stack AI application for detecting deepfakes in videos. It leverages a custom-trained TensorFlow model to analyze individual frames and computes an overall verdict of authenticity.

---

## 📸 UI Screenshots

<div align="center">
  <img src="DeepScan2.png" width="25%" style="border-radius: 12px; margin-right: 10px;"/>
  <img src="DeepScan1.png" width="21%" style="border-radius: 12px; margin-right: 10px;"/>
  <img src="DeepScan3.png" width="25%" style="border-radius: 12px;"/>
  <img src="DeepScan4.png" width="25%" style="border-radius: 12px;"/>
</div>

---

## ✨ Features

| ✅ Feature               | Description                                                       |
|-------------------------|-------------------------------------------------------------------|
| 🎥 Video Upload         | Drag & drop or browse to upload video                             |
| 📸 Frame-by-Frame Scan  | Breaks video into frames and runs each through a trained model     |
| 🧠 Deep Learning Model  | TensorFlow CNN predicts manipulation score per frame               |
| 📊 Final Verdict        | Displays averaged score with verdict: ✅ Authentic / ⚠️ Deepfake   |
| 🌐 Fully Responsive     | Tailwind-powered sleek and modern interface                        |
| 🚀 FastAPI + Express    | Lightweight backend infrastructure                                 |

---

## 🧠 Technology Stack

DeepScan-AI is built using a modular, full-stack architecture that combines modern web technologies with machine learning. Here's a breakdown of the stack:

### 🌐 Frontend

| Technology     | Purpose                                  |
|----------------|------------------------------------------|
| **Next.js**    | React-based framework for frontend pages |
| **React**      | Component-driven UI logic                |
| **Tailwind CSS** | Utility-first CSS for styling           |
| **Lucide Icons** | Clean, minimal icon set used in UI     |
| **Axios**      | HTTP client for interacting with the API |

### 🖥️ Backend (Upload & Routing)

| Technology     | Purpose                                  |
|----------------|------------------------------------------|
| **Node.js**    | Runtime environment                      |
| **Express.js** | Upload route and form handling           |
| **Multer**     | Middleware for handling file uploads     |

### 🧪 AI/ML Inference Engine

| Technology     | Purpose                                         |
|----------------|-------------------------------------------------|
| **Python**     | Core language for analysis pipeline             |
| **FastAPI**    | Fast and lightweight API server                 |
| **TensorFlow** | ML framework for deepfake detection             |
| **Keras**      | High-level neural networks API (CNN model usage) |
| **OpenCV**     | Frame extraction and image processing           |

### 🧱 Infrastructure

- **Local Development** using `localhost:3000` (frontend), `4000` (upload), and `8000` (inference)
- **Modular Folder Structure**: `/client`, `/server`, `/analyzer` for separation of concerns
- **REST API** communication between services

> 💡 The stack was chosen to maximize performance, maintainability, and ease of integration between modern web and AI tools.

---

## 🧠 How It Works

1. Upload a video from the client.
2. The Express server handles file saving.
3. FastAPI backend extracts frames using OpenCV.
4. Each frame is evaluated using a CNN deepfake model.
5. The average of frame scores determines the authenticity verdict.
6. Results are sent back to the frontend for display.

---

## 📂 Project Structure

```bash
DeepScan-AI/
├── client/               # Next.js frontend
│   └── pages/
│       └── index.tsx     # Main UploadPage
├── server/               # Node.js Express middleware
│   └── index.js
├── analyzer/             # Python FastAPI + TensorFlow backend
│   ├── main.py
│   ├── mesonet.py
│   └── mesonet_model.h5  # Pretrained model
├── README.md
├── .gitignore
```

## 🚀 Getting Started

### 📋 Prerequisites

Before getting started with **DeepScan-AI**, make sure you have the following installed:

- **Node.js** (v18+)
- **npm** or **yarn**
- **Python** (3.8+)
- **pip** and **virtualenv**

### 🛠️ Installation

Follow these steps to set up the full DeepScan-AI stack on your machine:

---

#### 🔍 1. Clone the repository

```bash
git clone https://github.com/your-username/DeepScan-AI
cd DeepScan-AI
```

⚙️ 2. Set up the Deepfake Analysis Backend (FastAPI + TensorFlow)

```bash
cd analyzer
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi==0.95.2 uvicorn==0.22.0 numpy==1.24.4 opencv-python==4.8.0.76 tensorflow==2.11.0 python-multipart==0.0.6 pydantic==1.10.13
uvicorn main:app --reload
```
> The backend will start at: http://localhost:8000

🌐 3. Start the Node.js Upload Server

```bash
cd ../server
npm install
node index.js
```
> Upload server will run at: http://localhost:4000

🖼️ 4. Start the Next.js Frontend

```bash
cd ../client
npm install
npm run dev
```
> Frontend will be live at: http://localhost:3000

## Contributing

- **💬 [Join the Discussions](https://github.com/AlexanderPotiagalov/DeepScan-AI/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/AlexanderPotiagalov/DeepScan-AI/issues)**: Submit bugs found or log feature requests.
- **💡 [Submit Pull Requests](https://github.com/AlexanderPotiagalov/DeepScan-AI/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

## 🧑‍💻 Author

Built by **Alexander Potiagalov**
