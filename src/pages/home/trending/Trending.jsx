import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Carousel from "../../../components/carousel/Carousel";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";

function Trending() {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/trending/all/${endpoint}`);

    const handleTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs
                    data={["Day", "Week"]}
                    onTabChange={handleTabChange}
                />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
}

export default Trending;
