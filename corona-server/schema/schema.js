const graphql = require("graphql");
const MarkerService = require("../Services/MarkerService");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
} = graphql;

const MarkerType = new GraphQLObjectType({
  name: "Marker",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    position: { type: PositionType },
    flyPosition: { type: PositionType },
  }),
});

const PositionType = new GraphQLObjectType({
  name: "Position",
  fields: () => ({
    x: { type: GraphQLFloat },
    y: { type: GraphQLFloat },
    z: { type: GraphQLFloat },
  }),
});

const MarkerInput = new GraphQLInputObjectType({
  name: "MarkerInput",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    position: { type: PositionInput },
    flyPosition: { type: PositionInput },
  }),
});

const PositionInput = new GraphQLInputObjectType({
  name: "PositionInput",
  fields: () => ({
    x: { type: GraphQLFloat },
    y: { type: GraphQLFloat },
    z: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Marker: {
      type: MarkerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return MarkerService.getById(args.id);
      },
    },
    Markers: {
      type: new GraphQLList(MarkerType),
      resolve(parent, args) {
        return MarkerService.getAll();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    clearMarkers: {
      type: MarkerType,
      resolve(parent) {
        return MarkerService.clean();
      },
    },
    setMarkers: {
      type: MarkerType,
      args: {
        list: { type: new GraphQLList(MarkerInput) },
      },
      resolve: (parent, args) => {
        return MarkerService.addList(args.list);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
