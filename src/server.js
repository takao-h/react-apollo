const path = require("path")
const fs = require("fs")
const express = require("express")
const bodyPatser = require("body-parser")
const {graphqlExpress, graphiqlExpress} = require("apollo-server-express")
const {makeExecutableSchema,addMockFunctionToSchema} = require("graphql-tools")
const cors = require("cors")

const resolvers = {
  Query:{
    user() {
      return {name: 'takao', id: '0000'}
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql")).toString(),
  resolvers
})

const app = express()
app.use(cors())
app.use("/graphql", bodyPatser.json(), graphiqlExpress({schema}))
app.use("/graphiql", graphiqlExpress({endpoint: "/graphql"}))
app.listen(3001)