import { BaseModel, dirtyTrackArray } from '../../src/index';

export class ModelWithArr extends BaseModel
{
	@dirtyTrackArray() trackedArr = [1, 2, 3];
}
