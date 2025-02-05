import CryptoJS from 'crypto-js';
const ENCRYPTION_KEY = "ligma";

export default {
	fields: {
		userCredentials: {
			firstName: {
				firstName: "",
				IV: "",
			},
			lastName: {
				lastName: "",
				IV: "",
			},
			email: {
				email: "",
				IV: "",
			},
			personalNumber: {
				personalNumber: "",
				IV: "",
			},
			userName: {
				userName: "",
				IV:"",
			},
			userPassword: {
				userPassword: "",
				IV: "",
			},
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
	/*setAndEncryptField(props) {
		for (var data in props) {
			this.fields[data] = props[data];
			this.fields[data] = CryptoJS.AES.encrypt(JSON.stringify(props[data]), ENCRYPTION_KEY).toString();
			console.log(this.fields[data]);
		}
	},*/
	setField(props) {
		for (var data in props) {
			this.fields.userCredentials[data][data] = props[data];
		}
	},
	encryptData() {
		for (var data in this.fields.userCredentials) {
			const encryptedObject = (CryptoJS.AES.encrypt(data, ENCRYPTION_KEY));
			this.fields.userCredentials[data][data] = encryptedObject.toString();
			this.fields.userCredentials[data].IV = encryptedObject.iv.toString();
		}
		return;
	},
	setAndEncryptUserData(props) {
		this.setField(props);
		this.encryptData();
	},
	/**
	 * @function
	 * @name registerUser 
	 * @returns {object} Confirmation or Error message from backend. 
	 */
	async registerUser() {
		try {
			const response = await fetch(
				'http://localhost:4567/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						firstName: this.fields.userCredentials.firstName,
						lastName: this.fields.userCredentials.lastName,
						email: this.fields.userCredentials.email,
						personalNumber: this.fields.userCredentials.personalNumber,
						userName: this.fields.userCredentials.userName,
						userPassword: this.fields.userCredentials.userPassword,
						confirmUserPassword: this.fields.userCredentials.confirmUserPassword,

					}),
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
