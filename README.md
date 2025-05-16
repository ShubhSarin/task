# Backend of my tasks project

### Currently Hosted on Render.com - https://task-ca6l.onrender.com

Frontend Repo - https://github.com/ShubhSarin/tasksFrontend
## I made it using django REST Framework and implemented following things:
### Authentication:
- Register: /authentication/register/ 

    POST Request with username, first name, last name, email and password. It will throw error if username and/or email used is already registered to another user.
- Login: /authentication/login/
    
    POST Request with username and password. Logs a user in upon entering correct username and password combination
- Logout: /authentication/logout/

    DELETE Request. Deletes the authentication token of a user, hence logging out.
- Check: /authentication/check/

    GET Request. Checks if a user is logged in and bypasses login and register page.

### Tasks
- Tasks: /tasks/

    POST Request: Takes a post request with task title and description, adds id, current time .
    
    GET Request: Gets all the tasks of a user.

- Updating tasks: /tasks/{taskID}/
    
    GET Request: Gets the details of a particular task

    PUT Request: Edit the title and/or description of a task, also updates "last updated" time.

    DELETE Request: Deletes a task.