import React, { createContext } from "react";
import Modal from "react-modal";
import Youtube from "react-youtube";
const MovieContext = createContext();
const customStyles = {
    overlay:{
      position: "fixed",
      zIndex: 9999,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
const MovieProvider = ({children}) =>{
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [trailerKey,setTrailerKey] = React.useState("");
  
  const handleTrailer = async (id) => {
    setTrailerKey('');
    try {
      const url =
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        };
      const movieKey = await fetch(url,options);
      const data = await movieKey.json();
      setTrailerKey(data.results[0].key);
      setIsOpen(true);
    } catch (error) {
      setIsOpen(false);
      console.log(error);
    }
  };
  return(
    <MovieContext.Provider value={handleTrailer} >
        {children}
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Youtube videoId={trailerKey} opts={opts}></Youtube>

      </Modal>
    </MovieContext.Provider>
  )
}
export {MovieProvider,MovieContext}