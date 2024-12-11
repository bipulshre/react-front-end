import React, { useState } from "react";
import "../css/PlayerModal.css";

const PlayerModal = ({ isOpen, onClose, onSubmit }) => {
    const [playerName, setPlayerName] = useState("");
    const [playerPosition, setPlayerPosition] = useState("");


    if (!isOpen) return null; // Prevent rendering if the modal is not open

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            onSubmit(playerName);
            setPlayerName(""); // Clear input after submission
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Create New Player</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="playerName">Player Name:</label>
                        <input
                            type="text"
                            id="playerName"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="playerPosition">Player Position:</label>
                        <input
                            type="text"
                            id="playerPosition"
                            value={playerPosition}
                            onChange={(e) => setPlayerPosition(e.target.value)}
                            required
                        />
                    </div>

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

export default PlayerModal;
