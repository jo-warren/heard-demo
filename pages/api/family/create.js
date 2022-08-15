import FamilyService from "../../../modules/family/services/familyService"

export default async function handler(req, res) {
    const familyService = await FamilyService()

    if (req.method == "POST") {
        const { userId } = req.userId
        const { name, description } = req.body
        await familyService.createFamily(name, description, userId)
        .catch(err => {
            if (!err.displayMessage) {
                err.displayMessage = "Error creating family group"
            }
            console.log(err)
            res.status(500)
            res.send(err)
        })
        .finally(() => res.end())
    }
}