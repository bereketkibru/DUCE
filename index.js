var config = require("./server/config/config");
var app = require("./server/server");
var logger = require("./server/util/logger");

const port = config.port;

app.listen(port, () => console.log(`server running on port ${port}`));
logger.log("litening on http://loclahost:" + config.port);
