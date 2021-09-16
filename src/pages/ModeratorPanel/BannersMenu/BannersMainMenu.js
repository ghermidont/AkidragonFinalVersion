/** Controller file for the banners control menu.*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import HomePageBanners from "./BannerPages/HomePageBanners";
import TournamentsPageBanners from "./BannerPages/TournamentsPageBanners";
import BlogPageBanners from "./BannerPages/BlogPageBanners";
import ContentPageBanners from "./BannerPages/ContentPageBanners";
import IndividualArticlePageBanners from "./BannerPages/IndividualArticlePageBanners";

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		paddingTop: "5em"
	},
}));

export default function LabTabs() {
	const classes = useStyles();
	//States.
	const [value, setValue] = React.useState("1");
	//Function for toggling between tabs.
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<center><h1>Edit banners menu</h1></center>
			<TabContext value={value}>
				<AppBar position="static">
					<TabList onChange={handleChange} aria-label="simple tabs example">
						<Tab label="HomePage" value="1" />
						<Tab label="Tournaments Page" value="2" />
						<Tab label="Blog Page" value="3" />
						<Tab label="Content Page" value="4" />
						<Tab label="Article Page" value="5" />
					</TabList>
				</AppBar>
				<TabPanel value="1"><HomePageBanners /></TabPanel>
				<TabPanel value="2"><TournamentsPageBanners /></TabPanel>
				<TabPanel value="3"><BlogPageBanners /></TabPanel>
				<TabPanel value="4"><ContentPageBanners /></TabPanel>
				<TabPanel value="5"><IndividualArticlePageBanners /></TabPanel>
			</TabContext>
		</div>
	);
}
