import mongoose, { Mongoose } from "mongoose";

export class MongooseDb {

    private connection: Promise<Mongoose | null> = new Promise((resolve, reject) => {
        resolve(null)
    })


    async connect(): Promise<Mongoose> {
        return mongoose.connect(process.env.DB_URL!);
    }

    async getConnection(): Promise<Mongoose | null> {
        if (this.connection) {
            return this.connection
        }
        this.connection = this.connect();
        console.log(this.connection);
        return this.connection;
    }


}