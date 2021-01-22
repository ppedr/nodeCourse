const express = require('express');

const app = express();

app.use(express.json());

app.get('/projects', (request, response) => {

    const { title } = request.query;

    console.log(title);

    return response.json([
        "Node.js Project",
        "Python Project",
        ".NET Project",
    ]);

});

app.post('/projects', (request, response) => {

    const body = request.body;

    console.log(body);

    return response.json([
        "Node.js Project",
        "Python Project",
        ".NET Project",
        "PHP Project",
    ]);

});

app.put('/projects/:id/owner/:owner_id', (request, response) => {

    const params = request.params;

    console.log(params);

    return response.json([
        "Python 3 Project",
    ]);

});

app.delete('/projects', (request, response) => {

    return response.json([
        "Node.js Project",
        "Python 3 Project",
        ".NET Project"
    ]);

});
   
app.listen(4000, () => {
    console.log('Backend started! ✔');
});
