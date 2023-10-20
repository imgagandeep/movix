import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/Details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { fetchDataFromApi } from "./utils/api";

function App() {
    const dispatch = useDispatch();

    const genresCall = useCallback(async () => {
        let promises = [];
        let endPoints = ["tv", "movies"];
        let allGenres = {};

        endPoints.forEach((endPoint) => {
            promises.push(fetchDataFromApi(`/genre/${endPoint}/list`));
        });

        const data = await Promise.all(promises);

        data.map(({ genres }) => {
            return genres?.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    }, [dispatch]);

    useEffect(
        function () {
            const fetchApiConfig = async () => {
                const res = await fetchDataFromApi("/configuration");

                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                };

                dispatch(getApiConfiguration(url));
            };

            fetchApiConfig();
            genresCall();
        },
        [dispatch, genresCall]
    );

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/Search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
