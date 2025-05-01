"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [frames, setFrames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setFrames([]);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await axios.post("http://localhost:4000/analyze", formData);
      setFrames(res.data.frames);
    } catch (err: any) {
      console.error(err);
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const averageScore =
    frames.length > 0
      ? frames.reduce((sum, f) => sum + f.manipulation_score, 0) / frames.length
      : null;

  const isAuthentic = averageScore !== null && averageScore >= 0.75;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎥 Upload a Video</h1>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4 block"
      />

      {loading && <p>⏳ Processing video...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {averageScore !== null && (
        <div className="mb-6 p-4 rounded bg-gray-100 text-center shadow">
          <p className="text-lg font-semibold">
            Overall Verdict:{" "}
            <span className={isAuthentic ? "text-green-600" : "text-red-600"}>
              {isAuthentic ? "✅ Likely Authentic" : "⚠️ Likely Deepfake"}
            </span>
          </p>
          <p className="text-sm mt-1 text-gray-600">
            Average Score: {averageScore.toFixed(3)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {frames.map((frame, i) => (
          <div key={i} className="border p-2 rounded shadow">
            <img
              src={`http://localhost:8000/${frame.filename}`}
              alt={`Frame ${i}`}
              className="w-full"
            />
            <p className="mt-2 text-sm">
              Score:{" "}
              <span
                className={
                  frame.manipulation_score >= 0.75
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {frame.manipulation_score.toFixed(3)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
