import { useLoaderData } from "react-router-dom";
import { Params } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Center,
  Image,
  Container,
  IconButton
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFavoriteStore } from "../stores/favorites-store";


interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export async function loader({ params }: { params?: Params }) {
  if (!params || !params.albumId) {
    throw new Error("Invalid params or id");
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}`
  );
  const album = await response.json();

  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user = await userResponse.json();

  const photosResponse = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${params.albumId}`
  );
  const photos: Photo[] = await photosResponse.json();

  return { album, user, photos: photos || [] };
}

const Album = () => {
  const { album } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { photos } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const {favorites, addToFavorites, removeFavorites} = useFavoriteStore();

  return (
    <>
      <Center
        as={Link}
        to={`/users/${user.id}`}
        fontSize={36}
        color="green"
        fontWeight="bold"
        pt={5}
      >
        {user.name}
      </Center>
      <Card align="center" key={album.id} my={5}>
        <CardHeader fontWeight="medium">{album.id}</CardHeader>
        <CardBody>
          <Text>{album.title}</Text>
        </CardBody>
      </Card>
      <Container>
        {photos && photos.length > 0 ? (
          photos.map((photo) => (
            <Container key={photo.id} my={3} position="relative">
              <Image src={photo.url} alt={photo.title} />
              <IconButton 
                icon={<FontAwesomeIcon icon={faHeart} />}
                aria-label="Like"
                position="absolute"
                top="90%"
                left="50%"
                transform="translate(-50%, -50%)"
                colorScheme={favorites.includes(photo.id) ? "red" : "white"}
                onClick={() => {
                  if (favorites.includes(photo.id)) {
                    removeFavorites(photo.id); 
                  } else {
                    addToFavorites(photo.id);
                  }
                }}
              />
            </Container>
          ))
        ) : (
          <Text>No photos available</Text>
        )}
      </Container>
    </>
  );
};

export default Album;
