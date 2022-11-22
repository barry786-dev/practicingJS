const express = require('express');

const router = express.Router();

const locationStorage = {
  locations: [],
};
router.get('/', (req, res) => {
  res.send('ok');
});
router.post('/location', (req, res) => {
  const id = Math.random().toString();
  locationStorage.locations.push({
    id: id,
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng },
  });
  res.json({ message: 'Stored location!', locId: id });
});

router.get('/location', (req, res) => {
  res.send('ok');
});

module.exports = router;
