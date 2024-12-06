import { Link } from "react-router-dom";
import { colRef } from "../..";
import { getDocs } from "firebase/firestore"
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Button from "../../components/Button/Button";
import { fetchGenres, fetchMovies } from "../../api/MoviesApi";
import { useTranslation } from "react-i18next";
import HorizontalScroller from "../../components/HorizontalScroller/HorizontalScroller";
import { Swiper, SwiperSlide } from 'swiper/react';
import { swiperMovies } from "../../config/swiperMovies";

import 'swiper/css';
import 'swiper/css/pagination';

import './HomePage.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';


export interface Film {
  title: string;
  poster_path: string;
  genre_ids: number[];
}

export interface IGenre {
  id: string;
  name: string;
}

// TODO
// Add banner with a swiper slider      DONE
// add more horizontal scrollers with dynamic links to the page with pagination     DONE
// add translation for swiper and sections with movies
// style wertical scrollbar on the entire site

// sometimes when I use links in header navigation a scrollbar on the right disappears, I need to find out why

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language)
  const upcomingOptions = fetchMovies(1, lang, "upcoming");
  const playingOptions = fetchMovies(1, lang, "now_playing");
  const popularOptions = fetchMovies(1, lang, "popular");
  const topOptions = fetchMovies(1, lang, "top_rated");
  const genresOptions = fetchGenres(lang);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const pagination = {
    clickable: true,
    renderBullet: function (index : number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  const autoplay = {
    delay: 10000,
    disableOnInteraction: false,
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    setLang(i18n.language)
  }, [i18n.language])


// I don't understand why does this function returns error, but the one that is not commented doesn't

  // const moviesFetch = async (options:{}) => {
  //   try {
  //     const data = await axios.request(options)
  //     return data.data
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const moviesFetch = async (options: {}) => {
    const { data } = await axios.request(options);
    return data; // Make sure this returns the shape you expect
  };

  const getGenres = async () => {
    try {
      const data = await axios.request(genresOptions)
      return data.data
    } catch (error) {
      console.log(error);
    }
  }

  const { data, isError, isLoading } = useQuery<{ results: Film[] }>(['data', 1, lang], () => moviesFetch(upcomingOptions), {refetchOnWindowFocus: false});
  const { data: topData, isError: topError, isLoading: topLoading } = useQuery<{ results: Film[] }>(['topData', 1, lang], () => moviesFetch(topOptions), {refetchOnWindowFocus: false});
  const { data: playingData, isError: playingError, isLoading: playingLoading } = useQuery<{ results: Film[] }>(['playingData', 1, lang], () => moviesFetch(playingOptions), {refetchOnWindowFocus: false});
  const { data: popularData, isError: popularError, isLoading: popularLoading } = useQuery<{ results: Film[] }>(['popularData', 1, lang], () => moviesFetch(popularOptions), {refetchOnWindowFocus: false});
  const { data:genersData } = useQuery<{ genres: IGenre[] }>(['genresData', lang], getGenres)

  const getDataFromDb = async () => {
    const snapshot = await getDocs(colRef);
    const data:any = []
    snapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id })
    })
    console.log(data)  // remove this log
  }

  useEffect(() => {
    try{
      getDataFromDb();
    } catch (err) {
      console.log(err);
    }
    console.log(data)    //remove later
    // console.log(genersData?.genres)
  }, [])

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return(
    <div className="min-h-[100svh] w-full overflow-hidden">
      <div className="h-[100svh]">
        <Swiper
          pagination={pagination}
          autoplay={autoplay}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          loop={true}
        >
          {swiperMovies.map((m) => (
            <SwiperSlide key={m.title}>
              <div
                className={`bg-${m.mobileImage} md:bg-${m.image} bg-center bg-cover w-full h-full block relative`}
                style={{
                  backgroundImage: `url(${isMobile ? m.mobileImage : m.image})`,
                }}
              >
                <div className="absolute bottom-5 left-5">
                  <Link to={m.link}>
                    <p className="text-3xl md:text-6xl">{t(m.title)}</p>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <div className="mt-4">
          {
            topData && genersData && topData?.results.length > 0 && 
              <HorizontalScroller link="/" heading="top-rated" films={topData.results} genres={genersData.genres} onBookmarkClick={() => console.log('temporary nothing')} />
          }
        </div>
        <div>
          {
            playingData && genersData && playingData?.results.length > 0 && 
              <HorizontalScroller link="/" heading="playing-now" films={playingData.results} genres={genersData.genres} onBookmarkClick={() => console.log('temporary nothing')} />
          }
        </div>
        <div>
          {
            data && genersData && data?.results.length > 0 && 
              <HorizontalScroller link="/" heading="upcoming" films={data.results} genres={genersData.genres} onBookmarkClick={() => console.log('temporary nothing')} />
          }
        </div>
        <div>
          {
            popularData && genersData && popularData?.results.length > 0 && 
              <HorizontalScroller link="/" heading="popular" films={popularData.results} genres={genersData.genres} onBookmarkClick={() => console.log('temporary nothing')} />
          }
        </div>
      </div>
    </div>
  )
};

export default HomePage;
