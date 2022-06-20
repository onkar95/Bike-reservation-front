import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState()
  // const [cartData, setCartData] = useState(null)
  const [ReserveRating, setReserveRating] = useState(true)
  const [BikeRating, setBikeRating] = useState(true)
  // const [filterValue, setFilterValue] = useState("")
  // const [FilteredData, setFilteredData] = useState([])
  // const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        axios.get(`http://localhost:5000/auth/verifyuser`, {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          }
        }).then((res) => {
          setUser(res.data);
        })
          .catch((err) => {
            console.log(err)
            setUser(null)
          })
      } catch (error) {
        console.log(error)
        setUser(null)
      }
    }
    verifyUser()
  }, [])
  return (
    <DataContext.Provider value={{
      user, setUser,
      ReserveRating, setReserveRating,
      BikeRating, setBikeRating
    }}>
      {children}
    </DataContext.Provider >
  )
}

export default DataContext;