import React, { useContext, useState } from 'react'
import DataContext from '../context/UserContext';

const Filters = ({ filteredData, setFiltered }) => {
    // console.log("filteredData", filteredData)
    const { user } = useContext(DataContext);

    const [searchModel, setSearchModel] = useState("");
    const [searchLoc, setSearchLoc] = useState("");
    const [searchAval, setSearchAval] = useState("");
    const [searchRat, setSearchRat] = useState(['select', '1', '2', '3', '4', '5']);


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
        const modelfilter = filteredData?.filter((item) => {
            return item.Rating == value;
        })
        setFiltered(modelfilter)
    }

    const handelClear = () => {
        // fetchData()setSearchModel("")
        setSearchLoc("")
        setSearchModel("")
        setSearchAval("")
        setFiltered(filteredData)
    }
    return (

        <div className='filter '>
            <button onClick={handelClear}>clear</button>
            <h3>Find bike for you</h3>
            <div className='d-flex flex-column'>
                <label>Model:</label>
                <div>
                    <input className='mx-3' type={"text"} value={searchModel} onChange={(a) => setSearchModel(a.target.value)} placeholder="search by model name" />
                    <button disabled={searchModel === "" || searchModel === " "} onClick={() => filterbyModel()}>search</button>
                </div>
                <label>Location:</label>
                <div>
                    <input className='mx-3' type={"text"} value={searchLoc} onChange={(a) => setSearchLoc(a.target.value)} placeholder="search byLocation" />
                    <button disabled={searchLoc === "" || searchLoc === " "} onClick={filterbyLocation}>search</button>
                </div>
                {user?.Role === "manager" ?
                    <div>
                        <h6>Avilablity</h6>
                        <input className='mx-3' type={"radio"} id="1" name="avail" value={"avl"} onChange={(a) => filterbyAvailability(a?.target.value)} placeholder="search by model name" />
                        <label>available</label>
                        <input className='mx-3' type={"radio"} id="2" name="avail" value={"Not available"} onChange={(a) => filterbyAvailability(a?.target.value)} placeholder="search by model name" />
                        <label> Not available</label>
                    </div>
                    : ""}
                <label>Rating</label>
                <select onChange={(a) => filterbyRating(a.target.value)}>
                    { searchRat?.map((val, key) => {
                            return <option value={val} >{val}</option>
                        })}
                </select>

            </div>
        </div>
    )
}

export default Filters