# stylebox
starter kit for every front-end project


## Initialize the project
### 1. Prepare your work environment
Install development tools:
* [Git] (https://git-scm.com/)
* [Node.js] (https://nodejs.org/en/)
### 2. Recover the sources
Clone the repository:



`` `
$ git clone https://github.com/bob69009/stylebox.git


`` `
### 3. Install the dependencies
Install the modules with [npm] (https://npmjs.org):
`` `Bash
$ npm install
`` `

Install globally gulp
`` `
$ npm install -g gulp
`` `
## Project organisation
- * package.json * => list all the modules of the project
> To add a module:
`` `Bash
$ npm install --save-dev <modulename>
`` `
To delete a module:
`` `Bash
$ npm uninstall --save-dev <modulename>
`` `

- * .gitignore * => all folders & files that will not be versioned.
- * gulpfile.js * => call the various gulp tasks in the * gulp-task * folder
- * gulp-task / * => set of [gulp tasks] (## Gulp tasks) available
- * app / *:
 - * css / * => toolbox styles and unminified project models
 - * doc / * => styles of the doc toolbox
 - * docroot / * => original sources of the project
 - * fonts *
 - * images *
 - * include / * => html layout files that are called by the general Toolbox template (index.html) or a template
 - * js / * => Toolbox plugins
 - * lotxxx / * => Development models of the different lots
 - * output / * => production folder of the Toolbox (do not touch the code)
 - * scripts *
  - * vendor * => plugin & external libraries
 - * styles * => Generation of css via preprocessor: [sass] (http://sass-lang.com/)
 - * toolbox / * => pages of the Toolbox
 - * \ *. html *
    
To include a layout in an html page:
`` `
<! - @@ include /include/content.html ->
`` `

## Gulp stains
To launch a gulp task:
`` `Bash
$ gulp <taskname>
`` `
Tasks * gulp *:
- * build *: create a ** dist / ** folder with compiled and usable sources
- * clean *: delete the directory ** dist / **
- * sass *: compiles * .scss * files into * .css *
- * serve *:
 - Create a local server for the models: ** localhost: 9004 ** to visualize the project
 - For each source modifications * .html *, * .scss *, * .js *: update the browser
- * servetool *:
 - Create a local server for the toolbox: ** localhost: 9004 ** to view the project
 - Only use the app folder /
 - Copy all ** app / ** resources in ** output / ** which is the final remote directory of the Toolbox
 - For each source changes in app / ** -> ** * .html *, * .scss *, * .css * (fwk-Toolbox), * .js *: update the ** output / * folder *
 - For each source modifications in output / ** -> ** * .html *, * .scss *, * .css *, * .js *: update the browser
- * clean2 *: delete the ** output / ** directory

If the command fails, install the missing gulp packages:
`` `
$ npm install
`` `

## Starting a new batch

- create an index file and do not overwrite the existing index.html
- Put the html mockups at the root of app /
- Use only tasks
`` `Bash
$ gulp serve
`` `
 and
`` `Bash
$ gulp build
`` `
- When the build is finished, launch the index file in the directory ** dist / **

## Archive a batch and update the Toolbox

- Manually move the html layouts into a new folder "app / * lotxxx *"
- Use only tasks
`` `Bash
$ gulp servetool
`` `
 and
`` `Bash
$ gulp clean2
`` `
- To share the Toolbox, take the contents of the ** output / ** folder

## Learning Gulp
https://la-cascade.io/gulp-pour-les-debutants/

## Good CSS practice in SASS
https://www.sitepoint.com/sass-basics-nesting/
https://www.sitepoint.com/sass-basics-the-mixin-directive/
