import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../layout/utils/MetaData";
import "./Search&filter.css";

const Search = ({ dataForSearch, setFiltered }) => {
    const data = dataForSearch;
    const dispatch = useDispatch()
    const { bikeDetails } = useSelector(state => state.bike)

    const [searchTerm, setsearchTerm] = useState("");

    const handelClear = () => {
        setsearchTerm("")
        setFiltered(data)

    }
    useEffect(() => {
        if (searchTerm !== "") {
            const searchedData = data?.filter(bike => {
                const modelfilter = bike.Model.toLowerCase().includes(searchTerm.toLowerCase())
                const Colorfilter = bike.Color.toLowerCase().includes(searchTerm.toLowerCase())
                const Locationfilter = bike.Location.toLowerCase().includes(searchTerm.toLowerCase())

                return modelfilter || Colorfilter || Locationfilter

            });
            console.log(searchedData)
            setFiltered(searchedData)
        } else {
            setFiltered(data)
        }

    }, [searchTerm]);

    return (
        <Fragment>
            <MetaData title="Search" />
            <div className="searchBox" >
                <input
                    type="text"
                    placeholder="Search a Bike ..."
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <button onClick={() => handelClear()} >clear</button>
            </div>
        </Fragment>
    );
};

export default Search;
