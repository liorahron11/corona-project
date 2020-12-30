const graphql = require("graphql");
const MapItemsService = require("../Services/MapItemsService");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
} = graphql;

const MapItemType = new GraphQLObjectType({
  name: "MapItem",
  fields: () => ({
    _id: { type: GraphQLString },
    entity: { type: MarkerType },
    actionType: { type: GraphQLInt },
  }),
});

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

const MapItemInput = new GraphQLInputObjectType({
  name: "MapItemInput",
  fields: () => ({
    _id: { type: GraphQLString },
    entity: { type: MarkerInput },
    actionType: { type: GraphQLInt },
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
      type: MapItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return MapItemsService.getById(args.id);
      },
    },
    Markers: {
      type: new GraphQLList(MapItemType),
      resolve(parent, args) {
        return MapItemsService.getAll();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    clearMarkers: {
      type: MapItemType,
      resolve(parent) {
        return MapItemsService.clean();
      },
    },
    setMarkers: {
      type: MapItemType,
      args: {
        list: { type: new GraphQLList(MapItemInput) },
      },
      resolve: (parent, args) => {
        return MapItemsService.addList(args.list);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
