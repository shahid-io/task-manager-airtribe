const fs = require('fs');
const path = require('path');
// const tasksFilePath = path.join(__dirname, 'tasks.json');
const tasksFilePath = path.join(__dirname, '..', 'utils', 'tasks.json');

function readTasksFromFile() {
    try {
        const tasksData = fs.readFileSync(tasksFilePath, 'utf8');
        return JSON.parse(tasksData);
    } catch (error) {
        console.error('Error reading tasks from file:', error);
        return [];
    }
}

function writeTasksToFile(tasks) {
    try {
        const tasksData = JSON.stringify(tasks, null, 2);
        fs.writeFileSync(tasksFilePath, tasksData, 'utf8');
    } catch (error) {
        console.error('Error writing tasks to file:', error);
    }
}

module.exports = {
    readTasksFromFile,
    writeTasksToFile,
};


