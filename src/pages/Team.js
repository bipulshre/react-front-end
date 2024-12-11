import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Layout from "../components/Layout";
import "../css/Team.css";
import TeamModal from "../components/TeamModal";

const Team = () => {
    const [teamData, setTeamData] = useState([
        { id: 1, name: "Team Kathmandu" },
        { id: 2, name: "Team Chitwan" },
        { id: 3, name: "Team Biratnagar" },
    ]);

    const [isModalOpen, setModalOpen] = useState(false);

    const handleDelete = (id) => {
        setTeamData(teamData.filter((row) => row.id !== id));
    };

    const handleEdit = (id) => {
        const newName = prompt("Enter new name for the team:");
        if (newName) {
            setTeamData(teamData.map((row) => (row.id === id ? { ...row, name: newName } : row)));
        }
    };

    const handleCreate = (teamName) => {
        const newId = teamData.length ? Math.max(...teamData.map((team) => team.id)) + 1 : 1;
        setTeamData([...teamData, { id: newId, name: teamName }]);
        setModalOpen(false); // Close modal after creation
    };

    const columnDefs = [
        { headerName: "ID", field: "id", width: 100 },
        { headerName: "Name", field: "name", flex: 1 },
        {
            headerName: "Actions",
            cellRenderer: (params) => (
                <div className="actions">
                    <button className="action-button edit" onClick={() => handleEdit(params.data.id)}>
                        Edit
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(params.data.id)}>
                        Delete
                    </button>
                </div>
            ),
            width: 200,
        },
    ];

    return (
        <Layout>
            <div className="team-container">
                <h2 className="team-title">Team Management</h2>
                <button className="create-button" onClick={() => setModalOpen(true)}>
                    Create Team
                </button>
                <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                    <AgGridReact
                        rowData={teamData}
                        columnDefs={columnDefs}
                        domLayout="autoHeight"
                    />
                </div>
                <TeamModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleCreate}
                />
            </div>
        </Layout>
    );
};

export default Team;
