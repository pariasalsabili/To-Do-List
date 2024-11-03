# Calendar To-Do-List App
A modern, responsive calendar app that lets users manage a to-do list for each date. The app is built using HTML, CSS, JavaScript, and PHP, with a MySQL database for storing tasks.

![enter image description here](https://s8.uupload.ir/files/screenshot_%2815%29_h6yq.png)
![enter image description here](https://s8.uupload.ir/files/screenshot_%2816%29_0qkw.png)

## Features
- **Calendar Navigation**: Easily switch between months and select a date.
- **To-Do List Management**: Add, update, and delete tasks for each selected date.
- **Task Completion Progress**: Visual progress bar that updates based on completed tasks.
- **Responsive Design**: Works on both desktop and mobile devices.
- **Hover Animations**: Interactive and smooth animations for a better user experience.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP, AJAX
- **Database**: MySQL
- **Tools**: XAMPP (for local development)

## Installation and Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/pariasalsabili/To-Do-List.git

2. **Set Up XAMPP**
  - Download and install XAMPP from Apache Friends.
  - Start Apache and MySQL from the XAMPP Control Panel.

3. **Configure the Project**
  - Move the project folder to the htdocs directory in your XAMPP installation (e.g., C:\xampp\htdocs on Windows).

4. **Import the Database**
  - Open phpMyAdmin in your browser.
  - Create a new database (e.g., calendar_todo_app).
  - Import the app.sql file located in the project folder.

5. **Update Database Configuration**
  - Open api.php and update the database connection details:
    ```bash
    $host = 'localhost';
    $user = 'root';
    $password = ''; 
    $database = 'calendar_todo_app'; 

6. **Run the Application**
  - Visit http://localhost/to-do-list (or YOUR file's name) in your browser to see the app in action.


## License
This project is open-source and available under the MIT License.
