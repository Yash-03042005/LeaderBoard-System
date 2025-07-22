import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import {toast} from 'react-toastify'
import { useEffect } from "react";

export const AppContext  = createContext();

const AppContextProvider = (props)=>{

    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [users, setUsers] = useState([]);

    const [claimHistory,setClaimHistory] = useState([])

    const getAllUsers = async () => {

    try {

      const { data } = await axios.get(`${backendUrl}/api/user/all-users`);
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message) 
      }
    } catch (error) {
      console.error( error);
      toast.error(error.message)
    }
  };

  const getAllClaimHistory = async()=>{

    try{
      const {data} = await axios.get(backendUrl + '/api/user/list-history',)

      if(data.success){
        setClaimHistory(data.history)
        console.log(data.history)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.error(error)
      toast.error(error.message)
    } 
  }

  

  useEffect(()=>{

    getAllUsers(),
    getAllClaimHistory()
    
  },[])

    const value={

      backendUrl,getAllUsers,users, setUsers,getAllClaimHistory,claimHistory

    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider