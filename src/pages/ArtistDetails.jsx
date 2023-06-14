import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/service/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  const relatedTopSong = artistData?.data[0]?.views['top-songs'];

  if (isFetchingArtistDetails) {
    return <Loader title="searching song details" />;
  }

  if (error) return <Error />;

  return (
    <div className=" flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData.data[0]} />

      <RelatedSongs
        data={Object.values(relatedTopSong?.data)}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
      />
    </div>
  );
};

export default ArtistDetails;
