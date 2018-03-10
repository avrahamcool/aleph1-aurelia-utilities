import { ModelMetadata } from './model-metadata';
import { metadata as Metadata } from 'aurelia-metadata';
import { BaseModel } from './base-model';

export function dirtyTrack(defaultValue)
{
	return function(target, property, descriptor)
	{
		if (!property) throw Error('dirtyTrack Decorator should be used on property only!');
		if (!(target instanceof BaseModel)) throw Error('dirtyTrack decorator should be applied only in class inheriting from BaseModel');

		//babel passes the initializer - but TS does not
		if (!defaultValue && descriptor && typeof descriptor.initializer === 'function')
			defaultValue = descriptor.initializer();

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
				let oldValue = this[innerProperty];
				if (newValue === oldValue)
					return;
				this[innerProperty] = newValue;
				this.updateDirty(property, newValue);
				return newValue;
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
