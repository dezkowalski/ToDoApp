require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const connectDB = require("./db");
const express = require('express');
const cors = require('cors');

connectDB();
const app = express();
app.use(cors());

const port = process.env.PORT || 8000;
app.use("/graphql", graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" }));
app.listen(port, console.log(`server running on port ${port}`));
