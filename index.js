var config = require("./server/config/config");
var app = require("./server/server");
const port = config.port;

app.listen(port, () => console.log(`server running on port ${port}`));
console.log("litening on http://loclahost:" + config.port);
