import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard.jsx";
import { fetchDataFromApi } from "../../utils/api.js";
import "./style.scss";

function SearchResult() {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        const res = await fetchDataFromApi(
            `/search/multi?query=${query}&page=${pageNum}`
        );
        setData(res);
        setPageNum((page) => page + 1);
        setLoading(false);
    }, [query]);

    const fetchNextPageData = async () => {
        const res = await fetchDataFromApi(
            `/search/multi?query=${query}&page=${pageNum}`
        );
        if (data?.results) {
            setData({
                ...data,
                results: [...data.results, ...res.results],
            });
        } else {
            setData(res);
        }
        setPageNum((page) => page + 1);
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query, fetchInitialData]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>

                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Result not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
}

export default SearchResult;
