/* eslint-disable max-len,no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import defaultImage from "../../image/iphone-on-brown-wooden-table-1369476.jpg";
//const defaultImage =
//"https://www.google.com/url?sa=i&url=https%3A%2F%2Fnohat.cc%2Ff%2Fbreaking-news-background%2F6566595128197120-201808261243.html&psig=AOvVaw1DNo9kJfdInLueZ9GQ5drP&ust=1589685627969000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIiyx9W2t-kCFQAAAAAdAAAAABAE";
const NewsCard = ({ data, index }) => (
  <Card className={"MuiNewsCard--01"}>
    <CardMedia
      className={"MuiCardMedia-root"}
      image={!data.urlToImage ? defaultImage : data.urlToImage}
    >
      <Typography className={"MuiTypography--category"}>
        {data.source.name}
      </Typography>
    </CardMedia>
    <CardContent className={"MuiCardContent-root"}>
      <Typography
        className={"MuiTypography--overline"}
        variant={"overline"}
        gutterBottom
      >
        {data.publishedAt}
      </Typography>
      <Typography
        className={"MuiTypography--heading"}
        variant={"h6"}
        gutterBottom
      >
        {data.title}
      </Typography>
      <Typography className={"MuiTypography--subheading"} variant={"caption"}>
        {data.description === null ? data.content : data.description}
      </Typography>
    </CardContent>
    <CardActions className={"MuiCardActions-root"}>
      <Button color={"primary"} fullWidth href={data.url}>
        Find Out More <ChevronRightIcon />
      </Button>
    </CardActions>
  </Card>
);

NewsCard.getTheme = (muiBaseTheme) => ({
  MuiCard: {
    root: {
      "&.MuiNewsCard--01": {
        maxWidth: 304,
        margin: "5%",
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        boxShadow: "none",
        borderRadius: 0,
        "& button": {
          marginLeft: 0,
        },
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
        },
        "& .MuiCardMedia-root": {
          paddingTop: "65%",
          position: "relative",
          "& .MuiTypography--category": {
            color: "rgba(255, 255, 255, 0.87)",
            position: "absolute",
            top: muiBaseTheme.spacing.unit * 2.5,
            left: muiBaseTheme.spacing.unit * 2.5,
            letterSpacing: 0.5,
            fontWeight: 900,
          },
        },
        "& .MuiCardContent-root": {
          textAlign: "left",
          padding: muiBaseTheme.spacing.unit * 3,
          "& .MuiTypography--overline": {
            color: muiBaseTheme.palette.grey[500],
            fontWeight: "bold",
          },
          "& .MuiTypography--heading": {
            fontWeight: 900,
            lineHeight: 1.3,
          },
          "& .MuiTypography--subheading": {
            lineHeight: 1.8,
            color: muiBaseTheme.palette.text.primary,
            fontWeight: "bold",
          },
        },
        "& .MuiCardActions-root": {
          padding: `0 ${muiBaseTheme.spacing.unit * 3}px ${
            muiBaseTheme.spacing.unit * 3
          }px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
    },
  },
  MuiButton: {
    root: {
      "& svg, .material-icons": {
        marginLeft: muiBaseTheme.spacing.unit,
      },
    },
    label: {
      textTransform: "initial",
    },
  },
});
NewsCard.metadata = {
  name: "News Card",
  description: "Best for Blog",
};

export default NewsCard;
