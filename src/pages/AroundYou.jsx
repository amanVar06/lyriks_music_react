import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

import { Error, Loader, SongCard } from "../components";

const CountryTracks = () => {
  const [country, setCountry] = useState("IN");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(
    country || "IN"
  );

  useEffect(() => {
    // if you will face issue like Failed to load resource: net::ERR_BLOCKED_BY_CLIENT then remove adBlocks from the browser
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${
          import.meta.env.VITE_GEO_API_KEY
        }`
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading)
    return <Loader title="Loading songs around you..." />;

  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
        <span className="font-black"> {country || "IN"}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song?.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
