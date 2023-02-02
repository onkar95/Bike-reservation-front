import React from 'react'
import starGray from "../../../Assets/Graystar.svg"
import starYellow from "../../../Assets/YellowStar.svg"
import './RateReview.css'

const RateImg = ({ BikeRating }) => {
    return (

        <div className='rating_Stars'>

            <img
                className="star"
                alt=''
                src={BikeRating >= 1 ? starYellow : starGray}
            />
            <img
                className="star"
                alt=''
                src={BikeRating >= 2 ? starYellow : starGray}
            />
            <img
                className="star"
                alt=''
                src={BikeRating >= 3 ? starYellow : starGray}
            />
            <img
                className="star"
                alt=''
                src={BikeRating >= 4 ? starYellow : starGray}
            />
            <img
                className="star"
                alt=''
                src={BikeRating >= 5 ? starYellow : starGray}
            />
        </div>

    )
}

export default RateImg

{/* <img
                alt=''
                src={rating >= 1 || stars >= 1 ? starYellow : starGray}
                onMouseOver={() => setStars(1)}
                onMouseLeave={() => setStars(0)}
                onClick={() => setrating(1)}
            />
            <img
                alt=''
                src={rating >= 2 || stars >= 2 ? starYellow : starGray}
                onMouseOver={() => setStars(2)}
                onMouseLeave={() => setStars(0)}
                onClick={() => setrating(2)}
            />
            <img
                alt=''
                src={rating >= 3 || stars >= 3 ? starYellow : starGray}
                onMouseOver={() => setStars(3)}
                onMouseLeave={() => setStars(0)}
                onClick={() => setrating(3)}
            />
            <img
                alt=''
                src={rating >= 4 || stars >= 4 ? starYellow : starGray}
                onMouseOver={() => setStars(4)}
                onMouseLeave={() => setStars(0)}
                onClick={() => setrating(4)}
            />
            <img
                alt=''
                src={rating >= 5 || stars >= 5 ? starYellow : starGray}
                onMouseOver={() => setStars(5)}
                onMouseLeave={() => setStars(0)}
                onClick={() => setrating(5)}
            /> */}