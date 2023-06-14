import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.attributes;

  return (
    <div className=" relative w-full flex felx-col my-8">
      <div className=" w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
        <div className=" absolute inset-0 items-center flex">
          <img
            src={
              artistId
                ? artist.artwork?.url
                : songData?.images?.coverart
            }
            className=" sm:w-48 sm:h-48 w-28 h-28 rounded-full shadow-xl shadow-black border-2 object"
            alt="art"
          />
          <div className=" ml-5">
            <p className=" font-bold text-xl sm:text-3xl text-white">
              {artistId ? artist?.name : songData?.title}
            </p>
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
                <p className=" text-base text-gray-400 mt-2 w-fit">{songData?.subtitle}</p>
              </Link>
            )}
            <p className=" text-base text-gray-400 mt-2">
              {
                artistId ? artist?.genreNames[0] : songData?.genres?.primary
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
