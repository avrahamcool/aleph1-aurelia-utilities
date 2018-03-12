import { BaseModel, dirtyTrack } from '../../src/index';
import { ValidationRules } from 'aurelia-validation';


export class SomeModelWithValidation extends BaseModel
{
	@dirtyTrack() someRequiredField;

	constructor()
	{
		//here instead of const outside of the class- because of thest limitations
		let RULES = ValidationRules
			.ensure(o => o.someRequiredField).required();
		super(RULES);
	}
}

export class SomeModelWithoutValidation extends BaseModel
{
	@dirtyTrack() someField;
}
