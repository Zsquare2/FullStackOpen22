import React from "react"

const Filter = ({value, setSearchValue }) => {
    const handleSearchValueChange = (event) =>{
        setSearchValue(event.target.value)}
    return(
        <div>     
            filter shown with
            <form autoComplete="off">
            <input value={value} onChange={handleSearchValueChange} />
            </form>
        </div>
        )}

const nameSearch = ({country, searchValue})=>
    (country.filter((search) => (
        search.name.common.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        )))

export {Filter, nameSearch}
