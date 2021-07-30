import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CMSHomePageEdit from "./PagesEditComponents/CMSHomePageEdit";
import CMSTournamentsPageEdit from "./PagesEditComponents/CMSTournamentsPageEdit";
import CMSBlogPageEdit from "./PagesEditComponents/CMSBlogPageEdit";
import CMSAboutUsPageEdit from "./PagesEditComponents/CMSAboutUsPageEdit";
import CMSContentPageEdit from "./PagesEditComponents/CMSContentPageEdit";
import CMSContactUpPageEdit from "./PagesEditComponents/CMSContactUsPageEdit";
import CMSSponsorshipPageEdit from "./PagesEditComponents/CMSSponsorshipPageEdit";
import CMSGameTeamsPageEdit from "./PagesEditComponents/CMSGameTeamsPageEdit";
import CMSGameSalesPageEdit from "./PagesEditComponents/CMSGameSalesPageEdit";


const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
		paddingTop: "5em"
	},
}));

export default function LabTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<TabContext value={value}>
				<AppBar position="static">
					<TabList onChange={handleChange} aria-label="simple tabs example">
						<Tab label="HomePage" value="1" />
						<Tab label="Tournaments Page" value="2" />
						<Tab label="Blog Page" value="3" />
						<Tab label="Content Page" value="4" />
						<Tab label="AboutUs Page" value="5" />
						<Tab label="ContactUs Page" value="6" />
						<Tab label="Sponsorship Page" value="7" />
						<Tab label="CMSGameTeamsPageEdit" value="8" />
						<Tab label="CMSGameSalesPageEdit" value="9" />
					</TabList>
				</AppBar>
				<TabPanel value="1"><CMSHomePageEdit /></TabPanel>
				<TabPanel value="2"><CMSTournamentsPageEdit /></TabPanel>
				<TabPanel value="3"><CMSBlogPageEdit /></TabPanel>
				<TabPanel value="4"><CMSContentPageEdit /></TabPanel>
				<TabPanel value="5"><CMSAboutUsPageEdit /></TabPanel>
				<TabPanel value="6"><CMSContactUpPageEdit /></TabPanel>
				<TabPanel value="7"><CMSSponsorshipPageEdit /></TabPanel>
				<TabPanel value="8"><CMSGameTeamsPageEdit /></TabPanel>
				<TabPanel value="9"><CMSGameSalesPageEdit /></TabPanel>
			</TabContext>
		</div>
	);
}
