import { Center, Grid, Card, CardHeader, CardBody, Text, Link as ChakraLink  } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

interface Users {
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

export async function loader() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await response.json()) as Users[];

  return { users };
}

export default function Users() {
  const { users } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <>
      <Center
        bgGradient="linear(to-r, #1d1055, #27f75b)"
        bgClip="text"
        fontSize={{ base: "32", md: "66" }}
        fontWeight="bold"
        pb={5}
      >
        Our Users
      </Center>
      <Grid pb={10} templateColumns="repeat(5, 1fr)" gap={5}>
        {users.map((user) => (
              <ChakraLink key={user.id} as={Link} to={`/users/${user.id}`}>
              <Card align="center" justify="center" colorScheme="green" my={5}>
                <CardHeader fontWeight="medium" fontSize={{ base: "16", md: "24" }}>
                  {user.name}
                </CardHeader>
                <CardBody>
                  <Text>Username: {user.username}</Text>
                  <Text>Email: {user.email}</Text>
                  <Text>Phone: {user.phone}</Text>
                  <Text>Website: {user.website}</Text>
                </CardBody>
              </Card>
            </ChakraLink>
        ))}
      </Grid>
    </>
  );
}
