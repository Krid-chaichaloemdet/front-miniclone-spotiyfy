import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { PiBellBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Search() {
const [search, setSearch] =useState(null)
// useEffect(()=>{

//   axios.post("http://localhost:8080/user/search",search).then((res)=>console.log(res))
// },[])

console.log(singlePlayList)
  return (
    <div className="bg-black h-full flex">
      <div className="bg-gray-900 bg-opacity-70  p-5 m-2 rounded-lg w-full h-full">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="bg-gray-800 text-xl w-7 h-7 rounded-full flex justify-center items-center text-white ">
              <IoIosArrowBack className="" />
            </div>
            <div className="bg-gray-800 text-xl w-7 h-7 rounded-full flex justify-center items-center text-gray-500">
              <IoIosArrowForward />
            </div>
            <div className="flex items-center bg-gray-600 rounded-2xl w-72 p-1 gap-1">
            <HiOutlineSearch className="text-gray-200"/>
              <input 
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="What do you want to listen to?" className=" bg-gray-600 w-72 text-white" type="text" />
            </div>
          </div>
          <div className="flex text-white items-center gap-2">
                <div className="text-white bg-black flex items-center w-28 rounded-2xl p-1 gap-1">
                    <div><IoArrowDownCircleOutline className="text-xl"/></div>
                    <div>Install App</div>
                </div>
                <div>
                <PiBellBold className="text-xl"/>
                </div>
                <div>
                <FaRegUserCircle className="text-xl"/>
                </div>
          </div>
        </div>
        <div className="text-gray-200 flex gap-3 mt-5">
            <div className="bg-gray-800 p-1 rounded-2xl pr-3 pl-3">All</div>
            <div className="bg-white text-black p-1 rounded-2xl pr-3 pl-3">Songs</div>
            <div className="bg-gray-800 p-1 rounded-2xl pr-3 pl-3">Playlists</div>
            <div className="bg-gray-800 p-1 rounded-2xl pr-3 pl-3">Albums</div>
            <div className="bg-gray-800 p-1 rounded-2xl pr-3 pl-3">Artists</div>
            <div className="bg-gray-800 p-1 rounded-2xl pr-3 pl-3">Profiles</div>
            <div className="bg-gray-800 p-1 rounded-2xl pr-3 pl-3">Podcasts & Shows</div>
        </div>
        <table className="text-white w-full ">
            <thead className="text-gray-400">
                <tr className="">
                    <th className="p-1 ">#</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-gray-400">1</td>
                    <td>
                        <div className="flex gap-2 items-center">
                            <img src="" alt="" className="bg-yellow w-9 h-9 rounded-md" />
                            <div>
                                <div>And I love her - Remastered 2009</div>
                                <div className="text-gray-400">The Beatles</div>
                            </div>
                        </div>
                    </td>
                    <td className="text-gray-400">A Hard Day's Night (Remastered)</td>
                    <td className="text-gray-400">2:29</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
