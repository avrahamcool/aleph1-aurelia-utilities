import { BaseModel } from '../../src/index';

describe('the BaseModel class', () =>
{
	it('should have a "logger" property', () =>
	{
		expect(new BaseModel()).toHaveMember('logger');
	});

	it('"logger" property should not be enumerable', () =>
	{
		expect(Object.keys(new BaseModel())).not.toContain('logger');
	});

	it('should have a "isDirty" getter', () =>
	{
		expect(new BaseModel()).toHaveMember('isDirty');
	});

	it('"isDirty" getter should not be enumerable', () =>
	{
		expect(Object.keys(new BaseModel())).not.toContain('isDirty');
	});

	it('should have a "saveChanges" function', () =>
	{
		expect(new BaseModel()).toHaveMethod('saveChanges');
	});

	it('"saveChanges" function should return the object', () =>
	{
		let model = new BaseModel();
		expect(model.saveChanges()).toEqual(model);
	});

	it('should have a "discardChanges" function', () =>
	{
		expect(new BaseModel()).toHaveMethod('discardChanges');
	});

	it('"discardChanges" function should return the object', () =>
	{
		let model = new BaseModel();
		expect(model.discardChanges()).toEqual(model);
	});

	it('should have a "serialize" function', () =>
	{
		expect(new BaseModel()).toHaveMethod('serialize');
	});

	it('should have a "deserialize" function', () =>
	{
		expect(new BaseModel()).toHaveMethod('deserialize');
	});

	it('"deserialize" function should return the object', () =>
	{
		let model = new BaseModel();
		expect(model.deserialize()).toEqual(model);
	});

	it('should have "isValid" getter', () =>
	{
		expect(new BaseModel()).toHaveMember('isValid');
	});

	it('"isValid" getter should not be enumerable', () =>
	{
		expect(Object.keys(new BaseModel())).not.toContain('isValid');
	});

	it('should have a "validate" function', () =>
	{
		expect(new BaseModel()).toHaveMethod('validate');
	});
});
