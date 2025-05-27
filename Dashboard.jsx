import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import ProfileSection from './ProfileSection';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [account, setAccount] = useState(() => {
    const fromNav = location.state?.account;
    const fromStorage = localStorage.getItem('wallet');
    return fromNav || fromStorage || '';
  });

  const [file, setFile] = useState(null);
  const [resultFiles, setResultFiles] = useState([]);

  useEffect(() => {
    console.log("Dashboard loaded with account:", account);
    if (!account) {
      navigate('/');
    } else {
      localStorage.setItem('wallet', account);
      fetchResults();
    }
  }, [account]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchResults = async () => {
    try {
      const res = await axios.get(`http://139.99.61.75:8080/api/results/${account}`);
      setResultFiles(res.data);
    } catch (err) {
      console.error('Error fetching results:', err);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('wallet', account);

      const response = await fetch('http://139.99.61.75:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded and watermarked!');
        fetchResults();
      } else {
        const errorText = await response.text();
        alert('Upload failed: ' + errorText);
      }
    } catch (error) {
      alert('Upload error: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('wallet');
    setAccount('');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <HamburgerMenu />
        <ProfileSection account={account} />
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <section className="file-upload-section">
        <h2>Upload Your File</h2>
        <div className="upload-controls">
          <input type="file" onChange={handleFileChange} className="file-input" />
          <button onClick={handleUpload} className="upload-button">
            Upload
          </button>
        </div>
        {file && (
          <p className="selected-file">
            Selected file: <strong>{file.name}</strong>
          </p>
        )}
      </section>

      <section className="result-section">
        <h2>Your Watermarked Files</h2>
        {Array.isArray(resultFiles) && resultFiles.length === 0 ? (
  <p>No files found yet.</p>
) : (
  <ul className="result-list">
    {resultFiles?.map((filename, idx) => (
      <li key={idx}>
        <a
          href={`http://139.99.61.75:8080/api/download/${account}/${filename}`}
          className="download-link"
          download
        >
          {filename}
        </a>
      </li>
    ))}
  </ul>
)}

      </section>
    </div>
  );
}

export default Dashboard;
