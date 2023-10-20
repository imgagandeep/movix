import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: {},
    genres: {},
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;

export const getUrl = (state) => state.home.url;
export const getGenresData = (state) => state.home.genres;
