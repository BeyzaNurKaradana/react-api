import { useLoaderData } from "react-router-dom";
import {
  Box,
  Text,
  Card,
  CardHeader,
  CardBody,
  Center,
  Grid,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Params } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function loader({ params }: { params?: Params }) {
  if (!params || !params.userId) {
    throw new Error("Invalid params or userId");
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user = (await response.json()) as User;

  return { user };
}

async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const posts = await response.json();

  return { posts };
}

async function getAlbums() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");

  const albums = await response.json();

  return { albums };
}

async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  const todos = await response.json();

  return { todos };
}

export default function UserDetails() {
  const [tabIndex, setTabIndex] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  useEffect(() => {
    async function fetchData() {
      if (tabIndex === 1) {
        const { posts: fetchedPosts } = await getPosts();
        setPosts(fetchedPosts);
      } else if (tabIndex === 2) {
        const { albums: fetchedAlbums } = await getAlbums();
        setAlbums(fetchedAlbums);
      } else if (tabIndex === 3) {
        const { todos: fetchedTodos } = await getTodos();
        setTodos(fetchedTodos);
      }
    }

    fetchData();
  }, [tabIndex]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs onChange={(index) => setTabIndex(index)} align="center">
      <TabList>
        <Tab>User</Tab>
        <Tab>Posts</Tab>
        <Tab>Albums</Tab>
        <Tab>Todos</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            py={10}
          >
            <Card
              size="lg"
              align="center"
              justify="center"
              colorScheme="green"
              my={5}
            >
              <CardHeader
                fontWeight="medium"
                fontSize={{ base: "16", md: "24" }}
              >
                {user.name}
              </CardHeader>
              <CardBody>
                <Text>Username: {user.username}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Phone: {user.phone}</Text>
                <Text>Website: {user.website}</Text>
              </CardBody>
            </Card>
          </Box>
        </TabPanel>
        <TabPanel>
          <Center
            bgGradient="linear(to-l, #70095a, #959cff)"
            bgClip="text"
            fontSize={{ base: "32", md: "66" }}
            fontWeight="bold"
            pb={5}
          >
            Posts
          </Center>
          {posts.map((post) => {
            if (post.userId === user.id)
              return (
                <Card key={post.id} as={Link} to={`posts/${post.id}`} my={5}>
                  <CardHeader fontWeight="medium">{post.title}</CardHeader>
                  <CardBody>
                    <Text>{post.body}</Text>
                  </CardBody>
                </Card>
              );
          })}
        </TabPanel>
        <TabPanel>
          <Center
            bgGradient="linear(to-r, #1cbe80, #959cff)"
            bgClip="text"
            fontSize={{ base: "32", md: "66" }}
            fontWeight="bold"
            pb={5}
          >
            Albums
          </Center>
          <Grid pb={10} templateColumns="repeat(5, 1fr)" gap={5}>
            {albums.map((album) => {
              if (album.userId === user.id)
                return (
                  <Card key={album.id} my={5} as={Link} to={`albums/${album.id}`}>
                    <CardHeader fontWeight="medium">{album.title}</CardHeader>
                    <CardBody></CardBody>
                  </Card>
                );
            })}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Center
            bgGradient="linear(to-l, #ec3856, #959cff)"
            bgClip="text"
            fontSize={{ base: "32", md: "66" }}
            fontWeight="bold"
            pb={5}
          >
            Todos
          </Center>
          {todos.map((todo) => {
            if (todo.userId === user.id)
              return (
                <Card key={todo.id} my={5}>
                  <CardHeader fontWeight="medium">{todo.title}</CardHeader>
                  <CardBody>
                    <Text>Completed? {JSON.stringify(todo.completed)}</Text>
                  </CardBody>
                </Card>
              );
          })}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
