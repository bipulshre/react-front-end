import React, {useEffect, useState} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Layout from "../components/Layout";
import "../css/Team.css";
import TeamModal from "../components/TeamModal";
import useTeam from "../hooks/useTeam";


const Team = () => {
    // const [teamData, setTeamData] = useState([]);

    const {
        teamData,
        loading,
        error,
        deleteTeam,
        createTeam,
        fetchTeams,
        editTeam
    } = useTeam()

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchTeams()
    }, [fetchTeams]);

    const handleDelete = (id) => {
        deleteTeam(id)
    };

    const handleEdit = (id) => {
        const newName = prompt("Enter new name for the team:");
        if (newName) {
            editTeam(id,newName)
        }
    };

    const handleCreate = (teamName) => {
        createTeam(teamName).then(r => setModalOpen(false) )

    };


    const columnDefs = [
        { headerName: "ID", field: "id", width: 100 },
        { headerName: "Name", field: "name", flex: 1 },
        {
            headerName: "Actions",
            cellRenderer: (params) => (
                <div className="actions">
                    <button className="action-button edit" onClick={() => handleEdit(params?.data?.id, params?.data?.name)}>
                        Edit
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(params?.data?.id)}>
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
                        key={teamData.length}
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
