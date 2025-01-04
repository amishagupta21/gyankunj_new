const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post("/execute", async (req, res) => {
  try {
    const { script, language, versionIndex, clientId, clientSecret } = req.body;
    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      script,
      language,
      versionIndex,
      clientId,
      clientSecret,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error executing code");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
