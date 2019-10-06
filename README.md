# Selenium Starter

This project serves as a demo configuration for distributed end to end testing with Selenium and
 Docker. The
setup leverages Selenium Grid for parallel browser testing and Selenium Standalone for a VNC-enabled server to aid with visual debugging.
 
## Tools
- Language: **Node.js**
- Testing framework: **Jest**
- Browser automation framework: **Selenium**
- Browser: **Chrome**
- Platform: **Docker**
  
## System requirements
- Unix-based OS (Mac OS, Linux)
  - NOTE: shell commands have been structured for unix-based systems. This setup has not yet been
   adapted for Window environments.
- Node.js 10.x
- NPM 6.x

## Project setup
- Clone repository: `git clone ssh://git@bitbucket.t4g.com:7999/msd/selenium-starter.git`
- Install dependencies: `npm i`

## Usage
### Run tests (distributed architecture)
Selenium Grid enables us to distribute test execution across different machines. The architecture
 uses a central hub from which tests commands are delegated to multiple nodes, each running a separate
  browser instance. For the purpose of this demo, the grid has been hard-coded to spawn five (5) nodes, which self-register to the hub. Using Jest as our testing framework, test execution is
   then parallelized across the grid nodes using worker processes (via the `--maxWorker` CLI arg). 

An npm script, `npm run test` has been mapped to a shell script, which sets up, runs and tears down
 the docker-compose services that have been configured with the Selenium Grid, Chrome node and
  test Docker images.
```
npm run test
```

### Run Tests (visual debug mode)
Selenium provides a VNC-enabled Docker image running Selenium Standalone Server. This allows
 users to visually debug tests by directly accessing the Chrome browser instance used to execute
  the tests.
  
The npm script `npm run test-debug` launches the Selenium server and executes the test. During test execution, you may run `npm run vnc`, which launches the default VNC client (Mac
 only for now) giving you access to the active test browser instance. 
```
npm run test-debug
```

### Git hooks
In an effort to keep the project repository up-to-date with clean code git hooks have been created to run code quality and test scripts before `commit`ting and before `push`ing changes. If any of the scripts in the hooks below report an error the commit/push will be aborted, which encourages you to fix the code quality/test issues before proceeding.

Git hooks are managed via [https://www.npmjs.com/package/husky](husky), which allows adding the appropriates scripts to run via the scripts block in the package.json.

NOTE: In exceptional cases, you have the option to skip the hooks by simply adding the `--no-verify` flag to the commit or push command (`git commit -m "<YOUR_MSG>" --no-verify` or `git push --no-verify`)

#### Pre-commit
Before each commit, only code quality (eslint) checks will be made. The following commands will be automatically run:

```
$ npm run eslint
```
