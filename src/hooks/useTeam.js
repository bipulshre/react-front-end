import React, {useCallback, useState} from "react";
import teamService from "../services/teamService";

const useTeam = (callback, deps)=>{
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

    const deleteTeam = useCallback(async (id) => {
        setLoading(true)
        setError(null)
        try {
            const teams = await teamService.deleteTeam(id)
            fetchTeams()
        } catch (e) {
            setError("Failed to delete item")
        } finally {
            setLoading(false)
        }
    }, deps)

    return {
        teamData,
        loading,
        error,
        fetchTeams,
        deleteTeam
    };
}

export default useTeam;