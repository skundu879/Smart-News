import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import NewsCard from "../NewsCards/NewsCard";
import { JssProvider } from "react-jss";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CountrySelect from "../Catagory/CountrySelect";
import ComboBox from "../Catagory/NewsCatagory";
import Styles from "./Wraper.module.css";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const muiBaseTheme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#0e29f0",
  },
}));

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
//API CALL for fetching the news data.
const useFetch = (NewsUrl) => {
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    axios
      .get(NewsUrl)
      .then((response) => {
        console.log(response);
        setData(response.data.articles);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [NewsUrl]);
  console.log(Data);
  return { Data, loading };
};

export default function Wraper(props) {
  const classes = useStyles();
  const initialurl =
    "http://newsapi.org/v2/top-headlines?country=in&category=health&language=en&apiKey=17f0a6b07ffe4ae69b8279f1ddd35d9b";

  const partUrl1 = "http://newsapi.org/v2/top-headlines?country=";
  const partUrl2 = "&category=";
  const partUrl3 = "&language=en&apiKey=17f0a6b07ffe4ae69b8279f1ddd35d9b";
  const [NewsUrl, setNewsUrl] = useState(initialurl);
  const { Data, loading } = useFetch(NewsUrl);
  const [Catagory, setCatagory] = useState("");
  const [countryCode1, setcountryCode1] = useState("");
  console.log(countryCode1);
  console.log(NewsUrl);
  console.log(Catagory);
  const handelCountrychange = (countryCode) => {
    let changeURL = initialurl;
    if (countryCode != null) {
      setcountryCode1(countryCode);
      changeURL = `${partUrl1}${countryCode}${partUrl3}`;
      setNewsUrl(changeURL);
    } else if (countryCode === null) {
      setcountryCode1(null);
      changeURL = `${partUrl1}in${partUrl3}`;
      setNewsUrl(changeURL);
    } else if (Catagory) {
      changeURL = `${partUrl1}${countryCode1}${partUrl2}${Catagory}${partUrl3}`;
      setNewsUrl(changeURL);
    }
    //changeURL = `${partUrl1}${countryCode1}${partUrl2}${Catagory}${partUrl3}`;
    //setNewsUrl(changeURL);
  };

  const handelCatagorychange = (catagory) => {
    let changeurlwithcatagory = NewsUrl;
    if (catagory) {
      setCatagory(catagory);
      //const partURL2C = "&category=";
      changeurlwithcatagory = `${partUrl1}${countryCode1}${partUrl2}${catagory}${partUrl3}`;
      setNewsUrl(changeurlwithcatagory);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <div className={Styles.appbar}>
            <IconButton
              edge="start"
              className={Styles.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Typography variant="h4" noWrap className={classes.title}>
                News
              </Typography>
            </IconButton>
            <div className={Styles.country}>
              <CountrySelect handelCountrychange={handelCountrychange} />
              {countryCode1 ? (
                <ComboBox handelCatagorychange={handelCatagorychange} />
              ) : null}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />

      <Container>
        <div>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>

        <Box my={2}>
          <div className={Styles.container}>
            <JssProvider generateClassName={generateClassName}>
              <MuiThemeProvider
                theme={createMuiTheme({
                  typography: {
                    useNextVariants: true,
                  },
                  overrides: NewsCard.getTheme(muiBaseTheme),
                })}
              >
                {Data.map((newses, index) => (
                  <NewsCard key={index} data={newses} />
                ))}
              </MuiThemeProvider>
            </JssProvider>
          </div>
        </Box>
      </Container>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
