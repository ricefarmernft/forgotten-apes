import React from 'react'
import { Input } from "antd";

const SearchMain = ({setSearchTerm}) => {
  return (
    <div className="search-ape">
        <Input
          placeholder="Search Ape ID"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
      </div>
  )
}

export default SearchMain