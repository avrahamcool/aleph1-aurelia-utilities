import { SomeModelWithValidation, SomeModelWithoutValidation } from '../models/some-model-with-validation';
import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

describe('using BaseModel with validation', () =>
{
	let component;

	beforeAll(done =>
	{
		component = StageComponent.withResources().inView('<div></div>').boundTo({});
		component.configure = (aurelia) =>
		{
			aurelia.use
				.standardConfiguration()
				.plugin('aurelia-validation');
		};
		component.create(bootstrap).then(() => { done(); });
	});

	afterAll(() =>
	{
		component.dispose();
	});

	it('inheritor should not have "validationController" if rules are not defined in the constructor', () =>
	{
		expect(new SomeModelWithoutValidation()).not.toHaveMember('validationController');
	});

	it('inheritor should have "validationController" if rules are defined in the constructor', () =>
	{
		expect(new SomeModelWithValidation()).toHaveMember('validationController');
	});

	it('"validationController" should not be enumerable', () =>
	{
		expect(Object.keys(new SomeModelWithValidation())).not.toContain('validationController');
	});

	it('"isValid" should be defaulted to "true"', () =>
	{
		expect(new SomeModelWithValidation().isValid).toEqual(true);
	});
});
