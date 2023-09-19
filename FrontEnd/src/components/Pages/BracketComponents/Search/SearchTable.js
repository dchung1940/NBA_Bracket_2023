import React, { useState } from "react";
import TableEntry from "./TableEntry";
import "./style/SearchTable.css";
import SearchBar from "./SearchBar";


function SearchTable(props) {
  const [search, setSearch] = useState("");

  return (
    <div className="searchTable">
        <SearchBar setSearch={setSearch} />
      <div className="searchTable-table">
        {props.data.filter((value) => {
          if (search === "") {
            return value;
          }
          return value.team.name.toLowerCase().includes(search.toLowerCase());
        }).map((element) => (
            <TableEntry
              key = {element.team.id}
              image={element.team.logo}
              name={element.team.name}
              conf = {props.conf}
              conf_data = {props.conf_data}
              count = {props.count}
            ></TableEntry>
        ))}
      </div>
    </div>
  );
}

export default SearchTable;
