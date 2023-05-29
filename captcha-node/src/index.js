require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const axios = require("axios");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const captchaValidator = async (req, res, next) => {
  const { token } = req.body;

  const { data } = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      secret: process.env.SECRET_RECAPTCHA_KEY,
      response: token,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!data.success) {
    console.log(data);

    return res.status(403).json({
      msg: `Error: ${data["error-codes"][0]}`,
    });
  }

  next();
};

app.post("/auth/login", captchaValidator, (req, res) => {
  res.status(200).json({
    msg: "auth ok",
  });
});

app.listen(port, () => {
  console.log(`App listen on port: ${port}`);
});
