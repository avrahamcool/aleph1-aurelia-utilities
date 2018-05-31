import { computedFrom } from 'aurelia-framework';
import { metadata as Metadata } from 'aurelia-metadata';
import cloneDeep from 'lodash.clonedeep';
import isEqualWith from 'lodash.isequalwith';
import { Container } from 'aurelia-dependency-injection';
import { validateTrigger, ValidationControllerFactory } from 'aurelia-validation';

export class BaseModel
{
	constructor(rules)
	{
		//Initialize trackable properties from metadata
		let sharedMetadata = Metadata.get('ModelMetadata', this);
		if (sharedMetadata)
		{
			let metadata = cloneDeep(sharedMetadata);
			Object.defineProperty(this, 'metadata', { configurable: true, value: metadata });
			Object.defineProperties(this, this.metadata.innerPropertyDefs);
			Object.defineProperties(this, this.metadata.propertyDefs);

			for (let prop in this.metadata.innerPropertyDefs)
				this[prop] = this.metadata.innerPropertyDefs[prop].value;

			for (let prop in this.metadata.innerPropertyModelsDefs)
			{
				Object.defineProperty(this, prop,
				{
					configurable: true,
					writable: true,
					value: new(this.metadata.innerPropertyModelsDefs[prop].Type)()
				});
			}

			this.metadata.original = this.serialize();
		}

		//initialize validationController if rules were defined
		if (rules)
		{
			let validationController = Container.instance.get(ValidationControllerFactory).create();
			validationController.validateTrigger = validateTrigger.changeOrBlur;
			Object.defineProperty(this, 'validationController',
			{
				configurable: true,
				value: validationController
			});
			rules.on(this);
		}
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
			this.metadata.trackableProps.forEach(prop =>
			{
				const value = this[prop];

				if (value instanceof BaseModel)
					value.saveChanges();

				this.metadata.original[prop] = value;
			});
			this.metadata.dirtyProps = [];
		}

		return this;
	}

	discardChanges(skipModelValidation)
	{
		if (this.isDirty)
		{
			this.metadata.trackableProps.forEach(prop =>
			{
				const value = this[prop];

				if (value instanceof BaseModel)
					value.discardChanges();
				else
					this[prop] = this.metadata.original[prop];
			});

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

		keys.forEach(key =>
		{
			const value = this[key];
			if (value instanceof BaseModel)
				POJO[key] = value.serialize();
			else
				POJO[key] = cloneDeep(value);
		});

		return POJO;
	}

	deserialize(POJO, deserializeUndefinedValues)
	{
		let keys;
		if (deserializeUndefinedValues)
			keys = Object.keys(this);
		else
			keys = Object.keys(this).filter(key => POJO[key] !== undefined);

		keys.forEach(key =>
		{
			const value = this[key];

			if (value instanceof BaseModel)
				value.deserialize(POJO[key]);
			else
				this[key] = POJO[key];
		});

		return this;
	}

	//DirtyTrack implementation
	updateDirty(prop, value)
	{
		let isDirty;
		if (value instanceof BaseModel)
			isDirty = value.isDirty;
		else
		{
			//check equality, where "" is equal to `null` & `undefined`
			isDirty = !isEqualWith(this.metadata.original[prop], value, (a, b) =>
			{
				if (!a || !b)
					return !a === !b;
			});
		}

		const dirtyIndex = this.metadata.dirtyProps.indexOf(prop);
		const wasDirty = ~dirtyIndex;

		if (!wasDirty && isDirty) this.metadata.dirtyProps.push(prop);
		if (wasDirty && !isDirty) this.metadata.dirtyProps.splice(dirtyIndex, 1);
	}
}
