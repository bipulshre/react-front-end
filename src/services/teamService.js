import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/teams";

const teamService = {
    fetchTeams: async ()=>{
        const response = await axios.get(API_BASE_URL)
        if (!Array.isArray(response.data)) {
            throw new Error("Invalid response format");
        }
        return response.data.map(item =>{
            const {players, ...rest} = item
            return rest;
        })
    },

    deleteTeam : async (id) =>{
        return await axios.delete(`${API_BASE_URL}/${id}`)
    }
}

export default teamService;