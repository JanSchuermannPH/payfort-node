import { purchase_url } from './resources';
import { create_signature } from './utility';

declare const $: any;

export const create_client = (environment, data) => {
	const client = {
		environment: environment,
		access_code: data.access_code,
		merchant_identifier: data.merchant_identifier,
		passphrase: data.passphrase,
		url: null
	};
	let url = '';
	if ( data.purchase_url ) {
		url = data.purchase_url;
	} else {
		if ( environment == 'development' ) {
			url = purchase_url.development;
		} else {
			url = purchase_url.production;
		}
	}

	client.url = url;
	return client;
};

export const send_request = (client, data) => {
	let form = '<form id="payfortSubmission" style="display: none;" action="' + client.url + '" method="post">';
	data.access_code = client.access_code;
	data.merchant_identifier = client.merchant_identifier;
	if ( !data.signature ) {
		data.signature = create_signature(client.passphrase, data);
		localStorage.setItem('paymentToken', data.signature);
	}
	for ( const i in data ) {
		form += '<input type="hidden" name="' + i + '" value="' + data[ i ] + '" />';
	}
	form += '</form>';

	$('body').append(form);
	$('#payfortSubmission').submit();
};
