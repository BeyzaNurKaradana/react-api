import { useLoaderData } from "react-router-dom";
import { Params } from "react-router-dom";
import { Card, CardHeader, CardBody, Text, Center, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFavoriteStore } from "../stores/favorites-store";
import { useState, useEffect } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export async function loader({ params }: { params?: Params }) {
  if (!params || !params.postId) {
    throw new Error("Invalid params or id");
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = (await response.json()) as Post;

  const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`)
  const comment = await commentResponse.json() as Comment[];

  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
  const user = await userResponse.json() as User;

  return { post, comment, user };
}

const Post = () => {
  const { post } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { comment } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>; 
  const { posts, addToPosts, removePost } = useFavoriteStore();
  const [isFavorited, setIsFavorited] = useState(false);


  useEffect(() => {
    setIsFavorited(posts.includes(post.id));
  }, [posts, post.id]);

  const toggleFavorite = () => {
    if (isFavorited) {
      removePost(post.id);
    } else {
      addToPosts(post.id);
    }
  };

  return (
    <>
      <Center as={Link} to={`/users/${user.id}`} fontSize={36} color="green" fontWeight="bold" pt={5}>
        {user.name}
      </Center>
      <Card align="center" key={post.id} my={5}>
        <CardHeader fontWeight="medium">{post.title}</CardHeader>
        <CardBody>
          <Text>{post.body}</Text>
          <Center>
            <Button colorScheme={isFavorited ? "red" : "blue"} onClick={toggleFavorite}>
              {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </Center>
        </CardBody>
      </Card>
      <Text fontSize={36} align="center" fontWeight="bold">
        Comments
      </Text>
      {comment.map((comment) => (
        <Card justify="center" align="center" key={comment.id} my={3}>
          <CardHeader>{comment.name}</CardHeader>
          <CardBody>
            <Text>{comment.body}</Text>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default Post;
