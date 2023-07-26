const { todos } = require("./sampleData");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,GraphQLList, GraphQLSchema } = require("graphql");

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    completed: {
      type: GraphQLBoolean
    }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (root, args) => {
        return todos;
      }
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return todos.find(todo => todo.id === args.id);
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType
});
