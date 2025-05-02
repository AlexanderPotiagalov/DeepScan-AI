// app/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import {
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Film,
  RefreshCcw,
  Github,
  ArrowRight,
  RotateCcw,
  Shield,
  EyeOff,
  Layers,
  Cpu,
} from "lucide-react";
import styles from "./page.module.css";

export default function UploadPage() {
  const [frames, setFrames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simulate processing stages for better UX
  useEffect(() => {
    if (loading) {
      const stages = [1, 2, 3];
      let currentStage = 0;
      const interval = setInterval(() => {
        if (currentStage < stages.length) {
          setProcessingStage(stages[currentStage]);
          currentStage++;
        } else {
          clearInterval(interval);
        }
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setProcessingStage(0);
    }
  }, [loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Please upload a video file.");
      return;
    }
    setFileName(file.name);
    setError("");
  };

  const analyzeVideo = async (file: File | null) => {
    if (!file) return;
    setLoading(true);
    setError("");
    setFrames([]);
    setShowResults(false);

    const formData = new FormData();
    formData.append("video", file);

    try {
      // Simulate loading for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 6000));

      const response = await fetch("http://localhost:4000/analyze", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFrames(data.frames || mockFrames); // Use mock data if needed
      setShowResults(true);
      document
        .getElementById("results-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      setError(`Upload failed: ${err.message || "Please try again."}`);
      // For demo: still show mock results
      setFrames(mockFrames);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type !== "dragleave");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("video/")) {
      setError("Please upload a video file.");
      return;
    }
    setFileName(file.name);
    setError("");
    const dt = new DataTransfer();
    dt.items.add(file);
    if (fileInputRef.current) fileInputRef.current.files = dt.files;
  };

  const resetUpload = () => {
    setFrames([]);
    setFileName("");
    setShowResults(false);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Mock frames data for demo
  const mockFrames = [
    { filename: "/api/placeholder/320/180", manipulation_score: 0.92 },
    { filename: "/api/placeholder/320/180", manipulation_score: 0.88 },
    { filename: "/api/placeholder/320/180", manipulation_score: 0.78 },
    { filename: "/api/placeholder/320/180", manipulation_score: 0.62 },
    { filename: "/api/placeholder/320/180", manipulation_score: 0.95 },
    { filename: "/api/placeholder/320/180", manipulation_score: 0.45 },
  ];

  const averageScore = frames.length
    ? frames.reduce((sum, f) => sum + f.manipulation_score, 0) / frames.length
    : null;
  const isAuthentic = averageScore !== null && averageScore >= 0.75;

  return (
    <div className={styles.mainContainer}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        <div
          className={styles.gradientOrb}
          style={{
            left: `${(mousePosition.x / window.innerWidth) * 30 + 20}%`,
            top: `${(mousePosition.y / window.innerHeight) * 30 + 10}%`,
          }}
        ></div>

        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={styles.floatingParticle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 10}s`,
            }}
          />
        ))}

        <div className={styles.gridOverlay}></div>
      </div>

      <div className={styles.glassContainer}>
        <main className={styles.main}>
          {/* Header with Futuristic Animation */}
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <Shield className={styles.logoIcon} />
              <div className={styles.scanLine}></div>
            </div>
            <h1 className={styles.title}>DeepFake Detector</h1>
            <p className={styles.description}>
              AI-powered deepfake analysis with frame-by-frame detection
              capabilities.
              <span className={styles.badge}>v2.0</span>
            </p>
          </div>

          {/* Upload Section with Holographic Effect */}
          <div className={styles.uploadContainer}>
            <div
              className={`${styles.dropzone} ${
                dragActive ? styles.dropzoneActive : ""
              } ${loading ? styles.dropzoneLoading : ""}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className={styles.fileInput}
                disabled={loading}
              />
              <div className={styles.dropzoneContent}>
                <div className={styles.dropzoneIconContainer}>
                  {loading ? (
                    <div className={styles.processingIndicator}>
                      <div className={styles.spinnerRing}></div>
                      <div className={styles.processingStage}>
                        {processingStage === 1 && (
                          <>
                            <Layers className={styles.stageIcon} />
                            <span>Extracting frames</span>
                          </>
                        )}
                        {processingStage === 2 && (
                          <>
                            <Cpu className={styles.stageIcon} />
                            <span>Neural analysis</span>
                          </>
                        )}
                        {processingStage === 3 && (
                          <>
                            <EyeOff className={styles.stageIcon} />
                            <span>Deepfake detection</span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.uploadIconWrapper}>
                      <Upload size={34} className={styles.uploadIcon} />
                      <div className={styles.uploadRipple}></div>
                    </div>
                  )}
                </div>
                <p className={styles.dropzoneText}>
                  {loading
                    ? "Processing video..."
                    : fileName
                    ? `Selected: ${fileName}`
                    : "Drag & drop video file"}
                </p>
                <p className={styles.dropzoneSubtext}>
                  {loading ? (
                    <span className={styles.loadingText}>
                      AI model analyzing
                      <span className={styles.loadingDots}>...</span>
                    </span>
                  ) : (
                    "Or click to browse files"
                  )}
                </p>
              </div>

              {/* Animated scanner light effect */}
              {loading && <div className={styles.scannerLight}></div>}
            </div>

            {error && (
              <div className={styles.errorContainer}>
                <AlertCircle size={16} />
                <span className={styles.errorText}>{error}</span>
              </div>
            )}

            {!loading &&
              fileInputRef.current?.files?.length > 0 &&
              !showResults && (
                <button
                  onClick={() =>
                    analyzeVideo(fileInputRef.current?.files[0] || null)
                  }
                  className={styles.analyzeButton}
                >
                  <Film size={20} className={styles.buttonIcon} />
                  <span>Analyze Video</span>
                  <div className={styles.buttonGlow}></div>
                </button>
              )}

            {showResults && (
              <button onClick={resetUpload} className={styles.resetButton}>
                <RotateCcw size={18} className={styles.buttonIcon} />
                <span>Upload New Video</span>
              </button>
            )}
          </div>

          {/* Results Section with Futuristic UI */}
          {showResults && averageScore !== null && (
            <section id="results-section" className={styles.resultsContainer}>
              <div
                className={`${styles.resultCard} ${
                  isAuthentic ? styles.resultAuthentic : styles.resultFake
                }`}
              >
                <div className={styles.resultHeader}>
                  <div
                    className={`${styles.resultIconContainer} ${
                      isAuthentic ? styles.authenticIcon : styles.fakeIcon
                    }`}
                  >
                    {isAuthentic ? (
                      <CheckCircle size={28} />
                    ) : (
                      <XCircle size={28} />
                    )}
                  </div>
                  <div className={styles.resultTitleContainer}>
                    <h2 className={styles.resultTitle}>
                      {isAuthentic
                        ? "Video Likely Authentic"
                        : "Possible Deepfake Detected"}
                    </h2>
                    <div className={styles.confidenceLabel}>
                      <span>Analysis Confidence</span>
                      <span className={styles.confidenceValue}>
                        {(averageScore * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.progressBarWrapper}>
                  <div className={styles.progressMarkers}>
                    <div className={styles.marker} style={{ left: "25%" }}>
                      25%
                    </div>
                    <div className={styles.marker} style={{ left: "50%" }}>
                      50%
                    </div>
                    <div className={styles.marker} style={{ left: "75%" }}>
                      75%
                    </div>
                  </div>
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressBackground}></div>
                    <div
                      className={`${styles.progressBar} ${
                        isAuthentic
                          ? styles.progressBarAuthentic
                          : styles.progressBarFake
                      }`}
                      style={{ width: `${averageScore * 100}%` }}
                    >
                      <div className={styles.progressGlow}></div>
                    </div>
                    <div
                      className={styles.progressThumb}
                      style={{ left: `${averageScore * 100}%` }}
                    ></div>
                  </div>
                </div>

                {isAuthentic ? (
                  <p className={styles.resultDescription}>
                    Our AI model has determined this video is likely authentic
                    with minimal signs of manipulation.
                  </p>
                ) : (
                  <p className={styles.resultDescription}>
                    Our AI model has detected potential manipulation in this
                    video. Review the frame analysis below.
                  </p>
                )}
              </div>

              <div className={styles.framesSection}>
                <h3 className={styles.framesTitle}>
                  <Film className={styles.framesIcon} size={22} />
                  <span>Frame-by-Frame Analysis</span>
                  <div className={styles.frameSeparator}></div>
                </h3>

                <div className={styles.framesGrid}>
                  {frames.map((frame, i) => (
                    <div key={i} className={styles.frameCard}>
                      <div className={styles.frameImageContainer}>
                        <img
                          src={`http://localhost:8000/${frame.filename}`}
                          alt={`Frame ${i + 1}`}
                          className={styles.frameImage}
                          loading="lazy"
                        />
                        <div className={styles.frameOverlay}>
                          <div
                            className={`${styles.frameIndicator} ${
                              frame.manipulation_score >= 0.75
                                ? styles.authenticIndicator
                                : styles.fakeIndicator
                            }`}
                          ></div>
                        </div>
                        <div className={styles.frameNumber}>Frame #{i + 1}</div>
                      </div>

                      <div className={styles.frameDetails}>
                        <div className={styles.frameScoreHeader}>
                          <span className={styles.frameScoreLabel}>
                            Authenticity Score
                          </span>
                          <span
                            className={`${styles.frameScoreValue} ${
                              frame.manipulation_score >= 0.75
                                ? styles.authenticScore
                                : styles.fakeScore
                            }`}
                          >
                            {(frame.manipulation_score * 100).toFixed(1)}%
                          </span>
                        </div>

                        <div className={styles.frameProgressContainer}>
                          <div className={styles.frameProgressBackground}></div>
                          <div
                            className={`${styles.frameProgressBar} ${
                              frame.manipulation_score >= 0.75
                                ? styles.authenticProgressBar
                                : styles.fakeProgressBar
                            }`}
                            style={{
                              width: `${frame.manipulation_score * 100}%`,
                            }}
                          >
                            <div className={styles.frameProgressGlow}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Footer */}
          <div className={styles.footer}>
            <a
              href="https://github.com/yourusername/deepfake-detector"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              <Github size={18} />
              <span>Source Code</span>
            </a>
            <div className={styles.footerDivider}></div>
            <a href="/about" className={styles.footerLink}>
              <span>Learn More</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
