const fs = require('fs');

function writeTasksToFile(tasks) {
    const tasksFilePath = './src/utils/task.manager.js'; 
    const tasksData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(tasksFilePath, tasksData, 'utf8');
}

module.exports = { writeTasksToFile }