import { BaseModel } from '../../src/index';

describe('the BaseModel class', () =>
{
	it('should have a "logger" property', () =>
	{
		let model = new BaseModel();
		expect(model.logger).toBeDefined();
	});

	it('"logger" property should not be enumerable', () =>
	{
		let model = new BaseModel();
		let keys = Object.keys(model);
		expect(keys).not.toContain('logger');
	});

	it('should have a "isDirty" getter', () =>
	{
		let model = new BaseModel();
		expect(model.isDirty).toBeDefined();
	});

	it('"isDirty" getter should not be enumerable', () =>
	{
		let model = new BaseModel();
		let keys = Object.keys(model);
		expect(keys).not.toContain('isDirty');
	});

	it('should have a "saveChanges" function', () =>
	{
		let model = new BaseModel();
		expect(model.saveChanges).toEqual(jasmine.any(Function));
	});

	it('"saveChanges" function should return the object', () =>
	{
		let model = new BaseModel();
		expect(model.saveChanges()).toEqual(model);
	});

	it('should have a "discardChanges" function', () =>
	{
		let model = new BaseModel();
		expect(model.discardChanges).toEqual(jasmine.any(Function));
	});

	it('"discardChanges" function should return the object', () =>
	{
		let model = new BaseModel();
		expect(model.discardChanges()).toEqual(model);
	});

	it('should have a "serialize" function', () =>
	{
		let model = new BaseModel();
		expect(model.serialize).toEqual(jasmine.any(Function));
	});

	it('should have a "deserialize" function', () =>
	{
		let model = new BaseModel();
		expect(model.deserialize).toEqual(jasmine.any(Function));
	});

	it('"deserialize" function should return the object', () =>
	{
		let model = new BaseModel();
		expect(model.deserialize()).toEqual(model);
	});
});
