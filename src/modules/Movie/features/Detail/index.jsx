import { CustomCard } from "@tsamantanis/react-glassmorphism";
import Loader from "components/Loader";
import { useGetDetailMovieQuery } from "modules/Movie/api";
import React from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "./containers/MovieDetail";
import Theater from "./containers/Theater";

const Detail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetDetailMovieQuery(id);
  const movieDetail = data?.content;
  
  return isLoading ? (
    <Loader />
  ) : (
    <div
      className="mt-[64px]"
      style={{
        backgroundImage: `url(${movieDetail?.hinhAnh})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100%",
        position: "relative",
        zIndex: "1",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-2"></div>
      <CustomCard
        effectColor="#000"
        blur={15}
        borderRadius={1}
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <MovieDetail data={movieDetail} />
        <Theater movieid={id} />
      </CustomCard>
    </div>
  );
};

export default Detail;
