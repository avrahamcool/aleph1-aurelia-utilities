import { SomeModel } from '../models/some-model';

describe('Dirty tracking a model', () =>
{
	it('"isDirty" should be defaulted to "false"', () =>
	{
		expect(new SomeModel().isDirty).toEqual(false);
	});

	it('"isDirty" should be "true" after we change a tracked property', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		expect(model.isDirty).toEqual(true);
	});

	it('"isDirty" should be "false" after we change a tracked property but change back', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		model.someString = 'string';
		expect(model.isDirty).toEqual(false);
	});

	it('"isDirty" should be "true" after we change a tracked array', () =>
	{
		let model = new SomeModel();
		model.someArr = ['val1', 2, null, undefined];
		expect(model.isDirty).toEqual(true);
	});

	it('"isDirty" should be "false" after we change a tracked array but change back', () =>
	{
		let model = new SomeModel();
		model.someArr = ['val1', 2, null, undefined];
		model.someArr = ['val1', 2, null, undefined, true];
		expect(model.isDirty).toEqual(false);
	});

	it('"isDirty" dont detect inner array changes', () =>
	{
		let model = new SomeModel();
		model.someArr[1] = 5;
		expect(model.isDirty).toEqual(false);
	});

	it('"saveChanges" sould turn off "isDirty" and save the changes', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		expect(model.isDirty).toEqual(true);
		model.saveChanges();
		expect(model.isDirty).toEqual(false);
		expect(model.someString).toEqual('otherString');
	});

	it('"discardChanges" sould turn off "isDirty" and discard the changes', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		expect(model.isDirty).toEqual(true);
		model.discardChanges();
		expect(model.isDirty).toEqual(false);
		expect(model.someString).toEqual('string');
	});

	it('"discardChanges" sould turn off "isDirty" and discard the changes regardless of validation', () =>
	{
		let model = new SomeModel();
		model.someString = 'otherString';
		expect(model.isDirty).toEqual(true);
		model.discardChanges(true);
		expect(model.isDirty).toEqual(false);
		expect(model.someString).toEqual('string');
	});

	it('2 models should live imdependetly', () =>
	{
		let model1 = new SomeModel();
		let model2 = new SomeModel();
		expect(model1.isDirty).toEqual(false);
		expect(model2.isDirty).toEqual(false);

		model1.someString = 'otherString';

		expect(model1.isDirty).toEqual(true);
		expect(model2.isDirty).toEqual(false);

		model2.someString = 'yoyo';

		expect(model1.isDirty).toEqual(true);
		expect(model2.isDirty).toEqual(true);

		model1.discardChanges();

		expect(model1.isDirty).toEqual(false);
		expect(model2.isDirty).toEqual(true);

		model2.saveChanges();

		expect(model1.isDirty).toEqual(false);
		expect(model2.isDirty).toEqual(false);
	});
});
