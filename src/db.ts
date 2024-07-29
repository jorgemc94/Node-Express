import mongoose from "mongoose";

export async function connectdb() {
    mongoose.connection.on('conected', () => {
        console.log('mongoose ​​successfully connected to database')
    })

    mongoose.connection.on('conected', (error) => {
        console.log('error connecting mongoose ​​to database', error)
    })

    await mongoose.connect(process.env.MONGO_KEY!)
}

connectdb().catch(err => console.log(err));