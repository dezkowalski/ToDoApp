require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
app.use("/graphql", graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" }));
app.listen(port, console.log(`server running on port ${port}`));
