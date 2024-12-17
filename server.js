const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your Discord Webhook URL (obfuscate this later)
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1318421851281821746/wQ6vRwLVRAmYybR4c6RLGEixdLEiHwVmEftkqw7v0Px3XT_e1kyIUY8GX5RFkeLXdlBR";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submissions
app.post("/submit", async (req, res) => {
    const { name, email, application } = req.body;

    // Construct the payload for Discord
    const payload = {
        content: `**New Application Form Submission**\n` +
                 `**Name:** ${name}\n` +
                 `**Email:** ${email}\n` +
                 `**Application:**\n${application}`
    };

    try {
        await axios.post(DISCORD_WEBHOOK_URL, payload);
        res.status(200).json({ success: true, message: "Application sent successfully!" });
    } catch (error) {
        console.error("Error sending to Discord:", error.message);
        res.status(500).json({ success: false, message: "Failed to send application." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
