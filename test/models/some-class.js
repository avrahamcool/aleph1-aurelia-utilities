import { stateTrack } from '../../src/index';

export class SomeClass
{
	someVar = 1;

	@stateTrack()
	syncFunction(x, y)
	{
		return x + y + this.someVar;
	}

	@stateTrack()
	asyncFunction(x, y)
	{
		return Promise.resolve(x + y + this.someVar);
	}

	@stateTrack()
	syncFunctionError(x, y)
	{
		throw Error('Error');
	}

	@stateTrack()
	asyncFunctionError(x, y)
	{
		return Promise.reject('Error');
	}
}
