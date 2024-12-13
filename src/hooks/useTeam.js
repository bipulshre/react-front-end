import React, {useCallback, useState} from "react";
import teamService from "../services/teamService";

const useTeam = ()=>{
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchTeams = useCallback(async ()=>{
        setLoading(true)
        setError(null)
        try{
            const teams = await teamService.fetchTeams()
            setTeamData(teams)
        }
        catch (e){
            setError("Failed to fetch item")
        }finally {
            setLoading(false)
        }
    }, []);

    return {
        teamData,
        loading,
        error,
        fetchTeams,
    };
}

export default useTeam;