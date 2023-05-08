import carousel1 from "../images/carousel_1.jpeg";
import './home.scss';

const Home = () => {
    return <div className="home">
        <div
            id="carousel"
            className="carousel slide"
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={carousel1} className="d-block w-80" style={{ "width": "100%" }} alt="..." />
                </div>
            </div>
        </div>
    </div>
}

export default Home;