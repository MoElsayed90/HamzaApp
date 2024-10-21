import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { AudioPlayer } from "react-audio-play"
import AudioPlayer from "react-h5-audio-player"
import { SuraTitles } from "../interfaces";

const Author = () => {
  const { id, authorId } = useParams();
  const [author, setAuthor] = useState({
    title: "",
    description: ""
  })
  const [items, setItems] = useState([])
  const [titles, setTitles] = useState([]);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/get-author/${authorId}/ar/json`)
        const res = await data.json();
        console.log(res)
        const itemsResponse = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-recitation/${id}/ar/json`)
        const itemsData = await itemsResponse.json();
        console.log(itemsData.attachments)
        // const itemsResponse = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/get-author-items/${id}/quran/ar/ar/1/50/json`);
        // const itemsData = await itemsResponse.json();
        // console.log(itemsData)
        setAuthor(res)
        setItems(itemsData.attachments)
      } catch (error) {
        console.log(error, "error here")
      }

    }
    fetchData()
  }, [id, authorId])
  // useEffect(()=>{
  //   const fetchSura = async()=>{
  //    try {
  //       const sura = await fetch("https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-category/462298/ar/json")
  //       const suraData = await sura.json()
  //       console.log(suraData)
  //    } catch (error) {
  //     console.log(error)
  //    }
  //   }
  //   fetchSura()
  // },[])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/get-author-items/${id}/showall/ar/ar/1/50/json`)
  //       const res = await data.json();
  //       console.log(res)
  //       setAuthor(res)
  //     } catch (error) {
  //       console.log(error)
  //     }

  //   }
  //   fetchData()
  // }, [id])
  // Fetch the titles
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-category/462298/ar/json");
        const titlesData = await response.json();
        console.log(titlesData.suras)
        setTitles(titlesData.suras);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };
    fetchTitles();
  }, []);
  // Function to handle play event
  // const audioElement = new Audio();

  // let pauseTime = 0;

  // const handlePlayAudio = (audioUrl: string) => {
  //   audioElement.src = audioUrl;

  //   if (audioElement.paused) {
  //     audioElement.currentTime = pauseTime;
  //     audioElement.play();
  //   } else {
  //     pauseTime = audioElement.currentTime;
  //     audioElement.pause();
  //   }
  // };
  const [audioUrl, setAudioUrl] = useState('');

  const handlePlayAudio = (audioUrl: string) => {
    setAudioUrl(audioUrl);
    setShowAudioPlayer(true);
  };
  const handleDownloadAudio = (audioUrl: string) => {
    const link = document.createElement('a');
    link.href = audioUrl;
    const filename = audioUrl.split('/').pop() || 'file'; // default filename
    link.download = filename;
    link.click();
    link.remove(); // remove the link to prevent multiple downloads
  };
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTitles = titles.filter((sura: SuraTitles) => {
    return sura.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-5 px-8">
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className=" text-2xl font-extrabold text-appcolor">المصحف المرتل</h1>
        <div className="collapse bg-base-200 collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title pl-2 text-xl font-medium justify-center items-center">
            <span>
              <p> القارئ : {author.title} </p>
            </span>
          </div>
          <div className="collapse-content flex justify-center items-center flex-col space-y-3 ">
            <span className="text-sm my-5">{author.description}</span>

            {/* {
              items.map((item: { title: string; id: number }) => (
                <>
                  <div key={item.id} tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
                    <div key={item.id} className="collapse-title text-xl font-medium">
                      {item.title}
                    </div>
                    <div className="collapse-content">
                      <p></p>
                    </div>



                  </div>
                </>
              ))
            } */}
          </div>

        </div>
        <div className="flex items-center justify-center ">

          <label className="input input-bordered flex justify-center items-center gap-2">
            <input
              type="text"
              placeholder="البحث بأسم السورة .. "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-7"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full ">

          {/* <div className="flex justify-center items-center">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title"
            />
          </div> */}
          {
            filteredTitles.map((sura: { id: number; title: string; url: string }, index) => (
              <div key={sura.id} className="card bg-appcolor shadow-xl flex justify-center items-center  cursor-pointer transition ease-in-out delay-150   hover:scale-105  duration-300"  onClick={() => handlePlayAudio(items[index].url)}>
                {items[index] && (
                  <>
                    <div className="p-5 text-base-content/70 text-xs text-white font-semibold">
                      <button>
                        {sura.title}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          }
        </div>
        {showAudioPlayer && (
          <div className="fixed bottom-5 left-0 right-0 p-4 flex justify-center items-center  ">
            <AudioPlayer
              src={audioUrl}
              showDownloadProgress
              autoPlay
              layout="horizontal-reverse"
              timeFormat="hh:mm:ss"

            />
            <button onClick={() => handleDownloadAudio(audioUrl)} className="btn mx-3 bg-[#bdbc59] ">
              تحميل
            </button>
            <button onClick={() => setShowAudioPlayer(false)} className="btn mx-3 bg-[#bdbc59]">
              Close
            </button>
          </div>

        )}


        {/* <div className="grid grid-cols-2 gap-4">
          {titles.map((sura, index) => (
            <div className="">
              <div key={sura.id} className="flex items-center justify-center">
                {items[index] && (
                  <><div className=" px-5">
                    <span onClick={() => handlePlayAudio(items[index].url, index)}>
                      {sura.title}
                    </span>
                  </div>
                    {selectedIndex === index && (
                      <AudioPlayer
                        className="custom-style"
                        src={audioUrl}
                        width={"24rem"}
                      />
                    )}
                  </>
                )}


              </div>
            </div>
          ))}
        </div> */}
      </div>


      {/* <div className="space-y-3 px-5">
        {
          items.map((item: { title: string; id: number }) => (
            <div key={item.id} className="card bg-appcolor shadow-xl grid-cols-1 cursor-pointer transition ease-in-out delay-150   hover:scale-105  duration-300 " >
              <NavLink to={`/quran/{author.id}`} className="card-body  flex justify-center items-center md:m-3 ">
                <p className="  text-base-content/70 text-xs text-white font-semibold">{item.title}</p>
              </NavLink>
              {item.attachments.map((attachment, index) => (
                <audio key={index} controls>
                  <source src={attachment.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ))}
            </div>
          ))
        }


      </div> */}
    </div >
  )

}

export default Author;