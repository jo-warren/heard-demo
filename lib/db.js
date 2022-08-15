import { MongoClient } from "mongodb"
import OracleDB from "oracledb"

export async function connectToOracle() {
    return await OracleDB.getConnection({ 
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectionString: process.env.DB_CONNECTION
    })
}

export async function connectToMongo() {
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    return MongoClient.connect(process.env.MONGO_URL, opts)
    .then(client => client.db(process.env.MONGO_DB))
}