import React from "react";
import {useTranslation} from "react-i18next";

export default function Footer() {
	const {t} = useTranslation();

	return (
		<footer className="footer">
			<div className="container">
				<h2 className="social__title"> {t("Footer.SocialMessage")}</h2>
				<ul className="social__list">
					<li className="social__item">
						<a href="https://www.facebook.com/" className="social__link">
							<span className="icon-facebook2"></span>
						</a>
					</li>
					<li className="social__item">
						<a href="https://www.instagram.com/" className="social__link">
							<span className="icon-instagram"></span>
						</a>
					</li>
					<li className="social__item">
						<a href="https://www.youtube.com/" className="social__link">
							<span className="icon-youtube"></span>
						</a>
					</li>
					<li className="social__item">
						<a href="https://www.twitch.tv/" className="social__link">
							<span className="icon-twitch"></span>
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}