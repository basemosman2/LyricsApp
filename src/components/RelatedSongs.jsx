import SongBar from './SongBar';

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => (
  <div className=" flex flex-col">
    <h1 className=" font-bold text-3xl text-white"> related Song:</h1>
    <div className=" mt-6 flex flex-col w-full">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.id}-${artistId}-${i}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
