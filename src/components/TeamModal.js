import React, { useState } from "react";
import "../css/TeamModal.css"; // Import any modal-specific styles

const TeamModal = ({ isOpen, onClose, onSubmit }) => {
    const [teamName, setTeamName] = useState("");

    if (!isOpen) return null; // Prevent rendering if the modal is not open

    const handleSubmit = (e) => {
        e.preventDefault();
        if (teamName.trim()) {
            onSubmit(teamName);
            setTeamName(""); // Clear input after submission
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Create New Team</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="teamName">Team Name:</label>
                    <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                    />
                    <div className="modal-actions">
                        <button type="submit" className="modal-submit">
                            Create
                        </button>
                        <button type="button" className="modal-cancel" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamModal;
