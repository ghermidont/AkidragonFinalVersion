import React, {useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import ReactPlayer from "react-player/youtube";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

import "./swiperStyles.css";

import SwiperCore, {
	EffectCoverflow, Pagination
} from "swiper/core";

SwiperCore.use([EffectCoverflow, Pagination]);

export default function LatestStreamsSwiper() {
	const {docsFromHook} = useDataFromFirestore("streams");
	const [playState, setPlayState] = useState();
	const player = useRef();

	return (
		<div>
			<Swiper
				effect={"coverflow"}
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
				slidesPerView={"auto"}
				className="mySwiper"
				onSlideChange={()=>{if(playState===true)setPlayState(false);}}
			>
				{docsFromHook && docsFromHook.slice(0, 6).map(doc => (
					<>
						<SwiperSlide key={doc.id}>
							<div style={{maxWidth: "640px", height: "100%", margin: "0 auto"}}>
								<ReactPlayer
									ref={player}
									url={doc.videoURL}
									controls={true}
									width={"100%"}
									height={"100%"}
									light={true}
									playing={playState}
								/>
							</div>
						</SwiperSlide>
					</>
				))}
			</Swiper>

		</div>

	);

}
