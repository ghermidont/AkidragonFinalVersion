//In future consider implementing the logic of this component through useContext an LocalStorage
import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import ReactPlayer from "react-player/youtube";
import {useDataFromFirestore} from "../../customHooks/useFirestore";

export default function MatchesTournamentsSwiper (){
    console.log("EntertainmentSwiper component worked");
    const {docsFromHook} = useDataFromFirestore('TEMP-streams');
    const [mainMatchVid, setMainMatchVid] = useState('');

    const filterResult =  docsFromHook.filter(function(doc) {
        return doc.category === "entertainment";
    });

    return (
        <>
            <ReactPlayer
                url = {mainMatchVid}
                controls = {true}
                playing = {false}
                onStart = {()=>console.log("hello")}
            />
            <Swiper
                id="main"
                //thumbs={{ swiper: thumbsSwiper }}
                //controller={{ control: controlledSwiper }}
                tag="section"
                wrapperTag="ul"
                navigation
                pagination
                spaceBetween={20}
                slidesPerView={3}
                onInit={(swiper) => console.log('Swiper initialized!', swiper)}
                onSlideChange={(swiper) => {
                    console.log('Slide index changed to: ', swiper.activeIndex);
                }}
                onReachEnd={() => console.log('Swiper end reached')}
            >
                {filterResult && filterResult.slice(0, 6).map(doc=>
                    (
                        <SwiperSlide key={doc.id} tag="li">
                            <img
                                src={doc.thumbnail}
                                style={{ listStyle: 'none' }}
                                alt=""
                                onLoad={() => setMainMatchVid(doc.videoURL)}
                                onClick={() => setMainMatchVid(doc.videoURL)}
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </>
    );
}
