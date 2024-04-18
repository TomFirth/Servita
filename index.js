import express from 'express';
import axios from 'axios';

const app = express();

let startArray = [], valueCodings = [];

const iterate = (object) => {
  Object.keys(object).forEach(key => {
    if (key === "start") startArray.push(object[key]);
    if (key === "valueCoding") {
      valueCodings.push({
        [object[key].code]: object[key].display
      });
    }
    if (typeof object[key] === 'object' && object[key] !== null) {
      iterate(object[key]);
    }
  });
  return { startArray: startArray.sort(), valueCodings };
};

app.get('/aggregate', (req, res) => {
  axios.get('https://directory.spineservices.nhs.uk/STU3/Organization/N81082')
    .then(response => {
      const { startArray, valueCodings } = iterate(response.data.extension);
      res.status(200).json({
        maxStart: startArray[startArray.length - 1],
        minStart: startArray[0],
        valueCodings
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send(error);
    });
});

app.listen(8080, () => {
  console.log('Ready');
});
