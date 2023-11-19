const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task.manager.routes')

const app = express();
const PORT = process.env.PORT || 3000;

/** middleware */
app.use(bodyParser.json());


/** routes */
app.use(taskRoutes);

/** sample endpoint */
app.get("/", (req, res) => {
    res.send("This is sample endpoint")
})



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`)
}
)

// Path: src/index.js
