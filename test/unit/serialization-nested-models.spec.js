import { Outer, Inner } from '../models/nested-models';

describe('serializing a nested model', () =>
{
	it('"serialize" inner should return a pojo of defined keys', () =>
	{
		expect(new Outer().inner.serialize()).toEqual(
		{
			propInner: 'inner'
		});
	});

	it('"serialize" outer should also serialize inner', () =>
	{
		expect(new Outer().serialize()).toEqual(
		{
			propOuter: 'outer',
			inner:
			{
				propInner: 'inner'
			}
		});
	});

	it('"deserialize(POJO)" on inner should copy defined keys from a pojo', (done) =>
	{
		let model = new Outer();

		model.inner.deserialize(
		{
			propInner: 'test'
		});

		expect(model.inner.propInner).toEqual('test');

		setTimeout(() =>
		{
			expect(model.inner.isDirty).toEqual(true);
			expect(model.isDirty).toEqual(true);

			done();
		}, 0);
	});

	it('"deserialize(POJO)" on outer should deserialize inner', (done) =>
	{
		let model = new Outer();

		model.deserialize(
		{
			propOuter: 'outer 2',
			inner:
			{
				propInner: 'inner 2'
			}
		});

		expect(model.propOuter).toEqual('outer 2');
		expect(model.inner.propInner).toEqual('inner 2');

		setTimeout(() =>
		{
			expect(model.inner.isDirty).toEqual(true);
			expect(model.isDirty).toEqual(true);

			done();
		}, 0);
	});
});
