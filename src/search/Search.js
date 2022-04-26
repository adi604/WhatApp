import { useRef } from "react";

function Search(props) {

    const searchBox = useRef('');

    const search = () => {
        props.setSearchQuery(searchBox.current.value)
    }

    return (
        <div className="searchBox">
            <div className="searchBox-inner">
                <input ref={searchBox} onKeyUp={search} id="searchText" type="text" className="form-control" name="searchText" placeholder="Search"></input>
                <span className="glyphicon glyphicon-search form-control-feedback"></span>
            </div>
        </div>
    );
}

export default Search;