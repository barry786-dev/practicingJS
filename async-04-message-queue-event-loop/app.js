const button = document.querySelector('button');
const output = document.querySelector('p');

/* function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    (posData) => {
      setTimeout(() => {
        console.log(posData);
      }, 2000);
    },
    (error) => {
      console.log(error);
    }
  );
  setTimeout(() => {
    console.log('Timer done!');
  }, 0);
  console.log('Getting position...');
} */

button.addEventListener('click', trackUserHandler);

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

function trackUserHandler() {
  /* getPosition().then((posData) => {
    setTimer(2000).then((data) => {
      console.log(posData, data);
    });
  }); */
  let positionData;
  getPosition()
    .then((postData) => {
      positionData = postData;
      return setTimer(2000);
    })
    .then((data) => {
      console.log(data, postData);
    });
  /* navigator.geolocation.getCurrentPosition(
    (posData) => {
      setTimer(2000).then((data) => {
        console.log(data, posData);
      });
    },
    (error) => {
      console.log(error);
    }
  ); */
  setTimer(0).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}
// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
