declare const crypto: any;

export const createHash = (string): string => {
	return crypto.createHash('sha256').update(string, 'utf8').digest('hex');
};

export const create_signature = (passphrase, object) => {
	let signatureText = '';
	const keys = [];
	for ( const eachKey in object ) {
		keys.push(eachKey);
	}
	keys.sort(compare);

	const len = keys.length;

	for ( let i = 0; i < len; i++ ) {
		const k = keys[ i ];
		signatureText = signatureText + (k + '=' + object[ k ]);
	}
	return createHash(passphrase + signatureText + passphrase);
};

export const compare = (a, b) => {
	if ( a < b ) {
		return -1;
	}
	if ( a > b ) {
		return 1;
	}
	return 0;
};
