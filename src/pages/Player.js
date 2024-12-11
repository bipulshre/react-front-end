import React, {useState} from "react";
import Layout from "../components/Layout";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import '../css/player.css'
import PlayerModal from "../components/PlayerModal";

const Player = () => {

    const [playerData, setPlayerData] = useState([
        {id: 1, name: "Ram", position: "Goal Keeper", team: "Kathmandu Kings"},
        {id: 2, name: "Shyam", position: "Defender", team: "Kathmandu Kings"},
        {id: 3, name: "Hari", position: "Mid fielder", team: "Kathmandu Kings"},
        {id: 4, name: "Krishna", position: "Striker", team: "Kathmandu Kings"},

    ])

    const [isModalOpen, setModalOpen] = useState(false);

    const handleDelete = ()=>{

    }

    const handleEdit = ()=>{

    }

    const handleCreate = ()=>{

    }

    const columnDefs = [
        { headerName: "ID", field: "id", width: 100 },
        { headerName: "Name", field: "name", width: 100 },
        { headerName: "Position", field: "position", width: 200 },
        { headerName: "Team", field: "team", width: 200 },
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
            flex: 200,
        },
    ];

    return (
        <Layout>
                <div className="team-container">
                    <h2 className="team-title">Player Management</h2>
                    <button className="create-button" onClick={() => setModalOpen(true)}>
                        Create Player
                    </button>
                    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                        <AgGridReact
                            rowData={playerData}
                            columnDefs={columnDefs}
                            domLayout="autoHeight"
                        />
                    </div>
                    <PlayerModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onSubmit={handleCreate}
                    />
                </div>
        </Layout>
    );

};

export default Player;