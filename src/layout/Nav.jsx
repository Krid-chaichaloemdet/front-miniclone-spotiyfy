import { FaSpotify, FaRegFolder, FaRegUserCircle } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoSearch, IoClose } from "react-icons/io5";
import { VscLibrary } from "react-icons/vsc";
import { FaPlus, FaArrowRight } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import { BsPinAngleFill } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import { useEffect, useState } from "react";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { SiYoutubemusic } from "react-icons/si";
import { MdOutlineFormatListBulleted, MdPostAdd } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";


import axios from "axios";
function Nav() {
  const navigate = useNavigate();

  const { searchSinglePlayList } = useAuth()
  const [isOpenCreatePlayList, setIsOpenCreatePlayList] = useState(false);

  const [isOpenSelectPlayList, setIsOpenSelectPlayList] = useState(false);

  const [isOpenDeletePlayList, setIsOpenDeletePlayList] = useState(false);

  const [dataPlayList, setDataPlayList] =useState(null)

  const [allPlayList, setAllPlayList] = useState(null);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [targetDel, setTargetDel] = useState(null);
  const [change,setChange]=useState(null)

  console.log(dataPlayList)
  useEffect(() => {
    axios
      .post("http://localhost:8080/user/getAllPlayList", 1)
      .then((res) => setAllPlayList(res.data));
  }, [change]);
  const handleDeletePlayList = async () => {
    await axios
    .post("http://localhost:8080/user/delete", targetDel)
    .then((res) => {
      const afterDel = allPlayList.findIndex((el) => {
        return el.id == res.data.id;
      });
      
allPlayList.splice(afterDel, 1)
setChange(allPlayList)
      return setIsOpenDeletePlayList(!isOpenDeletePlayList);
    });
  };
  useEffect(() => {
    const handleClick = () => setIsOpenDeletePlayList(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);



  const handleCreatePlayList = async () => {
    await axios.post("http://localhost:8080/user/create", 1).then((res) => {
      allPlayList.push(res.data);
      return setIsOpenCreatePlayList(!isOpenCreatePlayList);
    });
  };


  return (
    <div className="flex  bg-black items-center h-full  w-4/12  justify-start">
      <div className="h-full w-full bg-black">
        <div className="flex flex-col bg-gray-900 bg-opacity-70 rounded-md m-2 p-4  ">
          <div className="flex items-center">
            <FaSpotify className="text-white" />
            <div className="text-white">Spotify</div>
          </div>
          <div
            onClick={() => navigate("")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <GoHomeFill className="text-gray-300 group-hover:text-white" />
            <div className="text-gray-300 group-hover:text-white">Home</div>
          </div>
          <div
            onClick={() => navigate("search")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <IoSearch className="text-gray-300 group-hover:text-white" />
            <div className="text-gray-300 group-hover:text-white">Search</div>
          </div>
        </div>

        <div className="h-5/6  m-2 p-2 rounded-md bg-gray-900 bg-opacity-70 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center p-1">
                <VscLibrary className="text-gray-300" />
                <div className="text-gray-300">Your Library</div>
              </div>
              <div className="flex gap-5">
                <FaPlus
                  onClick={() => setIsOpenCreatePlayList(!isOpenCreatePlayList)}
                  className="text-gray-300 cursor-pointer"
                />
                <FaArrowRight className="text-gray-300" />
              </div>
              {isOpenCreatePlayList && (
                <div className="bg-gray-500 p-2 w-56 shadow-2xl mx-72 translate-y-12 absolute rounded-sm flex flex-col gap-2">
                  <div
                    onClick={handleCreatePlayList}
                    className="flex gap-4 items-center text-white cursor-pointer hover:bg-gray-400"
                  >
                    <div>
                      <VscGitPullRequestCreate />
                    </div>
                    <div className="">Create a new playlist</div>
                  </div>
                  <div className="flex gap-4 items-center text-white cursor-pointer hover:bg-gray-400">
                    <div>
                      <FaRegFolder />
                    </div>
                    <div className="">Create a new folder</div>
                  </div>
                </div>
              )}
            </div>
            {isOpenSelectPlayList ? (
              <div className="flex gap-2 mt-5">
                <div
                  onClick={() => setIsOpenSelectPlayList(!isOpenSelectPlayList)}
                  className="bg-gray-500 w-7 h-7 rounded-full p-1 flex items-center justify-center text-xl cursor-pointer"
                >
                  <IoClose />
                </div>
                <div className="bg-white w-16 rounded-full text-xs p-1 flex items-center justify-center">
                  <div>Playlists</div>
                </div>
                <div className="bg-gray-600 text-white w-16  text-xs rounded-full p-1 flex items-center justify-center">
                  <div>By you</div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsOpenSelectPlayList(!isOpenSelectPlayList)}
                className="bg-gray-600 mt-5 w-16 rounded-full text-white cursor-pointer text-xs p-1 flex items-center justify-center"
              >
                <div>Playlists</div>
              </div>
            )}

            <div className="flex justify-between items-center mt-2 p-1">
              <div className="text-gray-300">
                <IoSearch />
              </div>
              <div
                className="flex
                 gap-1 items-center text-gray-300"
              >
                <div>Recents</div>
                <div className="text-gray-300">
                  <MdOutlineFormatListBulleted />
                </div>
              </div>
            </div>
            {/* <Search className="hidden"></Search> */}
            {/* <div className="bg-gray-400 p-3 rounded-md w-full mt-5">
            <div className="text-white text-sm">Create your first playlist</div>
            <div className="text-white text-xs">It's easy, we'll help you</div>
            <div className="bg-white p-1 mt-4 rounded-2xl flex items-center justify-center w-28">
              <div className="text-xs font-semibold">Create playlist</div>
            </div>
          </div> */}

            {/* <div className="bg-gray-400 p-3 rounded-md w-full mt-5">
              <div className="text-white text-sm">Let's find some podcasts to follow</div>
              <div className="text-white text-xs">We'll keep you update on new episodes</div>
              <div className="bg-white p-1 mt-4 rounded-2xl flex items-center justify-center w-28">
              <div className="text-xs font-semibold">Browse podcasts</div>
            </div>
          </div> */}
            <div className="flex mt-2 gap-2 p-1">
              <div className="bg-blue-500 w-10 h-10 rounded-sm flex items-center  justify-center">
                <IoIosHeart className="text-white" />
              </div>
              <div>
                <div className="text-white">Liked Songs</div>
                <div className="flex items-center gap-2">
                  <BsPinAngleFill className="text-green-400" />
                  <div className="text-gray-400 text-xs">3 songs</div>
                </div>
              </div>
            </div>

            {allPlayList?.map((data, i) => {
              return (
                <div
                  key={i}
                  onContextMenu={(e) => {
                    e.preventDefault();
               
                    setTargetDel({ id: data.id });
                    setIsOpenDeletePlayList(true);
                    setPoints({ x: e.pageX, y: e.pageY });
                  }}
                  onClick={() => {
                    searchSinglePlayList([data, { disPlayPlaiListID : i+1}])
                   return navigate("playlist")}}
                  className="flex mt-5 gap-2 hover:bg-gray-500 cursor-pointer p-1 rounded-sm"
                >
                  <div className="bg-red-300 w-10 h-10 rounded-sm flex items-center justify-center">
                    <SiYoutubemusic className="text-white" />
                  </div>

                    {
                 

                  <div key={i}>
                    <div className="text-white">My Playlist { i+1}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-gray-400 text-xs">
                        Krid Chaichaloemdet
                      </div>
                    </div>
                  </div>
                        
                      }
                    
                </div>
              );
            })}
            {isOpenDeletePlayList && (
              <div
                style={{ top: `${points.y}px`, left: `${points.x}px` }}
                className={`text-white absolute w-56 p-1 rounded-sm shadow-2xl h-auto bg-gray-800 flex flex-col gap-2`}
              >
                <div className="flex items-center gap-2 hover:bg-gray-500 p-3 rounded-sm cursor-pointer">
                  <div>
                    <MdPostAdd />
                  </div>
                  <div>Add to queue</div>
                </div>
                <div className="flex items-center gap-2 hover:bg-gray-500 p-3 rounded-sm cursor-pointer">
                  <div>
                    <FaRegUserCircle />
                  </div>
                  <div>Remove from profile</div>
                </div>
                <div
                  onClick={handleDeletePlayList}
                  className="flex items-center gap-2 hover:bg-gray-500 p-3 rounded-sm cursor-pointer"
                >
                  <div>
                    <TiDeleteOutline />
                  </div>
                  <div>Delete</div>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="flex m-3 gap-1">
              <div className="text-white text-xs">Legal</div>
              <div className="text-white text-xs">Privacy Center</div>
              <div className="text-white text-xs">Privacy Policy</div>
              <div className="text-white text-xs">Cookies</div>
            </div>
            <div className="flex border rounded-2xl w-20 items-center p-1">
              <MdLanguage className="text-white" />
              <div className="text-white">English</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
