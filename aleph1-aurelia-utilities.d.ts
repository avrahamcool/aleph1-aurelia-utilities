// Type definitions for aleph1-aurelia-utilities
// Project: aleph1
// Definitions by: Avraham Essoudry https://github.com/avrahamcool

/**
 * a BaseClass that provides DirtyTracking and Validation capabilities
 *
 * @export
 * @class BaseModel
 */
export class BaseModel {
	/**
	 * Creates an instance of BaseModel.
	 * @param {*} [rules] if supplied - will aplly this rules to a new validation controller that will be saved in the class
	 * @memberof BaseModel
	 */
	constructor(rules?: any);

	/**
	 * validates the model (if rules where applied via the constructor)
	 *
	 * @returns {Promise<any>}
	 * @memberof BaseModel
	 */
	validate(): Promise<any>;

	/**
	 * observable property - indicates if the current model state is valid (if rules where applied via the constructor)
	 *
	 * @type {boolean}
	 * @memberof BaseModel
	 */
	isValid: boolean;

	/**
	 * observable property - indicates if the current model is dirty
	 *
	 * @type {boolean}
	 * @memberof BaseModel
	 */
	isDirty: boolean;

	/**
	 * save the changes made to the model - turns off 'isDirty'
	 *
	 * @returns {BaseModel}
	 * @memberof BaseModel
	 */
	saveChanges(): BaseModel;

	/**
	 * discard the changes made to the model - turns off 'isDirty'
	 *
	 * @param {boolean} [skipModelValidation] dont trigger a validation because of the discard
	 * @returns {BaseModel}
	 * @memberof BaseModel
	 */
	discardChanges(skipModelValidation?: boolean): BaseModel;

	/**
	 * serialize the current model into POJO
	 *
	 * @param {boolean} [keepUndefinedValues] serialize also undefined values
	 * @returns {*} a POJO of the current model
	 * @memberof BaseModel
	 */
	serialize(keepUndefinedValues?: boolean): any;

	/**
	 * deserialize a given POJO into the model, taking only fields from the Model into account
	 *
	 * @param {*} POJO
	 * @param {boolean} [deserializeUndefinedValues] override model properties with undefined
	 * @returns {BaseModel}
	 * @memberof BaseModel
	 */
	deserialize(POJO: any, deserializeUndefinedValues?: boolean): BaseModel;
}

/**
 * decorator on Model properties, will detected changes to the property and update the 'isDirty' flag accordignly
 *
 * @export
 * @param {*} defaultValue set the initial value of a property
 */
export function dirtyTrack(defaultValue?: any);

/**
 * decorator on Model properties (array), will detected changes to the array (even changes to the items in the array)and update the 'isDirty' flag accordignly
 *
 * @export
 * @param {*} defaultValue set the initial value of a property
 */
export function dirtyTrackArray(defaultValue?: any);

/**
 * decorator on Model properties (Model objects), will detected changes to the object (even changes to the nested propertise) and update the 'isDirty' flag accordignly
 *
 * @export
 * @param {*} modelType must be the type of a model inheriting from BaseModel
 */
export function dirtyTrackModel(modelType: any);


/**
 * decorator on any function.
 * will create 2 additional flags
 * <functionName>_isBusy:bool
 * <functionName>_hasError?:Error
 * @export
 */
export function stateTrack();

/**
 * a static wrapper around localstorage to provide the option to set expirable time for items
 *
 * @export
 * @class ExpireableLocalstorage
 */
export class ExpireableLocalstorage {

	/**
	 * get an item, returns undefined if the item is not present or expired
	 * 
	 * @static
	 * @param {string} key 
	 * @returns {*} 
	 * @memberof ExpireableLocalstorage
	 */
	static getItem(key: string): any;

	/**
	 * set an item to the localstorage
	 * 
	 * @static
	 * @param {string} key 
	 * @param {*} jsonData the object to store, if a falsy is passsed - remove the item from local storage
	 * @param {number} [expirationMin] expiration time in minutes, 0 (or any falsy) = unlimited
	 * @memberof ExpireableLocalstorage
	 */
	static setItem(key: string, jsonData?: any, expirationMin?: number): void;

	/**
	 * clears the expirable local storage (only from items that was set via the expirable local storage)
	 * 
	 * @static
	 * @memberof ExpireableLocalstorage
	 */
	static clear(): void;
}
