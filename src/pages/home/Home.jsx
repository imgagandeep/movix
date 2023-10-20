import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import "./style.scss";

function Home() {
    return (
        <div className="homepage">
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
}

export default Home;
