import React, { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { PiBellBold } from "react-icons/pi";
import { FaRegUserCircle, FaPlay ,FaMusic } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/use-auth";

export default function PlayList() {
  const [search, setSearch] = useState(null);
  const [searchDisplay, setSearchDisplay] = useState(null);
  const { singlePlayList, song } = useAuth();
//   console.log(singlePlayList[0].songId);
const [playlistAfterAdd, setPlaylistAfterAdd] =useState(null)
const [displayAfterAdd, setDisplayAfterAdd]=useState(null)
const [render, setRender] = useState(false)
// const [loading, setLoading]=useState(false)

// useEffect(()=>{
//     axios.post("http://localhost:8080/user/readSongAfterAdd",singlePlayList[0]?.id).then((res)=>{
//         return setDisplayAfterAdd(res.data)
//     })
// },[render])



const handleAddSongToPlayList = (data) => {

    setRender(true)
    axios.post("http://localhost:8080/user/addSongToPlayList",[data,{playListId : singlePlayList[0]?.id}]).then((res)=>{
  
        return singlePlayList[0].subplaylist.push(res.data)
    }).finally(()=>setRender(false))
}

  const handleSearch = () => {
    
    axios.get(`http://localhost:8080/user/search?q=${search}`).then((res) => {
      setSearchDisplay(res.data);
    });
    return;
  };
  const handleDeleteSongInPlayList = async(data) => {
    
    const id = data.id;
    await axios.delete(`http://localhost:8080/user/DeleteSongInPlayList/${id}`).then((res)=>{
        const afterDeleteSongInPlayList = singlePlayList[0].subplaylist.findIndex((el)=> {
            return el.id == res.data.id
        })
        console.log("index del",afterDeleteSongInPlayList)
        singlePlayList[0].subplaylist.splice(afterDeleteSongInPlayList, 1)
        return setRender(!render)
    })

  }

  console.log("playlis ID page",singlePlayList[0]?.subplaylist)



  return (
    <div className="bg-black h-full flex">
      <div className="bg-gray-900 bg-opacity-70  p- m-2 rounded-lg w-full h-full">
        <div className="flex justify-between bg-gray-500 rounded-md p-5">
          <div className="flex gap-3">
            <div className="bg-gray-800 text-xl w-7 h-7 rounded-full flex justify-center items-center text-white ">
              <IoIosArrowBack className="" />
            </div>
            <div className="bg-gray-800 text-xl w-7 h-7 rounded-full flex justify-center items-center text-gray-500">
              <IoIosArrowForward />
            </div>
            {/* <div className="flex items-center bg-gray-600 rounded-2xl w-72 p-1 gap-1">
            <HiOutlineSearch className="text-gray-200"/>
              <input 
            //   onChange={(e)=>setSearch(e.target.value)}
              placeholder="What do you want to listen to?" className=" bg-gray-600 w-72 text-white" type="text" />
            </div> */}
          </div>
          <div className="flex text-white items-center gap-2 ">
            <div className="text-white bg-black flex items-center w-28 rounded-2xl p-1 gap-1">
              <div>
                <IoArrowDownCircleOutline className="text-xl" />
              </div>
              <div>Install App</div>
            </div>
            <div>
              <PiBellBold className="text-xl" />
            </div>
            <div>
              <FaRegUserCircle className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-gray-500 h-1/4 rounded-md mt-1 flex items-center">
          <div className="h-40 w-40 bg-gray-800 m-5 shadow-2xl flex items-center justify-center text-7xl cursor-pointer">
          <FaMusic />
          </div>
          <div className="text-white">
            <div>Playlist</div>
            <div className="text-5xl font-extrabold">
              My Playlist # {singlePlayList[1]?.playListId}
            </div>
            <div>{"Krid Chaichaloemdet"}</div>
          </div>
        </div>
        {singlePlayList[0]?.subplaylist && (
          <div >
            <div className="bg-green-500 p-2 w-16 h-16 flex items-center justify-center rounded-full text-xl m-5">
              <FaPlay />
            </div>
              {/* <audio controls src="Jimi Hendrix - Hear My Train a Comin' (1).mp3"></audio> */}
            <table >
              <thead className="">
                <tr className="">
                  <th className="w-20 text-gray-400">#</th>
                  <th className="w-96  text-gray-400">Title</th>
                  <th className="w-96  text-gray-400"></th>
                  <th className="w-96  text-gray-400">Album</th>
                  <th className="w-96  text-gray-400">Date added</th>
                  <IoTimeOutline className="w-96 text-xl   text-gray-400" />
                </tr>
              </thead>
              {singlePlayList[0].subplaylist?.map((data, i) => {
                return (
          
                  <tbody className="border-y " key={i}>
                    <tr>
                      <th className="  text-gray-400">{"1"}</th>
                      <th className="   text-gray-400">
                        {song.map((el, i) => {
                          if (el.id == data.songId)
                            return (
                              <div className="flex items-center" key={i}>
                                <img src={el.songImage} className="w-10 h-10 m-1" alt="" />
                                <div>
                                  <div className="text-white text-xs">{el.songName}</div>
                                  <div className="text-xs">{el.songBrand}</div>
                                </div>
                              </div>
                            );
                        })}
                      </th>
                      <th className="   text-gray-400">
                        {song.map((el, i) => {
                          if (el.id == data.songId)
                            return (
                              <div className="" key={i}>
                                <div>{}</div>
                              </div>
                            );
                        })}
                      </th>
                      <th className="   text-gray-400">
                        {song.map((el, i) => {
                          if (el.id == data.songId)
                            return (
                              <div className="" key={i}>
                                <div className="text-xs">{el.songAlbum}</div>
                              </div>
                            );
                        })}
                      </th>
                      <th className="   text-gray-400">
                        {song.map((el, i) => {
                          if (el.id == data.songId)
                            return (
                              <div className="" key={i}>
                                <div>{"06/12/2566"}</div>
                              </div>
                            );
                        })}
                      </th>
                      <th className="   text-gray-400">
                        {song.map((el, i) => {
                          if (el.id == data.songId)
                            return (
                              <div className="" key={i}>
                                <div>{el.songTime}:49 </div>
                              </div>
                            );
                        })}
                      </th>
                      <th className="   text-gray-400">
                        {song.map((el, i) => {
                          if (el.id == data.songId)
                            return (
                              <div className="" key={i}>
                                <div 

                                // onClick={()=>console.log(data)}
                                onClick={ ()=> handleDeleteSongInPlayList(data)}
                                className="text-white cursor-pointer">Delete</div>
                              </div>
                            );
                        })}
                      </th>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        )}
        <div>
          <div className="flex flex-col items-center mt-5  rounded-2xl w-72 p-1 gap-1">
            <div className="text-white">
              {" "}
              Let's find something for your playlist
            </div>
            <div className="flex ml-10 gap-2">
              <HiOutlineSearch className="text-gray-200" />

              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch();
                }}
                placeholder="Search for songs or episode"
                className=" bg-gray-600 w-72 text-white rounded-2xl p-1"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="ml-5  mt-1 -my-5">
          <table>
            <thead>
              <tr className="">
                <th className="p-5 text-gray-900 opacity-0">pic</th>
                <th className="p-5 text-gray-900 opacity-0">namesong</th>
                <th className="p-5 text-gray-900 opacity-0">aaaa</th>
                <th className="p-5 text-gray-900 opacity-0">aaaa</th>
                <th className="p-5 text-gray-900 opacity-0">aaaa</th>
                <th className="p-5 text-gray-900 opacity-0">Album</th>
                <th className="p-5 text-gray-900 opacity-0">aaaa</th>
                <th className="p-5 text-gray-900 opacity-0">aaaa</th>
                <th className="p-5 text-gray-900 opacity-0">ADD</th>
              </tr>
            </thead>
            {searchDisplay?.map((data, i) => {
              return (
                <tbody key={i}>
                  <tr className="hover:bg-gray-700 p-1 ">
                    <td className="flex gap-4 items-center">
                      <img
                        src={data.songImage}
                        className="h-10 w-10 rounded-sm "
                        alt=""
                      />
                      <div className="">
                        <div className="text-white w-56">{data.songName}</div>
                        <div className="text-gray-400">{data.songBrand}</div>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-gray-400">{data.songAlbum}</td>
                    <td></td>
                    <td></td>
                    <td className="">
                      <div
                    onClick={()=>{
                        console.log(data,"sdsd")
                        handleAddSongToPlayList(data)
                    }}
                      className="border rounded-2xl flex items-center justify-center text-white cursor-pointer">
                        <div>Add</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
