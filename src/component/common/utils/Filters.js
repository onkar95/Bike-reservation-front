import React, { useState } from 'react'
import { FcClearFilters } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import "./Search&filter.css";

const Filters = ({ filteredData, setFiltered }) => {
    // console.log("filteredData", filteredData)
    const { userInfo: user, userUpdated } = useSelector(state => state.user)

    const [searchModel, setSearchModel] = useState("");
    const [searchLoc, setSearchLoc] = useState("");
    const [searchAval, setSearchAval] = useState("");
    const [ratVal, setratVal] = useState();


    const filterbyModel = async () => {
        const modelfilter = filteredData?.filter((item) => {
            return item.Model.toLowerCase().includes(searchModel?.toLowerCase());
        })
        setFiltered(modelfilter)

    }
    const filterbyLocation = async () => {
        const modelfilter = filteredData?.filter((item) => {
            return item.Location?.toLowerCase().includes(searchLoc?.toLowerCase());
        })
        setFiltered(modelfilter)

    }
    const filterbyAvailability = async (value) => {
        const modelfilter = filteredData?.filter((item) => {
            return item.Availability?.toLowerCase().includes(value?.toLowerCase());
        })
        setFiltered(modelfilter)
    }

    const filterbyRating = async (value) => {
        setratVal(value)
        const modelfilter = filteredData?.filter((item) => {
            return item.Rating == value;
        })
        setFiltered(modelfilter)
    }

    const handelClear = () => {
        setSearchLoc("")
        setSearchModel("")
        setSearchAval("")
        setFiltered(filteredData)
        setratVal("select")
    }
    return (

        <div className='filter '>
            <div className="hovertext">clear Filter</div>
            <button onClick={handelClear} className="clear_filter">
                <FcClearFilters style={{ fontSize: "2rem" }} />
            </button>
            <h3>Find bike for you</h3>
            <div className='filter_form'>
                <div className='filter_field'>
                    <label >Model:</label>
                    <section>
                        <input type={"text"} value={searchModel} onChange={(a) => setSearchModel(a.target.value)} placeholder="search by model name" />
                        <button disabled={searchModel === ""} onClick={() => filterbyModel()}>search</button>
                    </section>
                </div>
                <div className='filter_field'>
                    <label >Location:</label>
                    <section>
                        <input type={"text"} value={searchLoc} onChange={(a) => setSearchLoc(a.target.value)} placeholder="search byLocation" />
                        <button disabled={searchLoc === ""} onClick={filterbyLocation}>search</button>
                    </section>
                </div>
                <div className='filter_field'>
                    <label>Avilablity:</label>
                    <section className='radioSection'>
                        <input type={"radio"} id="1" name="avail" value={"avl"} onChange={(a) => filterbyAvailability(a?.target.value)} placeholder="search by model name" />
                        <label>available</label>
                    </section>
                    <section className='radioSection'>
                        <input type={"radio"} id="2" name="avail" value={"Not available"} onChange={(a) => filterbyAvailability(a?.target.value)} placeholder="search by model name" />
                        <label> Not available</label>
                    </section>
                </div>
                <div className='filter_field'>
                    <label >Rating:</label>
                    <select onChange={(a) => filterbyRating(a.target.value)} value={ratVal}>
                        <option >select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        {/* {searchRat?.map((val, key) => {
                        return <option value={val} >{val}</option>
                    })} */}
                    </select>
                </div>

            </div>
        </div>
    )
}

export default Filters

