import { Outer, Inner } from '../models/nested-models';

describe('Dirty tracking with nested models', () =>
{
	it('"isDirty" of outer should be defaulted to "false"', () =>
	{
		expect(new Outer().isDirty).toEqual(false);
	});

	it('"isDirty" should be "true" after we change a tracked property on the Outer', () =>
	{
		let model = new Outer();
		model.propOuter = 'test';
		expect(model.isDirty).toEqual(true);
	});

	it('"isDirty" of inner should be defaulted to "false"', () =>
	{
		expect(new Inner().isDirty).toEqual(false);
	});

	it('"isDirty" should be "true" after we change a tracked property of inner', () =>
	{
		let model = new Inner();
		model.propInner = 'test';
		expect(model.isDirty).toEqual(true);
	});

	it('"isDirty" of inner inside outer should be defaulted to "false"', () =>
	{
		expect(new Outer().inner.isDirty).toEqual(false);
	});

	it('"isDirty" of inner should be "true" after we change a tracked property on the Inner', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'test';
		setTimeout(() =>
		{
			expect(model.inner.isDirty).toEqual(true);
			done();
		}, 0);
	});

	it('"isDirty" of outer should be "true" after we change a tracked property on the Inner', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'test';
		setTimeout(() =>
		{
			expect(model.isDirty).toEqual(true);
			done();
		}, 0);
	});

	it('"isDirty" of outer should be "true" if we change reference of Inner (if different)', (done) =>
	{
		let model = new Outer();
		model.inner = new Inner();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			expect(model.isDirty).toEqual(true);
			done();
		}, 0);
	});

	it('"isDirty" of outer should be "false" if we save the outer', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			model.saveChanges();
			expect(model.isDirty).toEqual(false);

			done();
		}, 0);
	});

	it('"isDirty" of inner should be "false" if we save the outer', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			model.saveChanges();
			expect(model.inner.isDirty).toEqual(false);

			done();
		}, 0);
	});

	it('"isDirty" of outer should be "false" if we discard the outer', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			expect(model.isDirty).toEqual(true);
			model.discardChanges();

			setTimeout(() =>
			{
				expect(model.isDirty).toEqual(false);

				done();
			}, 0);
		}, 0);
	});

	it('"isDirty" of inner should be "false" if we discard the outer', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			model.discardChanges();
			expect(model.inner.isDirty).toEqual(false);

			done();
		}, 0);
	});

	it('"isDirty" of outer should be "false" if we save the inner', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			expect(model.isDirty).toEqual(true);
			model.inner.saveChanges();

			setTimeout(() =>
			{
				expect(model.isDirty).toEqual(false);

				done();
			}, 0);
		}, 0);
	});

	it('"isDirty" of inner should be "false" if we save the inner', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			expect(model.inner.isDirty).toEqual(true);
			model.inner.saveChanges();
			setTimeout(() =>
			{
				expect(model.inner.isDirty).toEqual(false);

				done();
			}, 0);
		}, 0);
	});

	it('"isDirty" of outer should be "false" if we discard the inner', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			expect(model.isDirty).toEqual(true);
			model.inner.discardChanges();

			setTimeout(() =>
			{
				expect(model.isDirty).toEqual(false);

				done();
			}, 0);
		}, 0);
	});

	it('"isDirty" of inner should be "false" if we discard the inner', (done) =>
	{
		let model = new Outer();
		model.inner.propInner = 'new';

		setTimeout(() =>
		{
			expect(model.inner.isDirty).toEqual(true);
			model.inner.discardChanges();

			setTimeout(() =>
			{
				expect(model.inner.isDirty).toEqual(false);

				done();
			}, 0);
		}, 0);
	});
});
