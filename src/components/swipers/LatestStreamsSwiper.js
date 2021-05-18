// //https://swiperjs.com/react
// //https://www.youtube.com/watch?v=l4kFO6VQPfA&feature=emb_title
// //https://github.com/nolimits4web/Swiper/blob/master/demos/240-effect-coverflow.html
// //https://dev.to/timo_ernst/swiperjs-react-video-tutorial-2020-15i2
//
import React, {useState, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import ReactPlayer from "react-player/lazy";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"

import "./swiperStyles.css";

import SwiperCore, {
  EffectCoverflow, Pagination
} from 'swiper/core';

SwiperCore.use([EffectCoverflow, Pagination]);

export default function LatestStreamsSwiper() {
  const player = useRef();

  console.log("LatestStreamsSwiper component worked");
  const {docsFromHook} = useDataFromFirestore('streams');
  const [playState, setPlayState] = useState(false);

  return (
    <div>
      <Swiper
        effect={'coverflow'}
        coverflowEffect={
          {
            "rotate": 50,
            "stretch": 0,
            "depth": 300,
            "modifier": 1,
            "slideShadows": true
          }
        }
        grabCursor={false}
        centeredSlides={true}
        navigation={false}
        initialSlide={2}
        pagination={true}
        spaceBetween={50}
        slidesPerView={3}
        className="mySwiper"
        onSlideChange={() => {
          setPlayState(false)
        }}
      >
        {docsFromHook && docsFromHook.slice(0, 6).map(doc => (
          <SwiperSlide key={doc.id}>
            <ReactPlayer
              ref={player}
              key={doc.id}
              url={doc.videoURL}
              controls={true}
              width='100%'
              height='100%'
              light={true}
              playing={playState}
              onStart={() => console.log("hello")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

}
