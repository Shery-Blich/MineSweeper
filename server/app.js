const express = require('express');
const cors = require('cors')
const mineFieldManager = require("./mineFieldManager");
const bodyParser = require("express");
const app = express();
const port = 3080;
const corsOptions = {
    origin: `http://localhost:3000`,
    credentials: true
}

let mineField = null;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/minefield', (req, res) => {
    const {size} = req.body;
    mineField = new mineFieldManager(size);

    res.send({mine: mineField.mine, bombs: Array.from(mineField.bombs)}).status(200).end()
});

app.get('/linkedSquares/:i', (req, res) => {
    let {i} = req.params;

    if (i != parseInt(i)) {
        res.status(400).json({message: 'Bad request, i is not an integer'}).end();
        return;
    }

    i = parseInt(i);

    if (!mineField) {
        res.status(404).json({message: 'Bad request, no mine was created'}).end();
        return;
    }

    const allLinkedZeros = Array.from(mineField.getAllLinkedSquares(i));

    res.send({allLinkedZeros}).status(200).end();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})