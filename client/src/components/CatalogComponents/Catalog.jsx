import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from "../styles/Catalog.module.css";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CatalogFlights from './CatalogFlights';

function TabPanel(props) {
    
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export function Catalog() {
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={style.catalog_containers}>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab icon={<FlightTakeoffIcon />} label="Flights" {...a11yProps(0)} />
                    <Tab icon={<LoyaltyIcon />} label='Offers' {...a11yProps(1)} />

                </Tabs>
                <TabPanel className={style.tab} value={value} index={0} >
                    <h1>Flights</h1>
                    <CatalogFlights />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Offers
                </TabPanel>
            </Box>
        </div>
    );
}

export default Catalog