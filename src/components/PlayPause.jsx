import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({
  artistId,
  song,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div>
    {isPlaying && activeSong?.title === song?.title ? (
      <FaPauseCircle
        size={40}
        onClick={handlePauseClick}
        className=" text-gray-300"
      />
    ) : (
      <FaPlayCircle
        size={40}
        onClick={handlePlayClick}
        className="text-gray-300"
      />
    )}
  </div>
);

export default PlayPause;
