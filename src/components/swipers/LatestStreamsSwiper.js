// //https://swiperjs.com/react
// //https://www.youtube.com/watch?v=l4kFO6VQPfA&feature=emb_title
// //https://github.com/nolimits4web/Swiper/blob/master/demos/240-effect-coverflow.html
// //https://dev.to/timo_ernst/swiperjs-react-video-tutorial-2020-15i2
//
// import React, {useState} from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { EffectCoverflow } from 'swiper';
// import 'swiper/swiper-bundle.css';
// import ReactPlayer from "react-player/youtube";
// import {useDataFromFirestore} from "../../customHooks/useFirestore";
//
// SwiperCore.use([EffectCoverflow]);
//
// //HOME PAGE Swiper
// export default  function LatestStreamsSwiper () {
//     console.log("LatestStreamsSwiper component worked");
//     const {docsFromHook} = useDataFromFirestore('TEMP-streams');
//
//   console.log(docsFromHook);
//
//    return (
//         <>
//             <Swiper
//                 spaceBetween={5}
//                 slidesPerView={5}
//                 navigation
//                 pagination={{ clickable: true }}
//                 scrollbar={{ draggable: true }}
//                 onSwiper={(swiper) => console.log(swiper)}
//                 onSlideChange={() => console.log('slide changed')}
//             >
//                 {docsFromHook && docsFromHook.slice(0, 6).map(doc => (
//                     <SwiperSlide >
//                         <ReactPlayer
//                         key={doc.id}
//                         url = {doc.videoURL}
//                         controls={true}
//                         playing={false}/>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </>
//     );
//
// }

//https://swiperjs.com/react
//https://www.youtube.com/watch?v=l4kFO6VQPfA&feature=emb_title
//https://github.com/nolimits4web/Swiper/blob/master/demos/240-effect-coverflow.html
import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactPlayer from "react-player/youtube";
import {useDataFromFirestore} from "../../customHooks/useFirestore";

//HOME PAGE Swiper
export default  function LatestStreamsSwiper () {
    console.log("LatestStreamsSwiper component worked");
    const {docsFromHook} = useDataFromFirestore('TEMP-streams');
    const [playState, setPlayState] = useState(false);

    return (
        <>
            <Swiper
                effect={'coverflow'}
                //spaceBetween={5}
                grabCursor = {'true'}
                centeredSlides = {'true'}
                initialSlide = {2}
                slidesPerView = {4}
                pagination= {{el: '.swiper-pagination'}}
                navigation
                onSlideChange={() => setPlayState(false)}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
            >
                {docsFromHook && docsFromHook.slice(0, 6).map(doc => (
                    <SwiperSlide key={doc.id}>
                        <ReactPlayer
                            key={doc.id}
                            url = {doc.videoURL}
                            controls={true}
                            playing={playState}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );

}
