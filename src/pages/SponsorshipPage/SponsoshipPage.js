import React from "react";
import SponsorshipForm from "./SponsorshipForm";
import {useTranslation} from "react-i18next";

function SponsorshipPage() {
	const {t} = useTranslation();

	return (
		<>
			<div>{t("SponsorshipPage.PageTitle")}</div>
			<SponsorshipForm />
		</>
	);
}

export default SponsorshipPage;