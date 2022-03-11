require("dotenv").config();
const server = require("./api/server");
const PORT = process.env.PORT;

server.listen(PORT || 9000, () => {
  console.log(`Server running on port ${PORT} 🎈🎆🎇🧨✨🎉`);
});
