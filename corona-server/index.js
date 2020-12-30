const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const markers = require("./routes/markers");
const mapItems = require("./routes/mapItems");
const assets = require("./routes/assets");
const bodyParser = require("body-parser");
const app = express();
const port = 9000;

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", assets);
app.use("/mapItems", mapItems);

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://liorahron11:Lior0101@cluster0.ca3b8.mongodb.net/coronaProject?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
});
