/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "../../common/common.css"
import './bike.css'
import { AiOutlinePlus } from "react-icons/ai";
import Filters from '../utils/Filters';
import BikeCard from './bikeCard';
import Search from '../utils/Search';
import Loading from '../../../layout/Loader/Loading';
import Pagination from "react-js-pagination";
import getAllBikesHook from '../../../hooks/useBikeHooks';

// dotenv.config();
const AllBike = () => {

  const navigate = useNavigate();
  let { AllBikes } = getAllBikesHook()
  const { userInfo: user, loading: userLoading } = useSelector(state => state.user)
  const { loading, loading2 } = useSelector(state => state.bike)

  const [data, setdata] = useState();
  const [Filtered, setFiltered] = useState();

  useEffect(() => {
    setdata(AllBikes)
  }, [AllBikes]);



  return (
    <>
      {userLoading || loading || loading2 ?
        <Loading />
        :
        <div className='AllBikes' >
          <div className='filter_box'>
            <div className='AllbikesHeader'>
              <h3 className="">All Bikes</h3>

            </div>

            <Filters filteredData={AllBikes} setFiltered={setFiltered} />

          </div>




          <div className='BikeList'>
            <div className='search_div'>
              <Search dataForSearch={data} setFiltered={setFiltered} />
              {user?.Role === "manager" ? <button className=' btn btn-warning addNBike_btn ' onClick={() => navigate(`/${user?.Role}/bikeRegistration `)}>
                <AiOutlinePlus /> Add Bike
              </button> : ""}
            </div>
            <div className='bike_Map'>
              {data?.length === 0 ?
                <div className='center_text'><h3 > No bikes available</h3></div>
                :

                data?.map((val, key) => (
                  <BikeCard id={key * 50} val={val} />

                ))
              }


            </div>
            {/* <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={3}
                totalItemsCount={bikeDetails?.length}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div> */}
          </div>

        </div>

      }

    </>
  )
}

export default AllBike

/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import "./common.css"
// import Filters from './Filters';
// import { useDispatch, useSelector } from "react-redux";
// import { getAllBikes } from '../../Redux/Actions/BikeAction';
// import BikeCard from './bike/bikeCard';
// import Loading from '../utils/Loader/Loading';
// import { resetBikeVariables } from '../../Redux/Reducers/BikeSlice';

// // dotenv.config();
// const AllBike = () => {

//   const dispatch = useDispatch()
//   const navigate = useNavigate();
//   const { userInfo: user, loading: userLoading } = useSelector(state => state.user)

//   const { bikeDetails, loading, loading2, updateBikeAvil, Bikedeleted, newBikeAdded, ratingUpdated, bikeDetailsUpdated, AllBikesFetched, filtered, filteredBikeData } = useSelector(state => state.bike)


//   const changeInBike = (newBikeAdded === true || Bikedeleted === true || updateBikeAvil === true || ratingUpdated === true || bikeDetailsUpdated === true) ? true : false

//   useEffect(() => {

//     if ((changeInBike) || !AllBikesFetched)
//       dispatch(getAllBikes())
//     dispatch(resetBikeVariables())
//   }, [Bikedeleted, ratingUpdated, updateBikeAvil, newBikeAdded, bikeDetailsUpdated]);

//   const data = filtered ? filteredBikeData : bikeDetails

//   return (
//     <>
//       {userLoading || loading || loading2 ?
//         <Loading />
//         :
//         <>
//           {user?.Role === "manager" ?
//             <div className='d-flex justify-content-between w-50 m-2'>
//               <h3 className="">All Bikes</h3>
//               <button className=' btn btn-warning resta' onClick={() => navigate(`/${user?.Role}/bikeRegistration `)}>
//                 Add New Bike
//               </button>
//             </div>
//             : <h3 className="">All Bikes</h3>
//           }
//           <div style={{ display: "flex" }} className="allBikes">
//             <div className='filter_box'>
//               <Filters />
//             </div>

//             <div className='bikes w-75'>

//               <div style={{ display: "flex", flexWrap: "wrap" }}>
//                 {
//                   filtered && filteredBikeData?.length === 0 ?
//                     <div className=' w-100 d-flex justify-center align-content-center'><h3 >No match Found</h3> </div>
//                     :
//                     data?.length === 0 ? "No bikes available"
//                       :
//                       data?.map((val, key) => (
//                         <BikeCard id={key * 50} val={val} />

//                       ))
//                 }
//               </div>
//             </div>

//           </div>
//         </>

//       }

//     </>
//   )
// }

// export default AllBike