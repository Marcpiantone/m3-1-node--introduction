"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const monkeyRandomQuotes = () => {
      return messages[Math.floor(Math.random() * 6)];
    };
    const message = {
      author: "monkey",
      //text: "TEST",
      text: monkeyRandomQuotes(),
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/parrot-message", (req, res) => {
    console.log(req.query.text);
    const message = {
      author: "parrot",
      text: `${req.query.text}`,
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    const getBotMessage = (text) => {
      const commonGreetings = ["hi", "hello", "howdy"];
      const commonGoodbyes = ["goodbye", "later", "bye"];
      let botMsg = `${req.query.text}`;

      commonGreetings.forEach((greeting) => {
        if (text.toLowerCase().includes(greeting)) {
          botMsg = "Hello!";
        }
      });

      commonGoodbyes.forEach((goodbye) => {
        if (text.toLowerCase().includes(goodbye)) {
          botMsg = "Goodbye!";
        }
      });
      // const jokes = [
      //   "Why did the chicken commit suicide? To get to the other side.",
      //   "Q: What’s the difference between England and a tea bag? A: The tea bag stays in the cup longer.",
      //   "A dyslexic man walks into a bra.",
      // ];
      // if (text.toLowerCase().includes("something funny")) {
      //   botMsg = "Would you like to hear a joke ? Answer 'Yes' or 'No'";
      //   jokeMode = true;
      // }
      // if (jokeMode === true) {
      //   if (text.toLowerCase().includes("yes")) {
      //     botMsg = `${jokes[1]}`;
      //   }
      // }
      // return console.log(jokeMode);
      return botMsg;
    };

    const message = {
      author: "bot",
      text: `Bzzt ${getBotMessage(req.query.text)}`,
    };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
