import { ModelMetadata } from './model-metadata';
import { metadata as Metadata } from 'aurelia-metadata';
import { BaseModel } from './base-model';
import { TaskQueue, Container } from 'aurelia-framework';

export function dirtyTrack(defaultValue)
{
	return function(target, property, descriptor)
	{
		if (!property) throw Error('dirtyTrack Decorator should be used on property only!');
		if (!(target instanceof BaseModel)) throw Error('dirtyTrack decorator should be applied only in class inheriting from BaseModel');

		//babel passes the initializer - but TS does not
		if (!defaultValue && descriptor && typeof descriptor.initializer === 'function')
			defaultValue = descriptor.initializer();

		if (descriptor)
			delete descriptor.initializer;

		const modelMetaData = Metadata.getOrCreateOwn('ModelMetadata', ModelMetadata, target);

		modelMetaData.trackableProps.push(property);

		// use a convention to compute the inner property name
		let innerProperty = `_${property}_`;

		modelMetaData.propertyDefs[property] = {
			get: function()
			{
				return this[innerProperty];
			},
			set: function(newValue)
			{
				if (newValue !== this[innerProperty])
				{
					this[innerProperty] = newValue;
					this.updateDirty(property, newValue);
				}
			},
			enumerable: true,
			configurable: true
		};
		modelMetaData.propertyDefs[property].get.dependencies = [innerProperty];

		modelMetaData.innerPropertyDefs[innerProperty] = {
			value: defaultValue,
			writable: true,
			configurable: true
		};

		return descriptor;
	};
}

const taskQueue = Container.instance.get(TaskQueue);

export function dirtyTrackArray(defaultValue)
{
	return function(target, property, descriptor)
	{
		if (!property) throw Error('dirtyTrackArray Decorator should be used on property only!');
		if (!(target instanceof BaseModel)) throw Error('dirtyTrackArray decorator should be applied only in class inheriting from BaseModel');

		//babel passes the initializer - but TS does not
		if (!defaultValue && descriptor && typeof descriptor.initializer === 'function')
			defaultValue = descriptor.initializer();

		if (descriptor)
			delete descriptor.initializer;

		const modelMetaData = Metadata.getOrCreateOwn('ModelMetadata', ModelMetadata, target);

		modelMetaData.trackableProps.push(property);

		// use a convention to compute the inner property name
		let innerProperty = `_${property}_`;

		modelMetaData.propertyDefs[property] = {
			get: function()
			{
				taskQueue.queueTask(() =>
				{
					this.updateDirty(property, this[innerProperty]);
				});
				return this[innerProperty];
			},
			set: function(newValue)
			{
				if (newValue !== this[innerProperty])
				{
					this[innerProperty] = newValue;
					this.updateDirty(property, newValue);
				}
			},
			enumerable: true,
			configurable: true
		};
		modelMetaData.propertyDefs[property].get.dependencies = [innerProperty];

		modelMetaData.innerPropertyDefs[innerProperty] = {
			value: defaultValue,
			writable: true,
			configurable: true
		};

		return descriptor;
	};
}

export function dirtyTrackModel(ModelType)
{
	return function(target, property, descriptor)
	{
		if (!property) throw Error('dirtyTrackModel Decorator should be used on property only!');
		if (!(target instanceof BaseModel)) throw Error('dirtyTrackModel decorator should be applied only in class inheriting from BaseModel');
		if (!(new ModelType() instanceof BaseModel)) throw Error('dirtyTrackModel must get a parameter a class inheriting from BaseModel');

		if (descriptor)
			delete descriptor.initializer;

		const modelMetaData = Metadata.getOrCreateOwn('ModelMetadata', ModelMetadata, target);

		modelMetaData.trackableProps.push(property);

		// use a convention to compute the inner property name
		let innerProperty = `_${property}_`;

		modelMetaData.propertyDefs[property] = {
			get: function()
			{
				taskQueue.queueTask(() =>
				{
					this.updateDirty(property, this[innerProperty]);
				});
				return this[innerProperty];
			},
			set: function(newValue)
			{
				if (newValue !== this[innerProperty])
				{
					this[innerProperty] = newValue;
					this.updateDirty(property, newValue);
				}
			},
			enumerable: true,
			configurable: true
		};
		modelMetaData.propertyDefs[property].get.dependencies = [innerProperty];

		modelMetaData.innerPropertyModelsDefs[innerProperty] = {
			Type: ModelType
		};

		return descriptor;
	};
}
