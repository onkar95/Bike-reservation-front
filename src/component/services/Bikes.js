
import { bikes } from '../Data/BikesData';
const Util = {
    sleep: (seconds) => new Promise((resolve => setTimeout(resolve, seconds * 1000)))
}
export const GetAllRestaurant = async () => {
    const Bikes = [];
    bikes.map(async (val, key) => {
        
        const bike = {
            id: key+10000,
            model: val.model,
            avgRating: val.avgRating,
            location: val.location,
            avilablity:val.avilablity,
            color:val.color
        }
        Bikes.push(bike);
        await Util.sleep(0.1)
    })
    return Bikes;
}