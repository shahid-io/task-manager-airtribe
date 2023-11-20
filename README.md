# Task Manager

- RESTful API with the following endpoints:
`
    GET /tasks: Retrieve all tasks.

    GET /tasks/:id: Retrieve a single task by its ID.

    POST /tasks: Create a new task.

    PUT /tasks/:id: Update an existing task by its ID.

    DELETE /tasks/:id: Delete a task by its ID.
`
- API to fetch Task based on priority level
    `GET /tasks/priority/:level.`

- Filter and Sort API
`
    GET /tasks?status=true: Returns completed tasks.

    GET /tasks?sortBy=creationDate: Returns tasks sorted by creation date.
    
    GET /tasks?status=true&sortBy=creationDate: Returns completed tasks sorted by creation date.
`