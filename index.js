const express = require("express");
const app = express();
const port = 3001;
const router = require("./src/routes/index.js");
const errorHandler = require("./src/middlewares/errorhandler.js");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

router.use("/uploads", express.static("uploads"));


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
