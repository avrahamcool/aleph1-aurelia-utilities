import { BaseModel, dirtyTrack } from '../../src/index';

export class SomeModel extends BaseModel
{
	@dirtyTrack() someEmptyString = '';
	@dirtyTrack() someString = 'string';
	@dirtyTrack() someZero = 0;
	@dirtyTrack() someInt = 7;
	@dirtyTrack() someTrue = true;
	@dirtyTrack() someFalse = false;
	@dirtyTrack() someEmptyArr = [];
	@dirtyTrack() someArr = ['val1', 2, null, undefined, true];
	@dirtyTrack() someNull = null;
	@dirtyTrack() someUndefined = undefined;
	@dirtyTrack() someUndeclared;
}
