/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Styles from "./Style.css";
import countries from "../../Data/CountryData/Country.json";

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 12,
    height: 35,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  fild: {
    borderRadius: 4,
    backgroundColor: "#cedef5",
    border: "1px solid #e2e2e1",
  },
});

export default function CountrySelect({ handelCountrychange }) {
  const classes = useStyles();
  return (
    <div>
      <Autocomplete
        size="small"
        className={Styles.containerCountry}
        id="country-select-demo"
        style={{ width: 200 }}
        options={countries}
        onChange={(event, newValue) => {
          handelCountrychange(!newValue ? null : newValue.code);
        }}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(option) => (
          <React.Fragment>
            <span>{countryToFlag(option.code)}</span>
            {option.label} ({option.code}) +{option.phone}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            className={classes.fild}
            {...params}
            label="Choose a country"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  );
}
