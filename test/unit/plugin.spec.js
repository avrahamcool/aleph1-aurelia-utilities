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
});
