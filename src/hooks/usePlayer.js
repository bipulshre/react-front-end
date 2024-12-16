import React, {useCallback, useState} from "react";
import playerService from "../services/playerService";

const usePlayer = (callBack, deps) => {

    const [playerData, setPlayerData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchPlayer = useCallback( async ()=>{
        setLoading(true)
        setError(null)
        try {
            const players = await playerService.fetchPlayer()
            const cleanedPlayers = players.data.map(item => ({
                ...item,
                team: item.team.name
            }));
            setPlayerData(cleanedPlayers)
        }catch (e){
            console.error("cannot fetch the players")
        }finally {
            setLoading(false)
        }
    }, [])

    return{
        loading,
        error,
        playerData,
        fetchPlayer
    }
}

export default usePlayer