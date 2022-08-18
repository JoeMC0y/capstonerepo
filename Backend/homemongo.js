const {MongoClient, ObjectId} = require('mongodb')

const dbName = 'Houses';
const collectionName = 'homes';

const uri = "mongodb+srv://me:C3ll0world@users.33oiczg.mongodb.net/?retryWrites=true&w=majority";



exports.homeStuff = {


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

    createHouse: async function(strAd, city, state, zipcode,  pricing, sqrft, listing, userId){
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName)
            const collection = db.collection(collectionName);

            var newHome = {
                strAd: strAd,
                city: city,
                state: state,
                zipcode: zipcode,
                pricing: pricing,
                sqrft: sqrft,
                listing: listing,
                user: userId
            }

            var results = await collection.insertOne(newHome);

        }catch(e){
            console.log("Database failure")
            console.log(e)
        }finally{
            client.close()
        }
    },

    deleteHouse: async function(id){
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

    updateHome: async function(id, listing){
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            var query = { _id: new ObjectId(id) }
            var update = {
                $set: {
                    listing: listing
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

    homesByID: async function(id){
        const client = await MongoClient.connect(uri);

        try{
            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            var query = { user: id }
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
