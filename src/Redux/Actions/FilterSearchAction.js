import { createAsyncThunk } from '@reduxjs/toolkit'


export const filterBikes = createAsyncThunk(
    'filter/bikes',
    async ({ searchModel, searchLoc, Availability, RatingVal }, { getState, rejectWithValue }) => {
        try {
            const { bike } = getState()
            // console.log(Availability)
            const AllBikes = bike?.filteredBikeData.length === 0 ? bike?.bikeDetails : bike?.filteredBikeData

            if (searchModel) {
                const modelfilter = AllBikes?.filter((item) => {
                    return item.Model.toLowerCase().includes(searchModel?.toLowerCase());
                })
                return modelfilter
            }
            if (searchLoc) {
                const locationfilter = AllBikes?.filter((item) => {
                    return item.Location?.toLowerCase().includes(searchLoc?.toLowerCase());
                })
                return locationfilter
            }
            if (Availability) {
                const bikeAvailability = bike?.bikeDetails?.filter((item) => {
                    return item.Availability?.toLowerCase().includes(Availability?.toLowerCase());
                })
                // console.log("bikeAvailability", bikeAvailability)
                return bikeAvailability
            }
            if (RatingVal) {
                const RatingFilter = bike?.bikeDetails?.filter((item) => {
                    return item.Rating == RatingVal;
                })
                return RatingFilter
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const clearFilter = createAsyncThunk(
    'filter/bikes',
    async (args, { getState, rejectWithValue }) => {
        try {
            const { bike } = getState()
            // console.log(bike.bikeDetails)
            return bike.bikeDetails

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const SearchBike = createAsyncThunk(
    'filter/bikes',
    async ({ searchTerm }, { getState, rejectWithValue }) => {
        try {
            const { bike } = getState()

            return bike?.bikeDetails.filter(product => {
                let match = false;
                Object.values(product).forEach(value => {
                    if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
                        match = true;
                    }
                });
                return match;
            });

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

