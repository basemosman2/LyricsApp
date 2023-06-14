import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import PlayPause from './PlayPause';
import { useGetTopChartsQuery } from '../redux/service/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper';

const TopChartsCard = ({
  song,
  i,
  activeSong,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className=" flex p-2 w-full rounded-lg hover:bg-[#4c426e]
    cursor-pointer items-center"
  >
    <div className=" flex justify-between items-center w-full">
      <span className=" text-white mr-2">{i + 1}.</span>
      <img
        src={song.images?.coverart}
        alt="cover"
        className=" w-[60px] h-[60px] rounded-lg"
      />
      <div className=" flex flex-col ml-2 flex-1 gap-1">
        <Link to={`/songs/${song?.key}`}>
          <h3 className=" text-white font-semibold">{song.title}</h3>
        </Link>
        <Link to={`/artists/${song?.artists[0]?.adamid}`}>
          <p className=" text-gray-300 ">{song.subtitle}</p>
        </Link>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        song={song}
      />
    </div>
  </div>
);

const TopPlay = () => {
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const topArtists = data?.slice(0, 6);

  console.log(topArtists);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ data, song, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div
      ref={divRef}
      className=" flex xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1
      xl:max-w-[400px] max-w-full mt-6"
    >
      <div className=" flex w-full flex-col">
        <div className=" flex justify-between items-center">
          <h2 className=" text-white font-bold text-2xl">Top Chart</h2>
          <Link to="/top-charts">
            <p className=" text-gray-300 text-base cursor-pointer">see more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topArtists?.map((song, i) => (song.artists && (
            <TopChartsCard
              song={song}
              i={i}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          )))}
        </div>
        <div className=" mt-4 w-full flex flex-col">
          <div className=" flex justify-between items-center">
            <h2 className=" text-white font-bold text-2xl">Top artists</h2>
            <Link to="/top-artists">
              <p className=" text-gray-300 text-base cursor-pointer">
                see more
              </p>
            </Link>
          </div>
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className=" mt-4"
          >
            {topArtists?.map((song) => (song.artists && (
              <SwiperSlide
                key={song.key}
                style={{ width: '20%', height: 'auto' }}
                className=" rounded-full shadow-lg animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                  <img
                    src={song?.images?.background}
                    alt="artists"
                    className=" rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            )))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
