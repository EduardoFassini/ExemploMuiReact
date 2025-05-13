import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

export default function UserCard({ user }) {
  return (
    <Card sx={{width:345}}>
      <Box textAlign="center">
        <Avatar
          src={user.picture.medium}
          alt={`${user.name.first} ${user.name.last}`}
          sx={{ width: 80, height: 80, margin: "0 auto" }}
        />

        <Typography variant="h6" component={"div"} sx={{ mt: 5 }}>
          {user.name.first} {user.name.last}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {user.email}
        </Typography>

        <Link
          to={`/details/${user.email}`}
          style={{ textDecoration: "none", marginTop: "5px" }}
        >
          <Typography variant="body2" color="secondary">
            Ver detalhes
          </Typography>
        </Link>
      </Box>
    </Card>
  );
}
