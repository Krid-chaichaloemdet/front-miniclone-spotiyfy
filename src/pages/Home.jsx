
import { useAuth } from '../hooks/use-auth'
export default function Home() {

   const { song }  = useAuth();

    console.log(song)
  return (
    <div className='bg-black h-full p-10'>
        <table className="text-white w-full ">
            <thead className="text-gray-400">
                <tr className="">
                    <th className="p-1 ">#</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>time</th>
                </tr>
            </thead>

            {
                song?.map((data,i)=> {
                    return(

            <tbody key={i}>
                <tr className='text-white'>
                    <td className="text-gray-400">{data.id}</td>
                    <td>
                        <div className="flex gap-2 items-center">
                            <img src={data.songImage} alt="" className="bg-yellow w-9 h-9 rounded-md" />
                            <div>
                                <div>{data.songName}</div>
                                <div className="text-gray-400">{data.songBrand}</div>
                            </div>
                        </div>
                    </td>
                    <td className="text-gray-400">{data.songAlbum}</td>
                    <td className="text-gray-400">{data.songTime}:24</td>
                </tr>
            </tbody>
                    )
                })
            }
     

      
        </table>
    </div>
  )
}
