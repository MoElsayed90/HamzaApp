import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import { SuraTitles } from "../interfaces";

interface Item {
  id: number;
  title: string;
  url: string; // Explicitly adding the 'url' property
}

const Author = () => {
  const { id, authorId } = useParams();
  const [author, setAuthor] = useState({
    title: "",
    description: ""
  });
  const [items, setItems] = useState<Item[]>([]); // Explicitly typing items
  const [titles, setTitles] = useState<SuraTitles[]>([]);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorData = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/get-author/${authorId}/ar/json`);
        const authorJson = await authorData.json();
        const itemsResponse = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-recitation/${id}/ar/json`);
        const itemsJson = await itemsResponse.json();
        
        setAuthor(authorJson);
        setItems(itemsJson.attachments); // Assuming attachments have 'id', 'title', and 'url' properties
      } catch (error) {
        console.log(error, "Error fetching author or items");
      }
    };

    fetchData();
  }, [id, authorId]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-category/462298/ar/json");
        const titlesJson = await response.json();
        setTitles(titlesJson.suras);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };
    fetchTitles();
  }, []);

  const filteredTitles = titles.filter((sura: SuraTitles) => {
    return sura.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
          {filteredTitles.map((sura: SuraTitles, index) => (
            <div key={sura.id} className="card bg-appcolor shadow-xl flex justify-center items-center cursor-pointer transition ease-in-out delay-150 hover:scale-105 duration-300" onClick={() => handlePlayAudio(items[index].url)}>
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
          ))}
        </div>
        {showAudioPlayer && (
          <div className="fixed bottom-5 left-0 right-0 p-4 flex justify-center items-center">
            <AudioPlayer
              src={audioUrl}
              showDownloadProgress
              autoPlay
              layout="horizontal-reverse"
              timeFormat="hh:mm:ss"
            />
            <button onClick={() => handleDownloadAudio(audioUrl)} className="btn mx-3 bg-[#bdbc59]">
              تحميل
            </button>
            <button onClick={() => setShowAudioPlayer(false)} className="btn mx-3 bg-[#bdbc59]">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Author;
