# GENX ♾️🍵

- The application is based on organization and decoupling between layers and their components, thus providing better maintainability;
- The project also integrates a concept of a class generator engine based on database tables, in order to generate for each table its respective class in each layer;
- The main intention of this project is to optimize development by already applying organization of files and folders, exposing only the development of business rules themselves;
- Under the hood, it is running the Prisma ORM (necessary for class generation) and Express.js for layered architecture, being lightweight and fast;

## How is it organized?

The main layers are 6 and defined as `Core`:

- `Contract`: Where the methods to be implemented in the other layers are defined;
- `Routes`: Configuration class that will be injected into the router;
- `Validator`: Layer for validation of client requests;
- `Controller`: Route controller that will receive the requests;
- `Mapping`: Layer for mapping requested objects;
- `Resolver`: Database access layer;

- The core classes are the parent classes that will be inherited in the modules, where you can create each module grouping its tables as you prefer using the command `yarn module.generate {yourModuleName}`, by default, if no module is passed, all layer classes will be generated in the `api` folder.
- There is a file in the root, called `generator.config.json`, where generator configurations are made, such as tables to be removed, enabling the overwrite of already generated files, and pre-organizing modules following the example, before running the `yarn module.generate` command without specifying in which module you want to generate your tables:

```json
{
    "modules": {
        "{yourModuleName}": ["yourTablesNameToYourModule", ...]
        ...
    } 
}
```

- Requirements to run `yarn module.generate`:

- Run `yarn install`;

- Configure in your .env file the Prisma connection with your database;

- Run `yarn db.pull`;

- Run `yarn db.generate`;

- Run `yarn module.generate`;

- Voilà, just start the server with yarn dev and you will have a magnificent boilerplate of your application, already functional;

P.S.: The current version uses the Prisma ORM to access the database and generate an application with its functional routes, if you want to use another type of database access, it is up to you. Remember that it is up to the developer to implement the other functionalities and business rules that are not our domain, we are just giving you a little push.

### This project is under construction. 👨‍💻🏗️
