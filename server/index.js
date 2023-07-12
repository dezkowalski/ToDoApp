require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
app.use("./graphql", graphqlHTTP({}));
app.listen(port, console.log(`server running on port ${port}`));
