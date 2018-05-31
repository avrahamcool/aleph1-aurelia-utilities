import { BaseModel, dirtyTrack, dirtyTrackArray, dirtyTrackModel, stateTrack, ExpireableLocalstorage } from '../../src/index';

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

	it('should export a dirtyTrackArray decorator', () =>
	{
		expect(dirtyTrackArray).toEqual(jasmine.any(Function));
	});

	it('dirtyTrackArray decorator should be applied only on class inheriting from BaseModel', () =>
	{
		let func = function()
		{
			class WrongModel
			{
				@dirtyTrackArray()
				someString = 'string';
			}
			let model = new WrongModel();
			model.someString = 'other';
		};
		expect(func).toThrow();
	});

	it('dirtyTrackModel decorator should be applied only on properties', () =>
	{
		let func = function()
		{
			@dirtyTrackModel(BaseModel)
			class WrongModel
			{
				someString = 'string';
			}
			let model = new WrongModel();
			model.someString = 'other';
		};
		expect(func).toThrow();
	});

	it('should export a dirtyTrackModel decorator', () =>
	{
		expect(dirtyTrackModel).toEqual(jasmine.any(Function));
	});

	it('dirtyTrackModel decorator should be applied only on class inheriting from BaseModel', () =>
	{
		let func = function()
		{
			class WrongModel
			{
				@dirtyTrackModel(BaseModel)
				someString = 'string';
			}
			let model = new WrongModel();
			model.someString = 'other';
		};
		expect(func).toThrow();
	});

	it('dirtyTrackModel decorator should be applied only on properties', () =>
	{
		let func = function()
		{
			@dirtyTrackModel(BaseModel)
			class WrongModel
			{
				someString = 'string';
			}
			let model = new WrongModel();
			model.someString = 'other';
		};
		expect(func).toThrow();
	});

	it('dirtyTrackModel decorator must get a parameter of type inheriting from BaseModel', () =>
	{
		let func = function()
		{
			class TypeNotInheritingFromBase { }
			class WrongModel extends BaseModel
			{
				@dirtyTrackModel(TypeNotInheritingFromBase)
				someString = 'string';
			}
			let model = new WrongModel();
			model.someString = 'other';
		};
		expect(func).toThrow();
	});

	it('should export a stateTrack decorator', () =>
	{
		expect(stateTrack).toEqual(jasmine.any(Function));
	});

	it('stateTrack decorator should be applied only on functions', () =>
	{
		let func = function()
		{
			class WrongUsage
			{
				@stateTrack()
				someString = 'string';
			}
			let model = new WrongUsage();
			model.someString = 'other';
		};
		expect(func).toThrow();

		let func2 = function()
		{
			class RightUsage
			{
				@stateTrack()
				someFunc()
				{
				}
			}
			let model = new RightUsage();
			model.someFunc();
		};
		expect(func2).not.toThrow();
	});

	it('should export a expirableLocalStorage static class', () =>
	{
		expect(ExpireableLocalstorage).toBeDefined();
	});
});
