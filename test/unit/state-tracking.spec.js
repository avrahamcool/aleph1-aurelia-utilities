import { SomeClass } from "../models/some-class";

describe("state tracking a model", () =>
{
	it('should not have a "*_isBusy" property', () =>
	{
		const obj = new SomeClass();
		expect(obj).not.toHaveMember("syncFunction_isBusy");
		expect(obj).not.toHaveMember("asyncFunction_isBusy");
		expect(obj).not.toHaveMember("syncFunctionError_isBusy");
		expect(obj).not.toHaveMember("asyncFunctionError_isBusy");
	});

	it('should not have a "*_hasError" property', () =>
	{
		const obj = new SomeClass();
		expect(obj).not.toHaveMember("syncFunction_hasError");
		expect(obj).not.toHaveMember("asyncFunction_hasError");
		expect(obj).not.toHaveMember("syncFunctionError_hasError");
		expect(obj).not.toHaveMember("asyncFunctionError_hasError");
	});

	it('should have a "*_isBusy" property after calling "*"', () =>
	{
		const obj = new SomeClass();
		obj.asyncFunction();
		expect(obj).toHaveMember("asyncFunction_isBusy");

		obj.syncFunction();
		expect(obj).toHaveMember("syncFunction_isBusy");

		obj.asyncFunctionError().catch(() => {});
		expect(obj).toHaveMember("asyncFunctionError_isBusy");

		try
		{
			obj.syncFunctionError();
		}
		catch (error) {}
		expect(obj).toHaveMember("syncFunctionError_isBusy");
	});

	it('should have a "*_hasError" property after calling "*"', () =>
	{
		const obj = new SomeClass();
		obj.asyncFunction();
		expect(obj).toHaveMember("asyncFunction_hasError");

		obj.syncFunction();
		expect(obj).toHaveMember("syncFunction_hasError");

		obj.asyncFunctionError().catch(() => {});
		expect(obj).toHaveMember("asyncFunctionError_hasError");

		try
		{
			obj.syncFunctionError();
		}
		catch (error) {}
		expect(obj).toHaveMember("syncFunctionError_hasError");
	});

	it('"*_isBusy" should become "true" when calling async functions', () =>
	{
		let obj = new SomeClass();

		obj.asyncFunction();
		expect(obj.asyncFunction_isBusy).toEqual(true);

		let badPromise = obj.asyncFunctionError();
		expect(obj.asyncFunctionError_isBusy).toEqual(true);
		badPromise.catch(() => {});
	});

	it('"*_isBusy" should become "false" after the execution of async/sync functions', () =>
	{
		let obj = new SomeClass();

		obj.asyncFunction().then(() =>
		{
			expect(obj.asyncFunction_isBusy).toEqual(false);
		});

		obj.syncFunction();
		expect(obj.syncFunction_isBusy).toEqual(false);

		obj.asyncFunctionError().catch(() =>
		{
			expect(obj.asyncFunctionError_isBusy).toEqual(false);
		});

		try
		{
			obj.syncFunctionError();
		}
		catch (_)
		{
			expect(obj.syncFunctionError_isBusy).toEqual(false);
		}
	});

	it('"*_hasError" should stay "false" for good functions', () =>
	{
		let obj = new SomeClass();

		obj.asyncFunction().then(() =>
		{
			expect(obj.asyncFunction_hasError).toBeFalsy();
		});

		obj.syncFunction();
		expect(obj.syncFunction_hasError).toBeFalsy();
	});

	it('"*_hasError" should have the Error for bad functions', () =>
	{
		const obj = new SomeClass();

		obj.asyncFunctionError().catch(() =>
		{
			expect(obj.asyncFunctionError_hasError).toBeTruthy();
		});

		try
		{
			obj.syncFunctionError();
		}
		catch (_)
		{
			expect(obj.syncFunctionError_hasError).toBeTruthy();
		}
	});

	it('two seperate models should not share state', () =>
	{
		let obj1 = new SomeClass();
		let obj2 = new SomeClass();

		expect(obj1.asyncFunctionError_hasError).toBeFalsy();
		expect(obj2.asyncFunctionError_hasError).toBeFalsy();

		obj1.asyncFunctionError().catch(() =>
		{
			expect(obj1.asyncFunctionError_hasError).toBeTruthy();
			expect(obj2.asyncFunctionError_hasError).toBeFalsy();
		});
	});

	it('calling the new function should do exactly what the old function did', () =>
	{
		let obj = new SomeClass();

		expect(obj.syncFunction(1, 4)).toEqual(6);
		expect(obj.syncFunctionError).toThrow();

		obj.asyncFunction(1, 4).then(result =>
		{
			expect(result).toEqual(6);
		});

		expect(obj.asyncFunctionError).toThrow();
	});
});
