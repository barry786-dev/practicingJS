const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const router = express.Router();
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

const dataUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ws45o9e.mongodb.net/locations?retryWrites=true&w=majority`;
let client = null;
const errorData = [];
try {
  client = new MongoClient(dataUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.error(e.message);
  errorData[0] = e.message;
}

let database = '';
let locations = '';

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function run() {
  // Connect to the MongoDB cluster
  try {
    if (client) {
      await client.connect();
      // connect to database
      database = client.db('locations');
      // Make the appropriate DB calls
      await listDatabases(client);
      // create user-locations table
      locations = database.collection('user-locations');
    } else {
      throw Error(errorData[0]);
    }
  } catch (err) {
    throw err;
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
    await run();
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
    if (client) {
      await client.close();
    }
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
    // Query for a user location '
    const query = { _id: new ObjectId(req.params.lid) };
    await run().catch((e) => {
      throw e;
    }); // do not try to catch the data base error here otherwise await will be solved and continue to the next line and maybe different error will happened later without knowing the root of the error, let one catch in the end dealing with the errors // or you throw it and catch it in the end
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
    if (client) {
      await client.close();
    }
  }
});

module.exports = router;

/* // using promises
function run() {
  // Connect to the MongoDB cluster
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        listDatabases(client);
        database = client.db('locations');
        locations = database.collection('user-locations');
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

router.get('/location/:lid', (req, res) => {
  // Query for a user location '
  const query = { _id: new ObjectId(req.params.lid) };
  run()
    .then(() => {
      console.log('query', query);
      console.log('locations', locations);
      // res.json({ message: 'Fetched location.', location: locations });
      if (locations !== '') {
        locations.findOne(query).then((location) => {
          console.log('location', location);
          // since this method returns the matched document, not a cursor, print it directly
          if (!location) {
            // console.log(new Date().toLocaleString(), 'Location not found');
            return res.status(404).json({ message: 'Could not find location' });
          }
          res.json({ address: location.address, coords: location.coords });
          client.close();
        });
      } else {
        return res
          .status(404)
          .json({ message: `database not success :>${locations}<` });
      }
    })
    .catch((err) => {
      console.error(err.message);
      res
        .status(404)
        .json({ message: 'location failed to be found!', err: err.message });
    });
});
 */
