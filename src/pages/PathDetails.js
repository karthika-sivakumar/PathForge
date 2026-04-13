import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  ArrowLeft,
  Plus,
  Settings,
  Trash2,
  BookOpen,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
 
const PathDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const { title } = location.state || {};
 
  // STATE
  const [pathTitle, setPathTitle] = useState(title);
 
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
 
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
 
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoNotes, setVideoNotes] = useState("");
 
  const [error, setError] = useState("");
 
  // EFFECT
  useEffect(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, []);
 
  // VALIDATION
  const isValidYouTubeURL = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
  };
 
  // EMBED FUNCTION
  const getEmbedUrl = (url) => {
    let videoId = "";
 
    if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    }
 
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };
 
  // LOGIC
  const total = videos.length;
  const completed = videos.filter((v) => v.done).length;
  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);
 
  const handleAddVideo = () => {
    if (!videoTitle || !videoUrl) {
      setError("All required fields must be filled");
      return;
    }
 
    if (!isValidYouTubeURL(videoUrl)) {
      setError("Please enter a valid YouTube URL");
      return;
    }
 
    const newVideo = {
      id: Date.now(),
      title: videoTitle,
      url: videoUrl,
      desc: videoDesc,
      notes: videoNotes,
      done: false
    };
 
    setVideos([...videos, newVideo]);
 
    setVideoTitle("");
    setVideoUrl("");
    setVideoDesc("");
    setVideoNotes("");
    setError("");
    setShowModal(false);
  };
 
  const toggleComplete = (id) => {
    setVideos(
      videos.map((v) =>
        v.id === id ? { ...v, done: !v.done } : v
      )
    );
  };
 
  const openVideo = (video) => {
    setCurrentVideo(video);
    setShowPlayer(true);
  };
 
  return (
    <div className="dashboard">
      <Sidebar />
 
      <div className="main">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <ArrowLeft size={16} onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
          <span onClick={() => navigate("/")}>Dashboard</span>
          <span className="slash">/</span>
          <span className="path-name">{pathTitle}</span>
        </div>
 
        {/* Card */}
        <div className="path-card">
          <div className="card-header">
            <h1>{pathTitle}</h1>
 
            <div className="card-actions">
              <div className="icon-btn" onClick={() => setShowSettings(true)} title="Edit title">
                <Settings size={16} />
              </div>
 
              <div className="icon-btn delete" onClick={() => setShowDelete(true)} title="Delete path">
                <Trash2 size={16} />
              </div>
            </div>
          </div>
 
          <hr />
 
          {/* Progress */}
          <div className="progress-section">
            <div className="progress-top">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
 
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
 
            <div className="stats">
              <div className="stat-box">
                <h2>{completed}</h2>
                <p>COMPLETED</p>
              </div>
 
              <div className="stat-box">
                <h2>{total}</h2>
                <p>TOTAL</p>
              </div>
            </div>
          </div>
        </div>
 
        {/* Curriculum */}
        <div className="curriculum-header">
          <h2>Curriculum</h2>
 
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Add Video
          </button>
        </div>
 
        {/* Video List */}
{videos.length > 0 ? (
  <div className="video-list">
    {videos.map((v) => (
      <div key={v.id} className="video-item">

        {/* BLUE HEADER CARD */}
        <div className="video-header">
          <input
            type="checkbox"
            checked={v.done}
            onChange={() => toggleComplete(v.id)}
          />

          <p className="video-title">{v.title}</p>

          <button
            className="watch-btn"
            onClick={() => openVideo(v)}
          >
            ▶ Watch
          </button>
        </div>

        {/* DESCRIPTION CARD */}
        {v.desc && (
          <div className="video-subcard">
            <p className="label">Description</p>
            <p className="video-desc">{v.desc}</p>
          </div>
        )}

        {/* NOTES CARD */}
        {v.notes && (
          <div className="video-subcard notes">
            <p className="label">Notes</p>
            <p className="video-notes">{v.notes}</p>
          </div>
        )}

      </div>
    ))}
  </div>
) : (
  <div className="curriculum-box">
    <div className="empty-icon">
      <BookOpen size={22} />
    </div>
    <p>Your curriculum is empty</p>
  </div>
)}
 
        {/* VIDEO PLAYER */}
        {showPlayer && currentVideo && (
          <div className="modal-overlay">
            <div className="video-modal">
              <div className="modal-header">
                <h3>{currentVideo.title}</h3>
                <X size={20} onClick={() => setShowPlayer(false)} style={{ cursor: "pointer" }} />
              </div>
 
              <iframe
                src={getEmbedUrl(currentVideo.url)}
                title="video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
 
        {/* ADD VIDEO MODAL */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Add New Video</h3>
                <X size={20} onClick={() => setShowModal(false)} style={{ cursor: "pointer" }} />
              </div>
 
              <div className="modal-body">
                <div>
                  <label>Title</label>
                  <input
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. Introduction to React Hooks"
                  />
                </div>
 
                <div>
                  <label>YouTube URL</label>
                  <input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
 
                {error && <p className="error-text">{error}</p>}
 
                <div>
                  <label>Description <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span></label>
                  <textarea
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                    placeholder="What does this video cover?"
                  />
                </div>
 
                <div>
                  <label>Notes <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span></label>
                  <textarea
                    value={videoNotes}
                    onChange={(e) => setVideoNotes(e.target.value)}
                    placeholder="Personal notes for this video..."
                  />
                </div>
              </div>
 
              <div className="modal-actions">
                <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="create" onClick={handleAddVideo}>Add Video</button>
              </div>
            </div>
          </div>
        )}
 
        {/* SETTINGS */}
        {showSettings && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Edit Path Title</h3>
                <X size={20} onClick={() => setShowSettings(false)} style={{ cursor: "pointer" }} />
              </div>
              <div className="modal-body">
                <div>
                  <label>Path Title</label>
                  <input
                    value={pathTitle}
                    onChange={(e) => setPathTitle(e.target.value)}
                    placeholder="Enter path title..."
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="cancel" onClick={() => setShowSettings(false)}>Cancel</button>
                <button className="create" onClick={() => setShowSettings(false)}>Save Changes</button>
              </div>
            </div>
          </div>
        )}
 
        {/* DELETE */}
        {showDelete && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Delete Path?</h3>
                <X size={20} onClick={() => setShowDelete(false)} style={{ cursor: "pointer" }} />
              </div>
              <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 4px" }}>
                Are you sure you want to delete <strong>"{pathTitle}"</strong>? This action cannot be undone.
              </p>
              <div className="modal-actions">
                <button className="cancel" onClick={() => setShowDelete(false)}>Cancel</button>
                <button
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "9px 18px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "14px",
                    fontFamily: "inherit"
                  }}
                  onClick={() => navigate("/")}
                >
                  Delete Path
                </button>
              </div>
            </div>
          </div>
        )}
 
        {/* Toast */}
        {showToast && <div className="toast">Learning path created!</div>}
      </div>
    </div>
  );
};
 
export default PathDetails;