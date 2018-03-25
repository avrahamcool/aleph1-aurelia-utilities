import { stateTrack } from '../../src/index';

export class SomeClass
{
	@stateTrack()
	syncFunction(x, y)
	{
		return x + y;
	}

	@stateTrack()
	asyncFunction(x, y)
	{
		return Promise.resolve(x + y);
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
