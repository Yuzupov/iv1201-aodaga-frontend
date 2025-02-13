import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import secureRandom from 'secure-random';

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
			key: "",
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
	unSetUserCredentials(){
		for(var credential in this.fields.userCredentials){
			credential = "";
		}
	},
	parseData(props){
		var listOfApplicants = [];
		var parsedProps = JSON.parse(props);
		listOfApplicants = parsedProps.applicants;
		/*
		var i = 0;
		for(var applicantData in parsedProps.data.listOfApplicants){
			listOfApplicants[i] = applicantData;
			i++;
		}
		*/
		return listOfApplicants;
	},

	/**
	 * @function
	 * @name encryptJSONObject
	 * Encrypts the user data in the model
	 * @returns nothing
	 */
	encryptJSONObject() {
		var crypt = new JSEncrypt();
		crypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1bUc5gOWksXtUESHKNyFaaJXs
MZmHoZNLhXxE/2A+GGWc/16ECDvrcGyajgukc0iB22oXFisKhYZd86MKevr4F9EH
kcgOMlXn9C4c7GaDbF0ydaeplTEeN9mG6ANy5+b8Ok4HZaVJdrkYR5yrQMZaXyIe
GTdL1HmiWVEt3kXcHwIDAQAB
-----END PUBLIC KEY-----`);
		const encString = this.createRandomString(32);
		/*
		var utf8Encode = new TextEncoder();
		const bytes = utf8Encode.encode(encString);
		*/
		const plainJSON = JSON.stringify({
			firstName: this.fields.userCredentials.firstName,
			lastName: this.fields.userCredentials.lastName,
			email: this.fields.userCredentials.email,
			personalNumber: this.fields.userCredentials.personalNumber,
			username: this.fields.userCredentials.username,
			userPassword: this.fields.userCredentials.userPassword,
			confirmUserPassword: this.fields.userCredentials.confirmUserPassword,

		});
		const cipherJSON = CryptoJS.AES.encrypt(plainJSON, CryptoJS.enc.Hex.parse(encString), { iv: iv });
		const cryptedKey = crypt.encrypt(encString);
	
		this.fields.JSONCipherObject.cipher = cipherJSON.ciphertext.toString(CryptoJS.enc.Base64);
 		this.fields.JSONCipherObject.iv = cipherJSON.iv.toString();
 		this.fields.JSONCipherObject.key = cryptedKey; 

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
	createRandomString(length) {
		const chars = "0123456789abcdef"
		let result = "";
		const randomArray = new Uint8Array(length);
		crypto.getRandomValues(randomArray);
		randomArray.forEach((number) => {
			result += chars[number % chars.length];
		});
		return result;
	},
	/**
	 * @function
	 * @name registerUser 
	 * Sends a POST request to the back-end to register a user.
	 * @returns {object} Confirmation or Error object from backend. 
	 */
	async loginUsername(){
		try {
			const response = await fetch('http://localhost:4567/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						username: this.fields.userCredentials.username,
						userPassword: this.fields.userCredentials.userPassword,
					})
					
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = response;
			console.log(`Returned data from login: ${data}`);
			return data;

		} catch (error) {
			console.log(`error: ${error}`);
			throw error;
		}
	},

	async loginEmail(){
		try {
			const response = await fetch('http://localhost:4567/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						email: this.fields.userCredentials.email,
						userPassword: this.fields.userCredentials.userPassword,
					})
					
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = response;
			console.log(`Returned data from login: ${data}`);
			return data;

		} catch (error) {
			console.log(`error: ${error}`);
			throw error;
		}

	},

	async login(props) {
		this.setField(props);
		if(props[username]){
			loginUsername();
		} else if(props[email]){
			loginEmail();
		} else {
			throw error;
		}
	},
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
	async listApplicants() {
		try {
			const response = await fetch(
				'http://localhost:4567/list-applicants',
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					//maybe some auth here?
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = response;
			console.log(data);
			const parsedData = this.parseData(response);
			console.log(parsedData);
			return parsedData;
			
		} catch (error) {
			console.error(`Error when requesting applicants: ${error}`);	
			throw error;
		}
	},
};
