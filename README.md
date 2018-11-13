
[![Total alerts](https://img.shields.io/lgtm/alerts/g/avrahamcool/aleph1-aurelia-utilities.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/avrahamcool/aleph1-aurelia-utilities/alerts/)


# aleph1-aurelia-utilities
an Aurelia plugin for Model DirtyTracking, function BusyState tracking and more.

## installation instruction:
```shell
npm install aleph1-aurelia-utilities
```

if you are using `aurelia-cli` with `require.js` - add this to your `aurelia.json` inside the bundles section.
```js
{
	"lodash.clonedeep",
	"lodash.isequalwith",
	{
		"name": "aleph1-aurelia-utilities",
		"main": "dist/amd/index",
		"path": "../node_modules/aleph1-aurelia-utilities"
	},
	{
		"name": "aurelia-validation",
		"path": "../node_modules/aurelia-validation/dist/amd",
		"main": "aurelia-validation"
	}
}
```


## usage - Tracking busy/error state of a function:
you can decorate any function with the `stateTrack()` decorator.
this will set up 2 variables
`{functionName}_isBusy`: will be set to true when the function is running, and revert back to false when the function ends.
`{functionName}_hasError`: will be set to false when the function starts to run, and will hold the Error object if the function threw an error.

this will work for sync/async functions.

```js
import { stateTrack } from  'aleph1-aurelia-utilities';

export class SomeClass
{
	//will create syncFunction_isBusy syncFunction_hasError
	@stateTrack()
	syncFunction(x, y)
	{
		return x + y;
	}

	//will create asyncFunction_isBusy asyncFunction_hasError
	@stateTrack()
	asyncFunction(x, y)
	{
		return Promise.resolve(x + y);
	}

	//will create syncFunctionError_isBusy syncFunctionError_hasError
	@stateTrack()
	syncFunctionError(x, y)
	{
		throw Error('Error');
	}

	//will create asyncFunctionError_isBusy asyncFunctionError_hasError
	@stateTrack()
	asyncFunctionError(x, y)
	{
		return Promise.reject('Error');
	}
}
 ```
 
## usage - Dirty Tracking a model:
your model class need to extends the `baseClass` provided by the plugin.
now you can decorate any properties of your model with the `@dirtyTrack()` decorator.

for babel users: the assignment in the declaration will set the default value for the property.
for TS users: you should call the decorator with a parameter `@dirtyTrack(7) someInt: number;`

this will set up a `isDirty` variable in your model.
this property will be automatically updated to with every change to your tracked properties.

at any point, you can call `saveChanges()` on your model, to commit the current changes.
or `discardChanges()` to revert back to the last saved point.
you can call `serialize()` to get a pojo object from your model, or `deserialize(pojo)` to populate your model from a pojo object.

 ```js
	import { BaseModel, dirtyTrack } from 'aleph1-aurelia-utilities';

	export class SomeModel extends BaseModel
	{
		@dirtyTrack() someEmptyString = '';
		@dirtyTrack() someString = 'string';
		@dirtyTrack() someZero = 0;
		@dirtyTrack() someInt = 7;
		@dirtyTrack() someTrue = true;
		@dirtyTrack() someFalse = false;
		@dirtyTrack() someEmptyArr = [];
		@dirtyTrack() someArr = ['val1', 2, null, undefined, true];	//only picking up new array assignment
		@dirtyTrack() someNull = null;
		@dirtyTrack() someUndefined = undefined;
		@dirtyTrack() someUndeclared;
	}
 ```
now anywhere else in you code you can:
 ```js
	import { SomeModel } from 'path/to/some-odel';

	export class VM
	{
		constructor()
		{
			this.model = new SomeModel();
			
			//changing any tracked property on the model will set `this.model.isDirty` to true.
			this.model.discardChanges();
			this.model.saveChanges();
			let pojo = this.model.serialize();
			let somePojo = <your code here>;
			this.model.deserialize(somePojo);
		}
	}
 ```

## usage - Expirable local storage:
you can use it just like he regular localStorage, but you can suplly an additional parameter (expiration time in minutes).
when you set an item, it will be stored with his expiration date, and when you try to get the item - the time will be validated.
if the time expired (or if the item was never set at all) you will get 'undefined' upon calling 'getItem'.

all items are stored with a keyPrefix, so when you call 	'clear' you can be sure that we clear only items that was registered with this utility.

 ```js
	import { ExpireableLocalstorage } from 'aleph1-aurelia-utilities';

	ExpireableLocalstorage.setItem('key', 'value', 1);
	ExpireableLocalstorage.getItem('key');
	ExpireableLocalstorage.clear();

 ```

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

  ```shell
  npm install -g jspm
  ```
3. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```

4. You can now run the tests with this command:

  ```shell
  karma start
  ```
