import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import Upload from './upload';
import Previous from './Previous';
import Brands from './brand';
import Orders from './orders';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > div': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#fafafa',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(1),
    },
    demo: {
        backgroundColor: 'transparent',

    },
}));

export default function CustomizedTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };


    return (
        <div className={classes.root}>
            <Paper className={classes.demo} elevation={0}>
                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                    <StyledTab label="Product Upload" />
                    <StyledTab label="Active Product" />
                    <StyledTab label="Add Brands" />
                    <StyledTab label="Current Orders" />
                </StyledTabs>
                <Typography className={classes.padding} />
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction} flexGrow={1}>
                        <Upload></Upload>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Previous></Previous>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <Brands></Brands>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <Orders></Orders>
                    </TabPanel>
                </SwipeableViews>
            </Paper>
        </div >
    );
}
