
module.exports = {
    dragonTreasure: async (req,res) => {
        const db = req.app.get('db')
        const result = await db.get_dragon_treasure(1)
        res.send(result)
    },
    getUserTreasure: async (req,res) => {
        const db = req.app.get('db')
        const result = await db.get_user_treasure([req.session.user.id])
        res.send(result)
    },
    addUserTreasure: async (req,res) => {
    try{
        const {id} = req.session.user
        const {treasureURL} = req.body
        const db = req.app.get('db')
        const result = await db.add_user_treasure([treasureURL, id])
        console.log(result)
        res.send(result)
    }
    catch(error) {
        console.log(error)
    }
    },
    getAllTreasure: async (req,res) => {
        try{
            const db = req.app.get('db')
            const result = await db.get_all_treasure()
            res.send(result)
        }
        catch(error) {
            console.log(error)
        }
    }

}
