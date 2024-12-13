import React, {useEffect, useState} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Layout from "../components/Layout";
import "../css/Team.css";
import TeamModal from "../components/TeamModal";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/teams";

const Team = () => {
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const [isModalOpen, setModalOpen] = useState(false);

    const fetchItem = async () => {
        try{
            setLoading(true);
            const response = await axios.get(API_BASE_URL)
            const cleanedData = response.data.map(item =>{
                const {players, ...rest} = item
                return rest;
            })
            console.log(cleanedData)
            setTeamData(cleanedData)
        }catch (e) {
            console.log("error occured")
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItem()
    }, []);

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
