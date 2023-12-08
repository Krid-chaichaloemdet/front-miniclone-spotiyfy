import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();



export default function AuthContextProvider({ children }) {
    const [song, setSong] =useState([])
    const [singlePlayList, setSinglePlayList] =useState([])
    console.log("about to send to playlist page", singlePlayList)
    const searchSinglePlayList = (data) => {
        console.log(data)
        let displayId = data[1].disPlayPlaiListID
        axios.post("http://localhost:8080/user/searchSinglePlayList" ,data).then((res)=>{
            console.log("from backend",res.data)
            setSinglePlayList([res.data,{playListId : displayId}])
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:8080/user/getAllSongs").then((res)=>{
                    setSong(res.data)
                    
                })
            },[])
    return (
        <AuthContext.Provider value={{ song ,searchSinglePlayList ,singlePlayList}}>
          {children}
        </AuthContext.Provider>
      );
}