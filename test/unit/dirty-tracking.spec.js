import { SomeModel } from '../models/some-model';

describe('Dirty tracking a model', () =>
{
	it('"isDirty" should be defaulted to "false"', () =>
	{
		expect(new SomeModel().isDirty).toBeFalsy();
	});

	it('"isDirty" should be "true" after we change a tracked property', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		expect(model.isDirty).toBeTruthy();
	});

	it('"isDirty" should be "false" after we change a tracked property but change back', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		model.someString = 'string';
		expect(model.isDirty).toBeFalsy();
	});

	it('"isDirty" should be "true" after we change a tracked array', () =>
	{
		let model = new SomeModel();
		model.someArr = ['val1', 2, null, undefined];
		expect(model.isDirty).toBeTruthy();
	});

	it('"isDirty" should be "false" after we change a tracked array but change back', () =>
	{
		let model = new SomeModel();
		model.someArr = ['val1', 2, null, undefined];
		model.someArr = ['val1', 2, null, undefined, true];
		expect(model.isDirty).toBeFalsy();
	});

	it('"isDirty" dont detect inner array changes', () =>
	{
		let model = new SomeModel();
		model.someArr[1] = 5;
		expect(model.isDirty).toBeFalsy();
	});

	it('"saveChanges" sould turn off "isDirty" and save the changes', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		expect(model.isDirty).toBeTruthy();
		model.saveChanges();
		expect(model.isDirty).toBeFalsy();
		expect(model.someString).toEqual('otherString');
	});

	it('"discardChanges" sould turn off "isDirty" and discard the changes', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		expect(model.isDirty).toBeTruthy();
		model.discardChanges();
		expect(model.isDirty).toBeFalsy();
		expect(model.someString).toEqual('string');
	});
});
