import { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { PlayIcon } from "../detailsBanner/PlayIcon";
import "./style.scss";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video) => (
                            <div key={video.id} className="videoItem">
                                <div
                                    className="videoThumbnail"
                                    onClick={() => {
                                        setVideoId(video?.key);
                                        setShow(true);
                                    }}
                                >
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

const loadingSkeleton = () => {
    return (
        <div className="skItem">
            <div className="thumb skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    );
};

export default VideosSection;
