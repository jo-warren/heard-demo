import { connectToMongo, connectToOracle } from "../../../lib/db"
import { ObjectId } from "mongodb"


export default async function FamilyRepo() {
    const db = await connectToMongo()
    const collection = db.collection('families')

    return {
        insertOne,
        updateOne,
        findOne
    }

    async function insertOne(name, description, userId) {
        const insertObj = {
            name,
            description,
            users: [userId]
        }

        const eFamily = await collection.insertOne(insertObj)
        return eFamily?.insertedId?.toString()
    }

    async function updateOne(familyId, { name, users }) {
        const filter = { _id: ObjectId(familyId)}
        const options = { upsert: false, returnOriginal: false }
        const updateObj = {}
        if (name) {
            updateObj.$set = { ...updateObj, name}
        }
        if (users) {
            updateObj.$set = { ...updateObj, users: [users]}
        }
        return collection.findOneAndUpdate(filter, updateObj, options)
    }

    async function findOne(filter) {
        return collection.findOne(filter)
    }

    /* async function deleteOne(familyId) */
}