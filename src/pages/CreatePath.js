import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const CreatePath = () => {
  const navigate = useNavigate();

  //state for inputs
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!title.trim()) {
      alert("Path title is required");
      return;
    }

    //pass data to next page
    navigate("/path", {
      state: {
        title,
        category,
        description
      }
    });
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        {/* Back */}
        <div className="back" onClick={() => navigate("/")}>
          <ArrowLeft size={18} /> Dashboard
        </div>

        {/* Card */}
        <div className="create-card">
          <h2>Create New Path</h2>
          <p>Set up a new topic you want to master.</p>

          {/* Title */}
          <label>Path Title</label>
          <input
            placeholder="e.g., Advanced React Patterns"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Category */}
          <label>Category (Optional)</label>
          <input
            placeholder="e.g., Programming, Design, Business"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          {/* Description */}
          <label>Description (Optional)</label>
          <textarea
            placeholder="What will you learn in this path? Why is it important?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Buttons */}
          <div className="actions">
            <button className="cancel" onClick={() => navigate("/")}>
              Cancel
            </button>

            <button className="create" onClick={handleCreate}>
              Create Path
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePath;
