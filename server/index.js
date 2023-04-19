const express = require("express");
const app = express();
const path = express("path");
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
