import React, { useEffect, useState } from "react";
import axios from "axios";

function ResultsSection({ walletAddress }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (walletAddress) {
      axios.get(`http://139.99.61.75:8080/api/results/${walletAddress}`)
        .then(response => setFiles(response.data))
        .catch(err => console.error("Error fetching files:", err));
    }
  }, [walletAddress]);

  return (
    <div className="results-container">
      {files.length === 0 ? (
        <p>No files available.</p>
      ) : (
        <ul className="file-list">
          {files.map(file => (
            <li key={file} className="file-item">
              <span>{file}</span>
              <a
                href={`http://139.99.61.75:8080/api/download/${walletAddress}/${file}`}
                className="download-link"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResultsSection;
