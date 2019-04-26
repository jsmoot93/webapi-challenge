const express = require('express');
const project = require('../data/helpers/projectModel.js');
const router = express.Router();

router.post('/', (req, res) => {
    const newProject = req.body;
    if (!newProject.name || !newProject.description) {
        res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    }
    project
        .insert(newProject)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the project to the database" })
        });
});

router.get('/', (req, res) => {
    project
        .get()
        .then(projects => {
            res.status(200).json({projects});
        })
        .catch(err => {
            res.status(500).json({ error: "The projects information could not be retrieved." })
        });
});

router.get('/:id', (req, res) => {
    projectId = req.params.id
    project
     .get(projectId)
     .then(project => {
         if (project.length === 0) {
             res.status(404).json({ message: "The project with the specified ID does not exist." });
             return;
         }
         res.status(200).json(project);
     })
     .catch(err => {
         res.status(500).json({ error: "The project information could not be retrieved." })
     });
});

router.delete('/:id', (req, res) => {
    const projectId = req.params.id
    project
        .remove(projectId)
        .then(projectId => {
            if (projectId === 0) {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
                return;
            }
            res.status(200).json(projectId);
        })
        .catch(err => {
            res.status(500).json({ error: "The project could not be removed" })
        });
});

router.put('/:id', (req, res) => {
    const updateProjectId = req.params.id
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    }
    project
        .update(updateProjectId, req.body)
        .then(project => {
            if (project.length === 0) {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
                return;
            }
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be modified." })
        });
});

router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id;
    project
        .getProjectActions(projectId)
        .then(actions => {
            if(actions === 0) {
                res.status(404).json({ message: "There are no actions from this project."});
                return;
            }
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ error: "Actions for this project could not be found."})
        })
})

module.exports = router;