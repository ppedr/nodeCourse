const express = require('express');

const { v4: uuid_v4 } = require('uuid');

const app = express();

app.use(express.json());

const projects = [];

// middleware
function logRoutes(request, response, next) {

    const { method, url } = request;

    const route = `[${method.toUpperCase()}] ${url}`;

    console.log(route);

    return next();
}

// app.use(logRoutes); if u wanna see all routes

// list all projects
// app.get('/projects', (request, response) => { without mw for all routes
app.get('/projects', logRoutes, (request, response) => {

    const { title } = request.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);

});

// create a new project
app.post('/projects', (request, response) => {

    const { title, owner } = request.body;

    const id = uuid_v4();

    const project = {
        id,
        title,
        owner
    };

    projects.push(project);

    return response.json(project);

});

// update an existing project
app.put('/projects/:id', (request, response) => {

    const { id } = request.params;

    const { title, owner } = request.body;

    const projectId = projects.findIndex(project => project.id === id);

    if (projectId < 0)
    {
        return response.status(400).json({
            error: 'Project not found! ❌'
        });
    }
    
    const project = {
        id, 
        title, 
        owner
    };

    projects[projectId] = project;

    return response.json(project);

});

// delete an existing project
app.delete('/projects/:id', (request, response) => {

    const { id } = request.params;

    const projectId = projects.findIndex(project => project.id === id);

    if (projectId < 0)
    {
        return response.status(400).json({
            error: 'Project not found! ❌'
        });
    }

    projects.splice(projectId, 1);

    return response.status(204).json([]);

});
   
app.listen(4000, () => {
    console.log('Backend started! ✔');
});
