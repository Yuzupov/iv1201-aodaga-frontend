import CryptoJS from 'crypto-js';
var ENCRYPTION_KEY = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENC_KEY);

var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

export default {
	fields: {
		userCredentials: {
			firstName: "",
			lastName: "",
			email: "",
			personalNumber: "",
			username: "",
			userPassword: "",
		},
		JSONCipherObject: {
			cipher: "",
			iv: "",
		},
		confirmationMessage: "",
	},
	/**
	 * @function 
	 * @name setField
	 * @param {object} props 
	 * Data user information from the registration form 
	 * @returns nothing
	 */
	setField(props) {
		for (var data in props) {
			this.fields.userCredentials[data] = props[data];
		}
	},
	/**
	 * @function
	 * @name encryptJSONObject
	 * Encrypts the user data in the model
	 * @returns nothing
	 */
	encryptJSONObject() {
		console.log(ENCRYPTION_KEY);
		const plainJSON = JSON.stringify({
			firstName: this.fields.userCredentials.firstName,
			lastName: this.fields.userCredentials.lastName,
			email: this.fields.userCredentials.email,
			personalNumber: this.fields.userCredentials.personalNumber,
			username: this.fields.userCredentials.username,
			userPassword: this.fields.userCredentials.userPassword,
			confirmUserPassword: this.fields.userCredentials.confirmUserPassword,

		});
		const cipherJSON = CryptoJS.AES.encrypt(plainJSON, ENCRYPTION_KEY, { iv: iv });
		this.fields.JSONCipherObject.cipher = cipherJSON.ciphertext.toString(CryptoJS.enc.Base64);
		this.fields.JSONCipherObject.iv = cipherJSON.iv.toString();
		console.log(this.fields.JSONCipherObject);

	},
	/**
	 * @function
	 * @name setAndEncryptUserData
	 * @param {object} props 
	 * Sets and encrypts the user data.
	 * @returns nothing
	 */
	setAndEncryptUserData(props) {
		this.setField(props);
		this.encryptJSONObject();
	},
	/**
	 * @function
	 * @name registerUser 
	 * Sends a POST request to the back-end to register a user.
	 * @returns {object} Confirmation or Error object from backend. 
	 */
	async registerUser() {
		try {
			const response = await fetch(
				'http://localhost:4567/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = response;
			console.log(`Returned: ${data}`);
			return data;
		} catch (error) {
			console.error(`Error when registering: ${error}`);
			throw error;
		}
	},
};
