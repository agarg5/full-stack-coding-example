import "./App.css";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
const BACKEND = "http://localhost:8080/search/"; // TODO: use .env file to store backend URL

function SearchInput({ loading, ...params }) {
  return (
    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <React.Fragment>
            <SearchIcon color="inherit" size={20} />
          </React.Fragment>
        ),
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  );
}

function Option(props) {
  const matches = match(props.Query, props.inputValue, {
    insideWords: true,
  });
  const parts = parse(props.Query, matches);
  return (
    <div key={props.identifier}>
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            fontWeight: part.highlight ? 700 : 400,
          }}
        >
          {part.text}
        </span>
      ))}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch(BACKEND + query).then((res) => res.json());
      setOptions(response);
      setLoading(false);
    }
    if (query?.length) getData();
    else setOptions([]);
  }, [query]);

  return (
    <div style={{ marginLeft: "40%", marginTop: "60px" }}>
      <Autocomplete
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => <SearchInput loading={loading} {...params} />}
        getOptionLabel={(option) => option.Query}
        onInputChange={(newQuery) => {
          setQuery(newQuery.target.value);
        }}
        renderOption={(props, option) => {
          return <Option inputValue={option.inputValue} {...props} />;
        }}
        filterOptions={(x) => x} // disable built-in filtering
        loading={loading}
        freeSolo
      />
    </div>
  );
}

export default App;
