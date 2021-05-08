import axios from "axios";

const API = {
    searchMovieByTitle: function (movie) {
        return axios.get(`http://www.omdbapi.com/?t=${movie}&type=movie&plot=full&apikey=${process.env.REACT_APP_KEY}`)
    },
    searchMovie: function (movie) {
        return axios.get(`http://www.omdbapi.com/?s=${movie}&type=movie&apikey=${process.env.REACT_APP_KEY}`)
    }

};
export default API;