import { useSelector } from "react-redux";

import { getGenresData } from "../../store/homeSlice";
import "./style.scss";

function Genres({ data, type }) {
    const genres = useSelector(getGenresData);

    return (
        <div className="genres">
            {data?.map((genre) => {
                if (!type && !genres[genre]?.name) return;
                return (
                    <div key={genre} className="genre">
                        {type === "name" ? genre : genres[genre]?.name}
                    </div>
                );
            })}
        </div>
    );
}

export default Genres;
