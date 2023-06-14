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

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/minefield', (req, res) => {
    const size = req.body.size;
    const bombsCount = req.body.bombsCount;
    const mineField = new mineFieldManager(size, bombsCount);

    res.send({mine: mineField.mine, bombs: Array.from(mineField.bombs), size: mineField.size}).status(200).end()
});

app.post('/linkedSquares/:index', (req, res) => {
    let { index } = req.params;
    const { mineField } = req.body;
    const mineFiledSize = Math.sqrt(mineField.mine.length);

    if (index != parseInt(index)) {
        res.status(400).json({ message: `Bad request, index: ${index} is not an integer` }).end();
        return;
    }

    index = parseInt(index);

    if (!mineField) {
        res.status(404).json({ message: 'Bad request, no mineField object provided' }).end();
        return;
    }

    const mineFieldInstance = new mineFieldManager(mineFiledSize, mineField.bombs.length, mineField.mine, new Set(mineField.bombs));
    const allLinkedZeros = Array.from(mineFieldInstance.getAllLinkedSquares(index));

    res.send({allLinked :allLinkedZeros}).status(200).end();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})