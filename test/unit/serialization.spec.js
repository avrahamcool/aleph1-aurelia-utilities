import { SomeModel } from './some-model';

describe('serializing a model', () =>
{
	it('"serialize" should return a pojo of defined keys', () =>
	{
		let model = new SomeModel();
		expect(model.serialize()).toEqual(
		{
			someEmptyString: '',
			someString: 'string',
			someZero: 0,
			someInt: 7,
			someTrue: true,
			someFalse: false,
			someEmptyArr: [],
			someArr: ['val1', 2, null, undefined, true],
			someNull: null
		});
	});

	it('"serialize(true)" should return a pojo of all keys', () =>
	{
		let model = new SomeModel();
		expect(model.serialize(true)).toEqual(
		{
			someEmptyString: '',
			someString: 'string',
			someZero: 0,
			someInt: 7,
			someTrue: true,
			someFalse: false,
			someEmptyArr: [],
			someArr: ['val1', 2, null, undefined, true],
			someNull: null,
			someUndefined: undefined,
			someUndeclared: undefined
		});
	});

	it('"deserialize(POJO)" should copy defined keys from a pojo', () =>
	{
		let model = new SomeModel();

		model.deserialize(
		{
			someString: 'test',
			someInt: 9,
			someTrue: undefined,
			someArr: null
		});

		expect(model.someString).toEqual('test');
		expect(model.someInt).toEqual(9);
		expect(model.someTrue).toEqual(true);
		expect(model.someArr).toBeNull();
	});

	it('"deserialize(POJO, true)" should copy all keys from a pojo', () =>
	{
		let model = new SomeModel();

		model.deserialize(
		{
			someString: 'test',
			someTrue: undefined,
			someArr: null
		}, true);

		expect(model.someString).toEqual('test');
		expect(model.someInt).toBeUndefined();
		expect(model.someTrue).toBeUndefined();
		expect(model.someArr).toBeNull();
	});
});
