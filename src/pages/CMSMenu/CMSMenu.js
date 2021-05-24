import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import HomePageEdit from "./PagesEditComponents/HomePageEdit";
import TournamentsPageEdit from "./PagesEditComponents/TournamentsPageEdit";
import BlogPageEdit from "./PagesEditComponents/BlogPageEdit";
import AboutUsPageEdit from "./PagesEditComponents/AboutUsPageEdit";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '5em'
    },
}));

export default function LabTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

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
                        <Tab label="AboutUs Page" value="4" />
                    </TabList>
                </AppBar>
                <TabPanel value="1"><HomePageEdit /></TabPanel>
                <TabPanel value="2"><TournamentsPageEdit /></TabPanel>
                <TabPanel value="3"><BlogPageEdit /></TabPanel>
                <TabPanel value="4"><AboutUsPageEdit /></TabPanel>
            </TabContext>
        </div>
    );
}
