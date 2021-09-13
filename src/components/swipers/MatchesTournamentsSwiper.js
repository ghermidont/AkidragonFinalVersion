/** The tournaments swiper from the content page.*/
import React, {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import ReactPlayer from "react-player/youtube";
import {useDataFromFirestore} from "../../customHooks/useFirestore";
//Custom styles.
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./swiperStyles.css";
import classes from "./ReactPlayer.module.scss";

import SwiperCore, {
	EffectCoverflow, Pagination
} from "swiper/core";

SwiperCore.use([EffectCoverflow, Pagination]);

export default function MatchesTournamentsSwiper() {
	//Getting data from the database.
	const {docsFromHook} = useDataFromFirestore("streams");
	//States.
	const [mainMatchVid, setMainMatchVid] = useState("");
	//Filtering the received streams.
	const filterResult = docsFromHook.filter(function (doc) {
		return doc.category === "tournaments";
	});

	return (
		<div style={{textAlign: "center"}}>
			<div className={classes.playerWrapper}>
				<ReactPlayer
					url={mainMatchVid}
					controls={true}
					width="100%"
					height="300px"
					light={true}
					playing={false}
					style={{margin: "auto"}}
				/>
			</div>
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
			>
				{filterResult && filterResult.slice(0, 6).map(doc =>
					(
						<SwiperSlide key={doc.id} tag="li">
							<img
								src={doc.imageURL}
								style={{listStyle: "none"}}
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
