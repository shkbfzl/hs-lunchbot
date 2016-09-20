# HS Lunch Bot



Install the project

```
npm install
```

Run all test

```
npm test
```

Run single test

```
mocha test/specs/{path_to_the_file}
```

### Project structure

At the root

```
/config
  |- index.js
  |- default.js
  |- dev.js
  |- prod.js
/lib
/src/
  |- /command  
  |- /core
  |- /error
  |- /model
  |- /util
/test
  |- /resources
  |- /specs
```

- **config** - Contains different environment config

- **lib** - Contains external libraries that are not available on NPM

- **src** - Contains all the project classes
	- **command** - You new command should be store here (Don't forget to extend **BaseCommand** class)
	- **core** - Contains core classes
	- **core** - Contains custom error classes
	- **model** - Contains datasource models like: DynamoDb, MongoDb, Redis, etc...
	- **util** - Contains helper functions

- **test** 
	- **resources** - Contains test resource files
	- **specs** - Contains unit test specs. Each classes' unit test should be organise following his directory structure. For example:
	
	```
	
	# A comman class
	/src/command/Hello.js
	
	# Unit test will be localted
	/test/specs/command/Hello.js
	```

### Environement
The application environment is defined with env variable `LUNCH_BOT_ENV`. 
The config module always load the `default.js` first the environment config.

### Command interface

```
WOKRING ON THIS
```
### NLP Engine


```
WOKRING ON THIS
```
