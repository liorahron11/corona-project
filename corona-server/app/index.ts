import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import mapItems from "./routes/mapItems";
import bodyParser from "body-parser";

const app: express.Application = express();
const CONNECTION_STRING: string =
  "mongodb+srv://liorahron11:Lior0101@cluster0.ca3b8.mongodb.net/coronaProject?retryWrites=true&w=majority";
const port: Number = 9000;

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
app.use("/mapItems", mapItems);

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
const db: mongoose.Connection = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
});
