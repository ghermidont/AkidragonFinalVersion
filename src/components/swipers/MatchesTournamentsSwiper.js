//In future consider implementing the logic of this component through useContext an LocalStorage
import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import ReactPlayer from "react-player/youtube";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import "./swiperStyles.css";

import SwiperCore, {
    EffectCoverflow,Pagination
} from 'swiper/core';

SwiperCore.use([EffectCoverflow,Pagination]);

export default function MatchesTournamentsSwiper (){
    console.log("EntertainmentSwiper component worked");
    const {docsFromHook} = useDataFromFirestore('TEMP-streams');
    const [mainMatchVid, setMainMatchVid] = useState('');

    const filterResult =  docsFromHook.filter(function(doc) {
        return doc.category === "tournaments";
    });

    return (
        <div style={{textAlign: "center"}}>
            <ReactPlayer
                url = {mainMatchVid}
                controls = {true}
                light = {true}
                playing = {false}
                onStart = {()=>console.log("hello")}
                style={{margin:"auto"}}
            />
            <Swiper
                effect={'coverflow'}
                coverflowEffect={
                    {
                        "rotate": 50,
                        "stretch": 0,
                        "depth": 100,
                        "modifier": 1,
                        "slideShadows": true
                    }
                }

                grabCursor={false}
                centeredSlides={true}
                navigation = {false}
                initialSlide = {2}
                pagination={true}
                spaceBetween={20}
                slidesPerView={3}
                className="mySwiper"
            >
                {filterResult && filterResult.slice(0, 6).map(doc=>
                    (
                        <SwiperSlide key={doc.id} tag="li">
                            <img
                                src={doc.imageURL}
                                style={{ listStyle: 'none' }}
                                alt=""
                                onLoad={() => setMainMatchVid(doc.videoURL)}
                                onClick={() => setMainMatchVid(doc.videoURL)}
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    );
}
