import { BsFacebook , BsInstagram , BsStarFill } from "react-icons/bs";
function Reviews(){
    return (
        <div className="reviews-container">
            <div className="reviews">
                <div className="review">
                    <h3 className="user-name">Tom S.</h3>
                    <p className="review-text">
                    “Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.”
                    </p>
                    <div className="review-rate">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    </div>
                </div>
                <div className="review">
                    <h3 className="user-name">Liz S.</h3>
                    <p className="review-text">
                    “Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.”
                    </p>
                    <div className="review-rate">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    </div>
                </div>
                <div className="review">
                    <h3 className="user-name">Mike A.</h3>
                    <p className="review-text">
                        “Starting my role as a WordPress administrator has been a joy, thanks to its intuitive interface, media management, security, and plugin integration, making website management a breeze.”
                        </p>
                    <div className="review-rate">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reviews;