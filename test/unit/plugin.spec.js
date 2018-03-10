import { BaseModel, dirtyTrack } from '../../src/index';

describe('the BaseModel plugin', () =>
{
	it('should export a BaseModel class', () =>
	{
		let model = new BaseModel();
		expect(BaseModel).toBeDefined();
		expect(model).toBeDefined();
		expect(model).toEqual(jasmine.any(BaseModel));
	});

	it('should export a dirtyTrack decorator', () =>
	{
		expect(dirtyTrack).toEqual(jasmine.any(Function));
	});

	it('dirtyTrack decorator should be applied only on class inheriting from BaseModel', () =>
	{
		let func = function()
		{
			class WrongModel
			{
				@dirtyTrack()
				someString = 'string';
			}
			let model = new WrongModel();
			model.someString = 'other';
		};
		expect(func).toThrow();
	});

	it('dirtyTrack decorator should be applied only on properties', () =>
	{
		let func = function()
		{
			@dirtyTrack()
			class WrongModel
			{
				someString = 'string';
			}
			let model = new WrongModel();
			model.someString = 'other';
		};
		expect(func).toThrow();
	});
});
