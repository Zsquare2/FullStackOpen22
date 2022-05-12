import React from "react"

const Filter = ({value, setSearchValue }) => {
    const handleSearchValueChange = (event) =>{
        setSearchValue(event.target.value)}
    return(
        <div>     
            filter shown with
            <input value={value} onChange={handleSearchValueChange} />
        </div>
        )}

const nameSearch = ({persons, searchValue})=>
    (persons.filter((search) => (
        search.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        )))

export {Filter, nameSearch}
