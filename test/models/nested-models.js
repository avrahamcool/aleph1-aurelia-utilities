import { BaseModel, dirtyTrack, dirtyTrackModel } from '../../src/index';

export class Inner extends BaseModel
{
	@dirtyTrack() propInner = 'inner';
}

export class Outer extends BaseModel
{
	@dirtyTrackModel(Inner) inner;
	@dirtyTrack() propOuter = 'outer';
}
