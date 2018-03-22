import { computedFrom } from 'aurelia-framework';
import { metadata as Metadata } from 'aurelia-metadata';
import { getLogger } from 'aurelia-logging';
import cloneDeep from 'lodash.clonedeep';
import isEqualWith from 'lodash.isequalwith';
import { Container } from 'aurelia-dependency-injection';
import { validateTrigger, ValidationControllerFactory } from 'aurelia-validation';

export class BaseModel
{
	constructor(rules)
	{
		//defaults: configurable: false, enumerable: false, writable: false
		Object.defineProperty(this, 'logger', { value: getLogger(this.constructor.name) });

		//Initialize trackable properties from metadata
		let sharedMetadata = Metadata.get('ModelMetadata', this);
		if (sharedMetadata)
		{
			let metadata = cloneDeep(sharedMetadata);
			Object.defineProperty(this, 'metadata', { configurable: true, value: metadata });
			Object.defineProperties(this, this.metadata.innerPropertyDefs);
			Object.defineProperties(this, this.metadata.propertyDefs);
			for (let prop in this.metadata.innerPropertyDefs)
				this[prop] = cloneDeep(this.metadata.innerPropertyDefs[prop].value);

			this.metadata.original = cloneDeep(this.serialize());
		}

		//initialize validationController if rules were defined
		if (rules)
		{
			let validationController = Container.instance.get(ValidationControllerFactory).create();
			validationController.validateTrigger = validateTrigger.change;
			Object.defineProperty(this, 'validationController',
			{
				configurable: true,
				value: validationController
			});
			rules.on(this);
		}

		this.logger.info('Model Initialized');
	}

	validate()
	{
		return this.validationController ?
			this.validationController.validate() :
			Promise.resolve({ valid: true });
	}

	@computedFrom('validationController.errors.length')
	get isValid()
	{
		return !this.validationController || !this.validationController.errors.length;
	}

	@computedFrom('metadata.dirtyProps.length')
	get isDirty()
	{
		return !!this.metadata && !!this.metadata.dirtyProps.length;
	}

	saveChanges()
	{
		if (this.isDirty)
		{
			this.metadata.original = cloneDeep(this.serialize());
			this.metadata.dirtyProps = [];
		}

		return this;
	}

	discardChanges(skipModelValidation)
	{
		if (this.isDirty)
		{
			this.metadata.trackableProps.forEach(prop => this[prop] = this.metadata.original[prop]);
			this.metadata.dirtyProps = [];
		}

		if (!skipModelValidation)
			this.validate();

		return this;
	}

	serialize(keepUndefinedValues)
	{
		let POJO = {};

		let keys;
		if (keepUndefinedValues)
			keys = Object.keys(this);
		else
			keys = Object.keys(this).filter(key => this[key] !== undefined);

		keys.forEach(key => POJO[key] = cloneDeep(this[key]));

		return POJO;
	}

	deserialize(POJO, deserializeUndefinedValues)
	{
		let keys;
		if (deserializeUndefinedValues)
			keys = Object.keys(this);
		else
			keys = Object.keys(this).filter(key => POJO[key] !== undefined);

		keys.forEach(key => this[key] = POJO[key]);

		return this;
	}

	//DirtyTrack implementation
	updateDirty(prop, value)
	{
		//check equality, where "" is equal to `null` & `undefined`
		const isDirty = !isEqualWith(this.metadata.original[prop], value, (a, b) =>
		{
			if (!a || !b)
				return !a === !b;
		});
		const wasDirty = !!(~this.metadata.dirtyProps.indexOf(prop));

		if (!wasDirty && isDirty) this.metadata.dirtyProps.push(prop);
		if (wasDirty && !isDirty) this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
	}
}
