export function stateTrack()
{
	return function(target, property, descriptor)
	{
		let givenFunc = property && target[property];
		if (!(givenFunc && givenFunc.constructor && givenFunc.call && givenFunc.apply)) throw Error('stateTrack Decorator should be used on function only!');

		let busy = `${property}_isBusy`;
		let error = `${property}_hasError`;

		descriptor.value = function(...params)
		{
			this[busy] = true;
			this[error] = false;
			try
			{
				let retVal = givenFunc.call(this, ...params);
				if (retVal && retVal.then)
				{
					return retVal
						.then(data =>
						{
							this[busy] = false;
							return data;
						})
						.catch(e =>
						{
							this[busy] = false;
							this[error] = e;
							throw e;
						});
				}

				this[busy] = false;
				return retVal;
			}
			catch (er)
			{
				this[busy] = false;
				this[error] = er;
				throw er;
			}
		};

		return descriptor;
	};
}
