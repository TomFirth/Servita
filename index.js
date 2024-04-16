const express = require('express')
const app = express()
const port = 8080
const axios = require("axios")

let startArray = []
let valueCodings = []
let allValues

function iterate (object) {
    Object.keys(object).forEach(key => {
        // console.log("key:", key, "value:", object[key])
        if (key == "start") startArray.push(object[key])
        if (key == "valueCoding") valueCodings.push({
           [object[key].code]: object[key].display
        })
        if (typeof object[key] === 'object' && object[key] !== null) {
            iterate(object[key])
        }
    })
    return { startArray:startArray.sort(), valueCodings }
}

app.get('/aggregate', (req, res) => {
    axios.get("https://directory.spineservices.nhs.uk/STU3/Organization/N81082")
    .then(response => {
        valueCodings = []
        allValues = iterate(response.data.extension)
        res.json({
            maxStart: allValues.startArray[startArray.length-1],
            minStart: allValues.startArray[0],
            valueCodings: allValues.valueCodings
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})