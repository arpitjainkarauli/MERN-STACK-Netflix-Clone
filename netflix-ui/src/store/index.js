import axios from "axios";
import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMBD_BASE_URL } from "../utils/constants";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres }, } = await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    // console.log(data);
    return genres;
});

    const createArrayFromRawData = (array, moviesArray, genres) =>{
        // console.log(array)
    array.forEach( (movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre)=>{
            const name = genres.find(( {id} ) => id === genre);
            if(name) movieGenres.push(name.name)
        })
        if(movie.backdrop_path){
            moviesArray.push({
                id:movie.id,
                name:movie?.original_name ? movie.original_name : movie.original_title,
                image:movie.backdrop_path,
                genres:movieGenres.slice(0, 3),
            });
        }
    });    
    }

const getRawData = async (api, genres, paging) => { 
    const moviesArray = [];
    for(let i = 1;  moviesArray.length <  60 && i < 10; i++)
    {
       const {data:{ results } } = await axios.get(`${api}${paging ?`&page=${i}`: ""}`
     
    );
         createArrayFromRawData(results,moviesArray,genres);
    }
    // console.log({moviesArray})
    return moviesArray;    
};



export const fatchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkApi) => {
    const { netflix: { genres }, } = thunkApi.getState();
    return getRawData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
    // console.log(data);
}
)


export const fatchDataByGenre = createAsyncThunk("netflix/moviesByGenres", async ({ genre,type }, thunkApi) => {
    console.log("fatch data by", genre, type)
    const { netflix: { genres }, } = thunkApi.getState();
    return getRawData(`https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`, genres);
    }
)

export const getUserLikedMovies =createAsyncThunk("netflix/getLiked", async(email)=>{
    const {data: {movies},} = await axios.get(`http://localhost:5000/api/user/liked/${email}`)
    return movies
})

export const removeFormLikedMovies =createAsyncThunk("netflix/deleteLiked", async({email,movieId})=>{
    const {data: {movies},} = await axios.put(`http://localhost:5000/api/user/delete`,{email,movieId})
    return movies
})


const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (buiLder) => {
        buiLder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        })
        buiLder.addCase(fatchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        buiLder.addCase(fatchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        buiLder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        buiLder.addCase(removeFormLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});