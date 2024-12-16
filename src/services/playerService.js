import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/players";

const playerService = {

    fetchPlayer: async ()=>{
        return await axios.get(API_BASE_URL)
    },
}

export default playerService;