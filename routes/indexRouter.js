const express = require('express');
const router = express.Router();

/**
 * First Page with form
 */
router.get('/', (req, res) => {
    res.render('form', {});
});

/**
 * Init route
 * Called by first page form after post
 */
router.post('/game/settings/add', (req, res) => {
    // Init game settings
    const playerOne = req.body.playerOne;
    const playerTwo = req.body.playerTwo;
    const objectValue = req.body.objectValue;
    const objectName = req.body.objectName;

    //Test if all inputs exist && price == int
    if (playerOne && playerTwo && objectValue && objectName && Number.isInteger(objectValue)) {
        req.session.playerOne = playerOne;
        req.session.playerTwo = playerTwo;
        req.session.objectValue = objectValue;
        req.session.objectName = objectName;

        req.session.tryResponse = "init"; // init | up | down | null | win
        req.session.isWin = false;
        req.session.numberTry = 0 // Count number try

        res.redirect("/game"); //Start game

    } else {
        res.redirect("/"); // Form not ok, -> reset form
    }

    
});

/**
 * Start game 
 * Called after fill first page form correctly
 */
router.get('/game', (req, res) => {

    //transmit data to "game" view
    res.render('game', {
        playerTwo: req.session.playerTwo,
        objectName: req.session.objectName,
        isWin: req.session.isWin,
        tryResponse: req.session.tryResponse,
        numberTry: req.session.numberTry
    });
});

router.post('/game/check', (req, res) => {
    // add one try
    req.session.numberTry++; 

    const newTry = req.body.newTry;
    const objectValue = req.session.objectValue

    // Change tryResponse value (&& isWin if win)
    if (newTry === null || newTry === "") {
        req.session.tryResponse = "null"
    } else if (newTry === objectValue) {
        req.session.isWin = true // Game win
        req.session.tryResponse = "win"
    } else if (newTry > objectValue){
        req.session.tryResponse = "down"
    } else if (newTry < objectValue){
        req.session.tryResponse = "up"
    }

    res.redirect("/game"); //recall game views with new tryResponse data
});

module.exports = router;