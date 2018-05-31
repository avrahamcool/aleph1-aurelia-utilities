import { ModelWithArr } from '../models/model-with-arr';

describe('Dirty tracking an array in model', () =>
{
	it('"isDirty" should be defaulted to "false"', () =>
	{
		expect(new ModelWithArr().isDirty).toEqual(false);
	});

	it('"isDirty" should be "true" after we assign to a tracked array [changing the reference]', () =>
	{
		let model = new ModelWithArr();
		model.trackedArr = [];
		expect(model.isDirty).toEqual(true);
	});

	it('"isDirty" should be "false" after we change a tracked property array but change back [changing the reference]', () =>
	{
		let model = new ModelWithArr();
		model.trackedArr = [];
		model.trackedArr = [1, 2, 3];
		expect(model.isDirty).toEqual(false);
	});

	it('"isDirty" shoud be "true" after "push"', (done) =>
	{
		let model = new ModelWithArr();
		model.trackedArr.push(4);
		setTimeout(() =>
		{
			expect(model.isDirty).toEqual(true);
			done();
		}, 10);
	});

	it('"isDirty" shoud be "false" after "push" and "pop"', (done) =>
	{
		let model = new ModelWithArr();
		model.trackedArr.push(4);
		model.trackedArr.pop();
		setTimeout(() =>
		{
			expect(model.isDirty).toEqual(false);
			done();
		}, 10);
	});

	it('"isDirty" shoud be "true" after direct assignment', (done) =>
	{
		let model = new ModelWithArr();
		model.trackedArr[1] = 5;
		setTimeout(() =>
		{
			expect(model.isDirty).toEqual(true);
			done();
		}, 0);
	});

	it('2 models should live imdependetly', (done) =>
	{
		let model1 = new ModelWithArr();
		let model2 = new ModelWithArr();
		expect(model1.isDirty).toEqual(false);
		expect(model2.isDirty).toEqual(false);

		model1.trackedArr.push(4);

		setTimeout(() =>
		{
			expect(model1.isDirty).toEqual(true);
			expect(model2.isDirty).toEqual(false);

			model2.trackedArr.push(4);

			setTimeout(() =>
			{
				expect(model1.isDirty).toEqual(true);
				expect(model2.isDirty).toEqual(true);

				model1.discardChanges();

				setTimeout(() =>
				{
					expect(model1.isDirty).toEqual(false);
					expect(model2.isDirty).toEqual(true);

					model2.saveChanges();

					setTimeout(() =>
					{
						expect(model1.isDirty).toEqual(false);
						expect(model2.isDirty).toEqual(false);

						done();
					}, 0);
				}, 0);
			}, 0);
		}, 0);
	});
});
