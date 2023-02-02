
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from '../Redux/Actions/BikeAction';
import { resetBikeVariables } from '../Redux/Reducers/BikeSlice';

const useBikeHooks = () => {
    const dispatch = useDispatch()
    const [customHookLoading, setcustomHookLoading] = useState(false);
    const { userInfo: user, loading: userLoading } = useSelector(state => state.user)

    const { AllBikes, updateBikeAvil, Bikedeleted, newBikeAdded, ratingUpdated, bikeDetailsUpdated, AllBikesFetched } = useSelector(state => state.bike)

    const changeInBike = (newBikeAdded === true || Bikedeleted === true || updateBikeAvil === true || ratingUpdated === true || bikeDetailsUpdated === true) ? true : false

    useEffect(() => {
        setcustomHookLoading(true)
        if ((changeInBike) || !AllBikesFetched) {
            dispatch(getAllBikes())
        }
        dispatch(resetBikeVariables())
        setcustomHookLoading(false)
    }, [Bikedeleted, ratingUpdated, updateBikeAvil, newBikeAdded, bikeDetailsUpdated, user]);

    console.log("AllBikeshok", AllBikes)
    return { AllBikes, customHookLoading }

}

export default useBikeHooks