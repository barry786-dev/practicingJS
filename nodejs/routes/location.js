const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const router = express.Router();
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

const dataUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ws45o9e.mongodb.net/locations?retryWrites=true&w=majority`;
const client = new MongoClient(dataUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let database = {};
let locations = {};

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function run() {
  try {
    // Connect to the MongoDB cluster
    //// await client.connect();
    // connect to database
    database = client.db('locations');
    // Make the appropriate DB calls
    await listDatabases(client);
    // create user-locations table
    locations = database.collection('user-locations');
  } catch (e) {
    console.error(e);
  }
  // finally {
  //   await client.close();
  // }
}

// const locationStorage = {
//   locations: [],
// };

router.get('/', (req, res) => {
  res.send('ok');
});

router.post('/location', async (req, res) => {
  // const id = Math.random().toString();
  try {
    await run().catch(console.dir);
    // create a document to insert
    const newLocation = {
      address: req.body.address,
      coords: { lat: req.body.lat, lng: req.body.lng },
    };
    const result = await locations.insertOne(newLocation);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.json({ message: 'Stored location!', locId: result.insertedId });
  } catch (e) {
    console.error(e);
    res.json({ message: 'location failed to store!', err: e });
  } finally {
    await client.close();
  }

  // main().catch(console.error);
  // locationStorage.locations.push({
  //   id: id,
  //   address: req.body.address,
  //   coords: { lat: req.body.lat, lng: req.body.lng },
  // });
  // res.json({ message: 'Stored location!', locId: id });
});

router.get('/location/:lid', async (req, res) => {
  // const location = locationStorage.locations.find((loc) => {
  //   return loc.id === req.params.lid;
  // });
  try {
    await run().catch(console.dir);
    // Query for a user location '
    const query = { _id: new ObjectId(req.params.lid) };
    /* const options = {
      // sort matched documents in descending order by rating
      sort: { 'imdb.rating': -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    }; */
    const location = await locations.findOne(query);
    // since this method returns the matched document, not a cursor, print it directly
    if (!location) {
      console.log(new Date().toLocaleString(), 'Location not found');
      return res.status(404).json({ message: 'Could not find location' });
    }
    res.json({ address: location.address, coords: location.coords });
  } catch (e) {
    console.error(e.message);
    res
      .status(404)
      .json({ message: 'location failed to be found!', err: e.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
