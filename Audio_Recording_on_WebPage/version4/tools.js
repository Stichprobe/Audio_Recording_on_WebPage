


function getTimeStamp () {
	return new Date().toISOString().replace(/T/, ' ')
	 .replace(/\..+/, '')
	 .split(' ').join('')
	 .split(':').join('')
	 .split('-').join('');
}
