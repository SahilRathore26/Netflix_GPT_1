import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-20 pl-10 md:pt-52 md:pl-14 absolute text-white bg-gradient-to-b from-black w-full aspect-video z-10">
      <h1 className="text-lg md:text-6xl font-bold my-4 md:my-8">{title}</h1>
      <p className="hidden md:inline-block w-2/6 md:py-2 text-lg">{overview}</p>
      <div className="my-0 md:my-5 ">
        <button className="bg-white text-black h-8 md:h-12 py-1 px-3 md:py-2 md:px-6 text-xs md:text-xl font-semibold rounded-sm md:rounded-lg hover:bg-opacity-80">
          <FontAwesomeIcon icon={faPlay} size="lg" /> Play
        </button>
        <button className="bg-neutral-600 bg-opacity-70 text-white h-8 md:h-12 py-1 md:py-2 px-3 md:px-8 text-xs md:text-xl font-semibold rounded-sm md:rounded-lg mx-2">
          <FontAwesomeIcon icon={faCircleInfo} /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
