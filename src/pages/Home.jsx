import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import { getUsers } from "../api/users";


export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const error = null;

  useEffect(() => {
    function buscaJSON() {
      const users = JSON.parse(storageUsers);
      setUsers(users);
      setLoading(false);
    }

    const storageUsers = localStorage.getItem("users");
    if (storageUsers) { buscaJSON()
    } else {
      const execUsers = async () => {
        const response = await getUsers();
        localStorage.setItem("users", JSON.stringify(response.data.results));
        setUsers(response.data.results);
        setLoading(false);
      };
      execUsers();
    }
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minWidth: "100vw", display: "flex", flexDirection: "column" }}>
      <Box>
        <Typography variant="h3" component="h1" fontWeight="bold">
          Bem-vindo à Lista de Usuários
        </Typography>
        <Typography variant="subtitle1" mt={1}>
          Explore os detalhes dos usuários cadastrados
        </Typography>
      </Box>
      <Container maxWidth="lg" sx={{ flex: 1, mt: 4 }}>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.email}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
