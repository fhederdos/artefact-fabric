
'use strict';

/* global authorizeAccess reovekAccess getFactory emit */

/**
 * A Member grants access to their record to another Member.
 * @param {org.acme.pii.AuthorizeAccess} authorize - the authorize to be processed
 * @transaction
 */

async function authorizeAccess(authorize) {  

	const myDocument = getCurrentDocument();	

	if(!myDocument) {
		throw new Error('A document mapping does not exist.');
	}
	let index = -1;

	if(!myDocument.authorized) {
		myDocument.authorized = [];
	}
	else {
		index = myDocument.authorized.indexOf(authorize.personId);
	}

	if(index < 0) {
		myDocument.authorized.push(authorize.personId);

		// emit an event
		const event = getFactory().newEvent('org.fhederdos.documentversioning.document', 'PersonEvent');
		event.personTransaction = authorize;
		emit(event);
    }
}

async function revokeAccess(authorize) {  

	const myDocument = getCurrentDocument();	

	if(!myDocument) {
		throw new Error('A document mapping does not exist.');
	}
	let index = -1;

	if(!myDocument.authorized) {
		myDocument.authorized = [];
	}
	else {
		index = myDocument.authorized.indexOf(authorize.personId);
	}

	if(index > -1) {
		myDocument.authorized.pull(authorize.personId);

		// emit an event
		const event = getFactory().newEvent('org.fhederdos.documentversioning.document', 'PersonEvent');
		event.personTransaction = authorize;
		emit(event);
    }
}