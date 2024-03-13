import { Center, IconButton } from "@chakra-ui/react";
import { useFavoriteStore } from "../stores/favorites-store"
import { Photo } from "./album";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Favorites = () => {
     const [favoritePhotos, setFavoritePhotos] = useState([]);

const { favorites, removeFavorites } = useFavoriteStore();


useEffect(() => {
    const fetchFavoritePhotos = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/photos");
      const data = await response.json();
      const filteredPhotos = data.filter((photo: Photo) => favorites.includes(photo.id));
      setFavoritePhotos(filteredPhotos);
    };

    fetchFavoritePhotos();
  }, [favorites]);

  return (
    <div>
    <Center>Your Favorite Photos</Center>
    {favoritePhotos.length > 0 ? (
      favoritePhotos.map((photo: Photo) => (
        <Center key={photo.id}>
          <Link to={`/users/:userId/albums/${photo.albumId}`}>
            <img src={photo.url} alt={photo.title} />
          </Link>
          <IconButton
            icon={<FontAwesomeIcon icon={faHeart} />}
            aria-label="Remove from Favorites"
            colorScheme="red"
            onClick={() => removeFavorites(photo.id)}
          />
        </Center>
      ))
    ) : (
      <Center>No favorite photos yet!</Center>
    )}
  </div>
  );
};

export default Favorites