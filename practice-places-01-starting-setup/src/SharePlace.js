import { Modal } from './UI/Modal.js';
import { Map } from './UI/Map.js';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';
class PlaceFinder {
  constructor() {
    this.addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.sharedLinkInputElement = document.getElementById('share-link');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
    this.addressForm.addEventListener('submit', (e) =>
      this.findAddressHandler(e)
    );
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.sharedLinkInputElement.select();
      return;
    }
    navigator.clipboard
      .writeText(this.sharedLinkInputElement.value)
      .then(() => {
        alert('the address link is copied into the clipboard');
      })
      .catch((err) => {
        console.log(err);
        this.sharedLinkInputElement.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    console.log(address);
    this.shareBtn.disabled = false;
    this.sharedLinkInputElement.value = `${
      location.origin
    }/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Location feature is not available in your browser - please use a more modern browser or manually enter an address.'
      );
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
        const address = await getAddressFromCoords(coordinates);
        setTimeout(() => {
          modal.hide();
        }, 1000);
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert(
          'Could not locate you unfortunately. Please enter an address manually!'
        );
      }
    );
  }
  async findAddressHandler(event) {
    event.preventDefault();
    /* const formData = new FormData(this.addressForm);
    const formDataObject = Object.fromEntries(formData.entries());
    const address = formDataObject.address */
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      const errorModal = new Modal(
        'error-content',
        'Loading location - please wait!',
        ['Wrong Entries', 'you can not enter empty values in the Address field']
      );
      errorModal.show();
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();
    try {
      const addressInfo = await getCoordsFromAddress(address);
      const coordinates = addressInfo[0];
      const fullAddress = addressInfo[1];
      const coordinatesForOL = {
        lat: coordinates.lat,
        lng: coordinates.lon,
      };
      this.selectPlace(coordinatesForOL, fullAddress);
    } catch (err) {
      modal.hide();
      setTimeout(() => {
        alert(err.message);
      }, 100);
    }
    modal.hide();
  }
}

new PlaceFinder();

/* export async function getAddressFromCoords(coords) {
  return '6th Avenue'; // return any dummy address you want
}

export async function getCoordsFromAddress(address) {
  return { lat: 47.01, lng: 33.55 }; // return any dummy coordinates you want
} */
