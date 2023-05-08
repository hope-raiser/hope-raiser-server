const express = require("express");
const app = express();
const port = 3001;
const router = require("./src/routes/index.js");
const errorHandler = require("./src/middlewares/errorhandler.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API DOCS
const swaggerUi = require("swagger-ui-express");
const hopeRaiserDocs = require("./src/docs/ApiDocsHopeRaiser.json");
app.use("/hoperaiser-docs", swaggerUi.serve, swaggerUi.setup(hopeRaiserDocs));
app.use("/uploads", express.static("uploads"));

// ROUTER
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
