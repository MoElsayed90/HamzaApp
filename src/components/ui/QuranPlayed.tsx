import { useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  audioUrl: string;
}

const QuranPlayed: React.FC<IProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null); // Use useRef to store the audio element

  const handlePlayPause = useCallback(() => {
    const audioElement = audioElementRef.current;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    // Initialize the audio element with the audioUrl
    audioElementRef.current = new Audio(audioUrl);

    return () => {
      // Cleanup: pause and reset audio when component unmounts or audioUrl changes
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.currentTime = 0;
      }
    };
  }, [audioUrl]); // Re-run effect when audioUrl changes

  return (
    <>
      <div className="bg-[#f2f3fa] flex justify-center items-center min-h-screen">
        <div className="bg-white w-full max-w-[768px] flex justify-start items-center p-8 relative max-h-40 shadow-sm rounded-md">
          <img
            src="https://a10.gaanacdn.com/gn_img/albums/P7m3GvNKqx/7m3GVZx5Kq/size_l.jpg"
            className="rounded-xl w-[170px] mt-16"
          />
          <p className="pl-9 text-2xl font-semibold grow">
            Roxette
            <br />
            <span className="text-lg font-normal">Sleeping in my car</span>
          </p>
          <span
            className="clear-left rounded-full bg-[#eff0f9] p-4 cursor-pointer group [&_*]:transition-all [&_*]:duration-150 [&_*]:ease-in"
            onClick={handlePlayPause}
          >
            <span className="px-3 py-3 block bg-white rounded-full shadow-md group-hover:bg-rose-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:fill-white group-hover:stroke-white"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#7e9cff"
                fill="#7e9cff"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 4v16l13 -8z" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default QuranPlayed;
