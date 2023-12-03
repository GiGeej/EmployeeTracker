# Employee Tracker

## Description

Employee Tracker is a command-line application that allows you to manage departments, roles, and employees within an organization. It interacts with a MySQL database to store and retrieve data related to employees, their roles, and the departments they work in.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the Employee Tracker application, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/employee-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd employee-tracker
   ```

3. Install dependencies

   ```bash
   npm install
   ```

## Usage

To start the application, run the following command:

```
node server.js
```

The application will prompt you with a menu to perform various actions, such as viewing departments, roles, and employees, adding new departments, roles, and employees, and updating employee roles.

Follow the on-screen prompts to interact with the application.

## Database Setup

Before using the Employee Tracker, ensure that you have set up the MySQL database with the required schema. You can use the provided schema.sql file to create the necessary tables and relationships.

1. Create the database:

```sql
CREATE DATABASE employees_db;
```

2. Use the database:

```sql
USE employees_db;
```

3. Run the schema.sql file to create tables:

```sql
source schema.sql;
```

## Contributing

Contributions are welcome! If you would like to contribute to the project, follow these steps:

Fork the repository
Create a new branch: git checkout -b feature-name
Make your changes and commit them: git commit -m 'Add feature'
Push to the branch: git push origin feature-name
Submit a pull request

## License

This project is licensed under the MIT License.

## Walk through video

https://drive.google.com/file/d/1wDpVGO97lwMK7K3kr2LHZltvsR1aDJj5/view
