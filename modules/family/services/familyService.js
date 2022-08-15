import FamilyRepo from "../repo/familyRepo"
import { ObjectId } from "mongodb"

export default async function FamilyService() {
    const familyRepo = await FamilyRepo()
    // const emailService = await EmailService()

    return {
        createFamily,
        inviteFamily
    }

    async function createFamily(name, description, userId) {
        if (!name || !description || !userId) {
            throw new Error("Missing required parameter(s)")
        }

        await familyRepo.insertOne(name, description, userId)
    }

    async function inviteFamily(userId, familyId, invitedUser) {
        if (!familyId || !userId || !invitedUser) {
            throw new Error("Missing required parameter(s)")
        }
        
        const eFamily = familyRepo.findOne({ _id: ObjectId(familyId)})
        if (!eFamily) {
            throw new Error("Family not found")
        }

        const newUserList = [...eFamily.users, invitedUser]
        await familyRepo.updateOne(familyId, { users: newUserList })

        /* Create an email module with a service like Twilio
        *  I'd use a queue either in the Db or using a service like rabbitMQ
        *  emailService.sendFamilyInvite(userId, familyId)
        */
    }
}