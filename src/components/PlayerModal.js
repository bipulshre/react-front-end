import React, {useEffect, useState} from "react";
import "../css/PlayerModal.css";
import useTeam from "../hooks/useTeam";

const PlayerModal = ({ isOpen, onClose, onSubmit }) => {
    const [playerName, setPlayerName] = useState("");
    const [playerPosition, setPlayerPosition] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");

    const {
        teamData,
        fetchTeams,
    } = useTeam()

    // Fetch team options when the modal is opened
    useEffect(() => {
        if (isOpen) {
            fetchTeams();

        }
    }, [isOpen,fetchTeams]);

    if (!isOpen) return null; // Prevent rendering if the modal is not open

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim() && selectedTeam) {
            // Pass playerName and selectedTeam to the onSubmit callback
            onSubmit({ playerName, playerPosition, selectedTeam });
            setPlayerName(""); // Clear input after submission
            setPlayerPosition(""); // Clear player position
            setSelectedTeam(""); // Clear selected team
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

                    <div>
                        <label htmlFor="teamSelect">Select Team:</label>
                        <select
                            id="teamSelect"
                            value={selectedTeam}
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            required
                        >
                            <option value="">-- Select a Team --</option>
                            {teamData.map((team) => (
                                <option key={team.id} value={team.name}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
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
