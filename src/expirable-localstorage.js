export class ExpireableLocalstorage
{
	static keyPrefix = 'Aleph1';
	static keyGenerator = key => `${ExpireableLocalstorage.keyPrefix}::${key}`;

	static getItem(key)
	{
		key = ExpireableLocalstorage.keyGenerator(key);
		let record = JSON.parse(localStorage.getItem(key));
		if (record && (!record.timeStamp || record.timeStamp > new Date().getTime()))
			return JSON.parse(record.data);
		localStorage.removeItem(key);
	}

	static setItem(key, jsonData, expirationMin)
	{
		key = ExpireableLocalstorage.keyGenerator(key);
		if (jsonData)
		{
			let timeStamp = expirationMin ? new Date().getTime() + expirationMin * 60 * 1000 : 0;
			let record = { data: JSON.stringify(jsonData), timeStamp: timeStamp };
			localStorage.setItem(key, JSON.stringify(record));
		}
		else
			localStorage.removeItem(key);
	}

	static clear()
	{
		for (let key in localStorage)
		{
			if (key.startsWith(ExpireableLocalstorage.keyPrefix))
				localStorage.removeItem(key);
		}
	}
}
