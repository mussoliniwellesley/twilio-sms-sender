const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3002;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// Middleware to parse application/json
app.use(bodyParser.json());

app.post("/send-sms", (req, res) => {
  const { body, to } = req.body; // Extract both 'body' and 'to' from the request body

  // Make sure the body and to fields are provided
  if (!body || !to) {
    return res
      .status(400)
      .send("Message body and recipient number are required.");
  }

  client.messages
    .create({
      body: body,
      from: "whatsapp:+14155238886",
      to: to, // Use the recipient number from the request
    })
    .then(() => {
      res.send("SMS sent successfully!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error sending SMS");
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
