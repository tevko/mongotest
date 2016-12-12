const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    insertDocuments(db).then(db => db.close())
});

const insertDocuments = db => new Promise( (resolve, reject) => {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], (err, result) => {
        if (err) {
            reject(err);
            assert.equal(err, null);
        }
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection: ', result);
        resolve(db);
    });
});