const express = require("express");

const app = express();

app.get('/', (req, res) => {

    const photo = {
        id:1,
        name:"Photo Name",
        description: "Photo description"
    }
    res.send(photo)
})

const port = 3010;

app.listen(port, () => {
    console.log(`Sunucu ${port} baslatildi`);
})

