const { todos } = require("./sampleData");
const Todo = require("./Todo");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,GraphQLList, GraphQLSchema, GraphQLNonNull } = require("graphql");

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
        return Todo.find();
      }
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Todo.findById(args.id);
      }
    }
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
    fields: {
      addTodo: {
        type: TodoType,
          args: {
          title: { type: GraphQLNonNull(GraphQLString)},
          completed: { type: GraphQLNonNull(GraphQLBoolean)},
        },
        resolve: (parent, args) => {
          const todo = new Todo({
            title: args.title,
            completed: false,
          });
          return todo.save();
        },
      },
    },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
