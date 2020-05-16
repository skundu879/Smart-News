import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox({ handelCatagorychange }) {
  return (
    <Autocomplete
      size="small"
      id="combo-box-demo"
      options={catagory}
      getOptionLabel={(option) => option.title}
      onChange={(event, newValue) => {
        handelCatagorychange(!newValue ? "Health" : newValue.title);
      }}
      style={{
        width: 200,
        borderRadius: 4,
        backgroundColor: "#cedef5",
        border: "1px solid #e2e2e1",
      }}
      renderInput={(params) => (
        <TextField {...params} label="News Catagory" variant="outlined" />
      )}
    />
  );
}

const catagory = [
  { title: "Business" },
  { title: "Entertainment" },
  { title: "General" },
  { title: "Health" },
  { title: "Science" },
  { title: "Sports" },
  { title: "Technology" },
];
