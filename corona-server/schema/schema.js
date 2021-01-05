"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql = require("graphql");
var _a = require("../Services/MapItemsService"), getAll = _a.getAll, clean = _a.clean, addList = _a.addList;
var GraphQLObjectType = graphql.GraphQLObjectType, GraphQLString = graphql.GraphQLString, GraphQLFloat = graphql.GraphQLFloat, GraphQLSchema = graphql.GraphQLSchema, GraphQLList = graphql.GraphQLList, GraphQLInputObjectType = graphql.GraphQLInputObjectType, GraphQLInt = graphql.GraphQLInt, GraphQLBoolean = graphql.GraphQLBoolean;
var MapItemType = new GraphQLObjectType({
    name: "MapItem",
    fields: function () { return ({
        _id: { type: GraphQLString },
        entity: { type: MarkerType },
        actionType: { type: GraphQLInt },
        saved: { type: GraphQLBoolean },
    }); },
});
var MarkerType = new GraphQLObjectType({
    name: "Marker",
    fields: function () { return ({
        name: { type: GraphQLString },
        position: { type: PositionType },
    }); },
});
var PositionType = new GraphQLObjectType({
    name: "Position",
    fields: function () { return ({
        x: { type: GraphQLFloat },
        y: { type: GraphQLFloat },
        z: { type: GraphQLFloat },
    }); },
});
var MapItemInput = new GraphQLInputObjectType({
    name: "MapItemInput",
    fields: function () { return ({
        _id: { type: GraphQLString },
        entity: { type: MarkerInput },
        actionType: { type: GraphQLInt },
        saved: { type: GraphQLBoolean },
    }); },
});
var MarkerInput = new GraphQLInputObjectType({
    name: "MarkerInput",
    fields: function () { return ({
        name: { type: GraphQLString },
        position: { type: PositionInput },
    }); },
});
var PositionInput = new GraphQLInputObjectType({
    name: "PositionInput",
    fields: function () { return ({
        x: { type: GraphQLFloat },
        y: { type: GraphQLFloat },
        z: { type: GraphQLFloat },
    }); },
});
var RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        Markers: {
            type: new GraphQLList(MapItemType),
            resolve: function () {
                return getAll();
            },
        },
    },
});
var Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        clearMarkers: {
            type: MapItemType,
            resolve: function () {
                return clean();
            },
        },
        setMarkers: {
            type: MapItemType,
            args: {
                list: { type: new GraphQLList(MapItemInput) },
            },
            resolve: function (parent, args) {
                return addList(args.list);
            },
        },
    },
});
exports.default = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
