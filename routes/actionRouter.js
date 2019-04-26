const express = require('express');
const action = require('../data/helpers/actionModel.js');
const router = express.Router();

router.post('/', (req, res) => {
    const newAction = req.body;
    if (!newAction.project_id || !newAction.description || !newAction.notes) {
        res.status(400).json({ errorMessage: "Please provide project id, description, and notes for the action." })
    }
    action
        .insert(newAction)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the action to the database" })
        });
});

router.get('/', (req, res) => {
    action
        .get()
        .then(actions => {
            res.status(200).json({actions});
        })
        .catch(err => {
            res.status(500).json({ error: "The actions information could not be retrieved." })
        });
});

router.get('/:id', (req, res) => {
    actionId = req.params.id
    action
     .get(actionId)
     .then(action => {
         if (action.length === 0) {
             res.status(404).json({ message: "The action with the specified ID does not exist." });
             return;
         }
         res.status(200).json(action);
     })
     .catch(err => {
         res.status(500).json({ error: "The action information could not be retrieved." })
     });
});

router.delete('/:id', (req, res) => {
    const actionId = req.params.id
    action
        .remove(actionId)
        .then(actionId => {
            if (actionId === 0) {
                res.status(404).json({ message: "The action with the specified ID does not exist." });
                return;
            }
            res.status(200).json(actionId);
        })
        .catch(err => {
            res.status(500).json({ error: "The action could not be removed" })
        });
});

router.put('/:id', (req, res) => {
    const updateActionId = req.params.id
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ errorMessage: "Please provide project id, description, and notes for the action." })
    }
    action
        .update(updateActionId, req.body)
        .then(action => {
            if (action.length === 0) {
                res.status(404).json({ message: "The action with the specified ID does not exist." });
                return;
            }
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be modified." })
        });
});

module.exports = router;