"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_graphql_1 = require("express-graphql");
var CONNECTION_STRING = "mongodb+srv://liorahron11:Lior0101@cluster0.ca3b8.mongodb.net/coronaProject?retryWrites=true&w=majority";
var schema_1 = __importDefault(require("./schema/schema"));
var mapItems = require("./routes/mapItems");
var bodyParser = require("body-parser");
var app = express_1.default();
var port = 9000;
app.use(cors_1.default());
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    graphiql: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/mapItems", mapItems);
mongoose_1.default.connect(CONNECTION_STRING, { useNewUrlParser: true });
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    app.listen(port, function () {
        console.log("listening at http://localhost:" + port);
    });
});
