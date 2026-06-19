const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3003;
app.use(express.json());

const notifications = [];

app.get("/health", (req, res) => res.json({ status: "ok", service: "notification-service" }));

app.get("/notifications", (req, res) => {
  res.json({ notifications });
});

app.post("/notifications", (req, res) => {
  const { to, message, type } = req.body;
  if (!to || !message) {
    return res.status(400).json({ error: "to and message are required" });
  }
  const notification = {
    id: uuidv4(),
    to,
    message,
    type: type || "email",
    status: "sent",
    createdAt: new Date().toISOString(),
  };
  notifications.push(notification);
  console.log(`📧 Sent ${notification.type} to ${to}: ${message}`);
  res.status(201).json(notification);
});

app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
