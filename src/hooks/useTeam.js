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

    const createTeam = useCallback(async (name) =>{
        setLoading(true)
        setError(null)
        try{
            const teams = await teamService.createTeam(name)
            fetchTeams()
        }catch (e){
            setError("Failed to create Team");
        }finally {
            setLoading(false)
        }
    });

    const editTeam = useCallback(async (id,name)=>{
        setLoading(true)
        setError(null)
        try{
            const teams = await teamService.editTeam(id,name)
            fetchTeams()
        }catch (e){
            setError("Failed to create Team");
        }finally {
            setLoading(false)
        }
    })

    return {
        teamData,
        loading,
        error,
        fetchTeams,
        createTeam,
        deleteTeam,
        editTeam
    };
}

export default useTeam;