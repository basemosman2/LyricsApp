import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div className=" flex flex-col w-[240px] backdrop-blur-sm bg-white/5 p-4 rounded-lg animate-slideup opacity-80 cursor-pointer">
      <div className=" relative h-56 group w-full">
        <div
          className={`absolute inset-0 justify-center items-center bg-black opacity-70 group-hover:flex ${
            activeSong?.title === song.title ? 'flex opacity-80' : 'hidden'
          }`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </div>
        <img src={song.images?.coverart} alt="song_img" />
      </div>
      <div className=" mt-4 flex flex-col">
        <p className=" font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className=" text-sm text-gray-300 truncate mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : '/top-artists'
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
