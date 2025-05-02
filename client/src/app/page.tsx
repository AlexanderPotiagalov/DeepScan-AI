"use client";
import { useState, useRef } from "react";
import {
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Film,
  RefreshCw,
  Github,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import styles from "./page.module.css";

export default function UploadPage() {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    // Validate file is a video
    if (!file.type.startsWith("video/")) {
      setError("Please upload a video file.");
      return;
    }

    // Just set the file name on selection
    setFileName(file.name);
    setError(""); // Clear any previous errors
  };

  const analyzeVideo = async (file) => {
    if (!file) return;

    setLoading(true);
    setError("");
    setFrames([]);
    setShowResults(false);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://localhost:4000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      setFrames(data.frames);
      setShowResults(true);

      // Scroll to results after they're loaded
      setTimeout(() => {
        const resultsElement = document.getElementById("results-section");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err) {
      console.error(err);
      setError(`Upload failed: ${err.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    handleFileChange(e);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      // Validate file is a video
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file.");
        return;
      }

      setFileName(file.name);
      setError(""); // Clear any previous errors
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const resetUpload = () => {
    setFrames([]);
    setFileName("");
    setShowResults(false);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleNewUpload = () => {
    resetUpload();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const averageScore =
    frames.length > 0
      ? frames.reduce((sum, f) => sum + f.manipulation_score, 0) / frames.length
      : null;

  const isAuthentic = averageScore !== null && averageScore >= 0.75;

  return (
    <div className={styles.mainContainer}>
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>DeepFake Detector</h1>
          <p className={styles.description}>
            Upload a video to analyze it for signs of manipulation. Our
            AI-powered tool detects deepfakes with advanced frame-by-frame
            analysis.
          </p>
        </div>

        {/* Upload Section */}
        <div className={styles.uploadContainer}>
          <div
            className={`${styles.dropzone} 
              ${dragActive ? styles.dropzoneActive : ""} 
              ${loading ? styles.dropzoneLoading : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleInputChange}
              className={styles.fileInput}
              disabled={loading}
            />

            <div>
              <div className={styles.dropzoneIcon}>
                {loading ? (
                  <RefreshCw className="animate-spin" size={24} />
                ) : (
                  <Upload size={24} />
                )}
              </div>

              {loading ? (
                <div>
                  <p className={styles.dropzoneText}>Processing video...</p>
                  <p className={styles.dropzoneSubtext}>
                    <span className={styles.fileName}>{fileName}</span>
                  </p>
                  <p className={styles.dropzoneSubtext}>
                    This may take a moment
                  </p>
                </div>
              ) : (
                <div>
                  <p className={styles.dropzoneText}>
                    {fileName
                      ? "Selected file:"
                      : "Drag & drop your video here"}
                  </p>
                  {fileName && (
                    <p className={styles.dropzoneSubtext}>
                      <span className={styles.fileName}>{fileName}</span>
                    </p>
                  )}
                  <p className={styles.dropzoneSubtext}>
                    {fileName
                      ? "Click upload button below to analyze"
                      : "Or click to browse files"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className={styles.errorContainer}>
              <AlertCircle size={16} className="text-error" />
              <p className={styles.errorText}>{error}</p>
            </div>
          )}

          {fileName && !loading && !showResults && (
            <button
              onClick={() => analyzeVideo(fileInputRef.current.files[0])}
              className={styles.uploadButton}
              aria-label="Analyze video"
            >
              <Film size={16} />
              <span>Analyze Video</span>
            </button>
          )}

          {showResults && (
            <button
              onClick={handleNewUpload}
              className={styles.uploadNewButton}
              aria-label="Upload a new video"
            >
              <RotateCcw size={16} />
              <span>Upload new video</span>
            </button>
          )}
        </div>

        {/* Results Section */}
        {showResults && averageScore !== null && (
          <div id="results-section" className={styles.resultsContainer}>
            <div
              className={`${styles.resultCard} 
                ${isAuthentic ? styles.resultAuthentic : styles.resultFake}`}
            >
              <div className={styles.resultInfo}>
                <div className={styles.resultInfoLeft}>
                  <div
                    className={`${styles.resultIconContainer} 
                      ${
                        isAuthentic
                          ? styles.resultIconContainerAuthentic
                          : styles.resultIconContainerFake
                      }`}
                  >
                    {isAuthentic ? (
                      <CheckCircle size={24} />
                    ) : (
                      <XCircle size={24} />
                    )}
                  </div>
                  <div>
                    <h2 className={styles.resultTitle}>
                      {isAuthentic
                        ? "Video Likely Authentic"
                        : "Possible Deepfake Detected"}
                    </h2>
                    <p className={styles.resultScore}>
                      Confidence score: {(averageScore * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBar}>
                    <div
                      className={
                        isAuthentic
                          ? styles.progressBarAuthentic
                          : styles.progressBarFake
                      }
                      style={{
                        width: `${averageScore * 100}%`,
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <h3 className={styles.framesTitle}>
              <Film className={styles.framesIcon} size={20} />
              Frame Analysis
            </h3>

            <div className={styles.framesGrid}>
              {frames.map((frame, i) => (
                <div key={i} className={styles.frameCard}>
                  <div className={styles.frameImage}>
                    <img
                      src={`http://localhost:8000/${frame.filename}`}
                      alt={`Frame ${i}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                    <div className={styles.frameNumber}>Frame {i + 1}</div>
                  </div>

                  <div className={styles.frameContent}>
                    <div className={styles.frameScoreTitle}>
                      <span className={styles.frameScoreLabel}>
                        Authenticity Score
                      </span>
                      <span
                        className={`${styles.frameScoreValue} 
                          ${
                            frame.manipulation_score >= 0.75
                              ? styles.frameScoreValueAuthentic
                              : styles.frameScoreValueFake
                          }`}
                      >
                        {(frame.manipulation_score * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className={styles.progressBar}>
                      <div
                        className={
                          frame.manipulation_score >= 0.75
                            ? styles.progressBarAuthentic
                            : styles.progressBarFake
                        }
                        style={{
                          width: `${frame.manipulation_score * 100}%`,
                          height: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <a
            href="https://github.com/yourusername/deepfake-detector"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <Github size={16} />
            <span>Source Code</span>
          </a>
          <a href="/about" className={styles.footerLink}>
            <span>Learn more</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </main>
    </div>
  );
}
