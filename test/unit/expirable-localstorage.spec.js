import { ExpireableLocalstorage } from '../../src/index';

describe('the ExpireableLocalstorage class', () =>
{
	it('should have a "getItem" static function', () =>
	{
		expect(ExpireableLocalstorage.getItem).toEqual(jasmine.any(Function));
	});

	it('should have a "setItem" static function', () =>
	{
		expect(ExpireableLocalstorage.setItem).toEqual(jasmine.any(Function));
	});

	it('should have a "clear" static function', () =>
	{
		expect(ExpireableLocalstorage.clear).toEqual(jasmine.any(Function));
	});

	it('testing the behaviour of ExpireableLocalstorage', () =>
	{
		expect(ExpireableLocalstorage.getItem('some_key')).not.toBeDefined();

		ExpireableLocalstorage.setItem('some_key', 'some_value');
		expect(ExpireableLocalstorage.getItem('some_key')).toEqual('some_value');

		ExpireableLocalstorage.clear();

		expect(ExpireableLocalstorage.getItem('some_key')).not.toBeDefined();

		ExpireableLocalstorage.setItem('some_key', 'some_value', -1);
		expect(ExpireableLocalstorage.getItem('some_key')).not.toBeDefined();

		ExpireableLocalstorage.setItem('some_key', 'some_value', 1);
		expect(ExpireableLocalstorage.getItem('some_key')).toEqual('some_value');

		ExpireableLocalstorage.clear();
	});
});
