import { useDispatch, useSelector } from 'react-redux';
import { Error, SongCard, Loader } from '../components';
import { genres } from '../assets/constants';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/service/shazamCore';

const Discover = () => {
  const { genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || 'POP',
  );

  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading song..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className=" flex flex-col ">
      <div className=" flex justify-between items-center w-full mb-10 mt-4 sm:flex-row flex-col ">
        <h2 className=" text-white font-bold text-3xl text-left ">Discover {genreTitle}</h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className=" flex flex-wrap gap-6 sm:justify-start justify-center">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};
export default Discover;
