const {MongoClient, ObjectId} = require('mongodb')

const dbName = 'Users';
const collectionName = 'People';

const uri = "mongodb+srv://me:C3ll0world@users.33oiczg.mongodb.net/?retryWrites=true&w=majority";



exports.userStuff = {


    getAll: async function(){
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);

            const collection = db.collection(collectionName);

            var query = {};

            var results = await collection.find(query).toArray();


            return results;
        }catch(e){
            console.log("database Failed");
            console.log(e);
        }finally{
            client.close();
        }

    },

    createUser: async function(name, age, UserName, Email){
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName)
            const collection = db.collection(collectionName);

            var newUser = {
                name: name,
                age: age,
                Username: UserName,
                Email: Email
            }

            var results = await collection.insertOne(newUser);

        }catch(e){
            console.log("Database failure")
            console.log(e)
        }finally{
            client.close()
        }
    },

    deleteUser: async function(id){
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            var query = { _id: new ObjectId(id) }
            
            var results = await collection.deleteOne(query);


            return results;
        }catch(e){
            console.log("Database delete Failed");
            console.log(e);
        }finally{
            client.close();
        }
    },

    updateUser: async function(id, name, age, UserName){
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            var query = { _id: new ObjectId(id) }
            var update = {
                $set: {
                    name: name,
                    age: age,
                    Username: UserName
                }
            }

            var results = await collection.updateOne(query, update);

            console.log(results);

            return results;
        }catch(e){
            console.log("Database Update failed");
            console.log(e);
        }finally{
            client.close();
        }
    },

    userByID: async function(id){
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            var query = { _id: new ObjectId(id) }
            var results = await collection.find(query).toArray();
            return results;
        }catch(e){
            console.log("database Failed");
            console.log(e);
        }finally{
            client.close();
        }
    }
}

