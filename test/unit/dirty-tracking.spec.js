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

	it('"discardChanges" sould turn off "isDirty" and discard the changes regardless of validation', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		expect(model.isDirty).toBeTruthy();
		model.discardChanges(true);
		expect(model.isDirty).toBeFalsy();
		expect(model.someString).toEqual('string');
	});

	it('2 models should live imdependetly', () =>
	{
		let model1 = new SomeModel();
		let model2 = new SomeModel();
		expect(model1.isDirty).toBeFalsy();
		expect(model2.isDirty).toBeFalsy();

		model1.someString = 'otherString';

		expect(model1.isDirty).toBeTruthy();
		expect(model2.isDirty).toBeFalsy();

		model2.someString = 'yoyo';

		expect(model1.isDirty).toBeTruthy();
		expect(model2.isDirty).toBeTruthy();

		model1.discardChanges();

		expect(model1.isDirty).toBeFalsy();
		expect(model2.isDirty).toBeTruthy();

		model2.saveChanges();

		expect(model1.isDirty).toBeFalsy();
		expect(model2.isDirty).toBeFalsy();
	});
});
