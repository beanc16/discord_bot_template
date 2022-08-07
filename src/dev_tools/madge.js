const madge = require("madge");
const { logger } = require("@beanc16/logger");



madge("./bot.js").then((res) => {
    logger.debug("All Dependencies:\n", res.obj());
    logger.debug("Warnings:\n", res.warnings());
    logger.debug("Circular Dependencies:\n", res.circular());
    logger.debug("Orphan Dependencies:\n", res.orphans());
    logger.debug("Modles w/ No Dependencies:\n", res.leaves());
});
