import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import secureRandom from 'secure-random';

const HEROKU_URI = 'https://recruitment-application-backe-bc537da7a4bd.herokuapp.com';
const LOCALHOST_URI = 'http://localhost:4567';
const PORT = '80';
const PUBLIC_KEY = `
"-----BEGIN PRIVATE KEY-----
MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBALVtRzmA5aSxe1QRIco3IVpolewxmYehk0uFfET/YD4YZZz/XoQIO+twbJqOC6RzSIHbahcWKwqFhl3zowp6+vgX0QeRyA4yVef0LhzsZoNsXTJ1p6mVMR432YboA3Ln5vw6TgdlpUl2uRhHnKtAxlpfIh4ZN0vUeaJZUS3eRdwfAgMBAAECgYEAl99TiSqCkjxUPgpdW9aMoA7+uYrHt8ck80pZvbR9j12C6krHhwURi8Q/1Z1k15P9tV7ET3EqNJOT6GAEMsjB/rWvOmzRi2qBfcZF3qv9GWpDVONk8SFqoqLAspgxKJvl9dIj4gVH2yBjI2YtKUDFQ9m9fDWPahuwc6cpkGaEBEkCQQDamIChPvXrT/kw3HXRuRj9zBOxkVtA6cVxInH3SQXYzU0F6K4SceB34q24UccfoR7b/MTrReqAzSU4buhFd+IDAkEA1HicAzcLpmwXbTGqTlSGWCCsugI11Eqc6+/emMAPKHH6PSpS21BW6+2mpFz1CmUF6Pfvj7RWMUaND6ZrNQuwtQJBAKvK6GRQ59HsAwoMaKfO0T48kUme09mbHyl/iZNvFyJAjoTTTWJ/joqJYj+WPWi1Jlx7NYM1akuZbeQA/ZgC1GMCQQCxpG18WqeI61Li3uVvPEheomMH2hU7e26b7R+FQv7pZ/I69Yn1B8TE2Ru8zGOr3y8Dy1gmJDb0V/JUpWV5Il8JAkEAl2jydoxaf4lymJq7N6e9wOWJCeafa/rppq7vtoddz+RvfFPyiH36Vpi5k5PBJdAYBsJe
e2+cS/dHkYPwTgZbKw==
	-----END PRIVATE KEY-----`;
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
		publicKey: "",
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
	 * @name encryptRegisterUser
	 * Encrypts the user data in the model
	 * @returns nothing
	 */
	async encryptLoginUsername(){
		this.fields.publicKey = PUBLIC_KEY;
		var crypt = new JSEncrypt();
		crypt.setPublicKey(this.fields.publicKey);
		const encString = this.createRandomString(32);
		/*
		var utf8Encode = new TextEncoder();
		const bytes = utf8Encode.encode(encString);
		*/
		const plainJSON = JSON.stringify({
			username: this.fields.userCredentials.username,
			userPassword: this.fields.userCredentials.userPassword,

		});
		const cipherJSON = CryptoJS.AES.encrypt(plainJSON, CryptoJS.enc.Hex.parse(encString), { iv: iv });
		const cryptedKey = crypt.encrypt(encString);
	
		this.fields.JSONCipherObject.cipher = cipherJSON.ciphertext.toString(CryptoJS.enc.Base64);
 		this.fields.JSONCipherObject.iv = cipherJSON.iv.toString();
 		this.fields.JSONCipherObject.key = cryptedKey; 
	},

	async encryptRegisterUser() {
		//await this.fetchPublicKey();
		//console.log("Public key was fetched:");
		this.fields.publicKey = PUBLIC_KEY;
		var crypt = new JSEncrypt();
		crypt.setPublicKey(this.fields.publicKey);
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
		this.encryptRegisterUser();
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

	async fetchPublicKey(){
		try {
			const response = await fetch('http://localhost:4567/returnpublickey');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = response;
			this.fields.publicKey = data;
		} catch (error) {
			console.log(`Error: ${error}`);
			throw error;
		}
	},

	async loginUsername(){
		try {
			const response = await fetch(LOCALHOST_URI + '/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject)
					
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			console.log(`error: ${error}`);
			throw error;
		}
	},

	async loginEmail(){
		try {
			const response = await fetch(HEROKU_URI + '/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject)
					
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			console.log(`error: ${error}`);
			throw error;
		}

	},

	createCookie(data){
		const expirationDate = "expires="+ new Date(data.expirationDate*1000);
		const cookieName = "loginCookie";
		document.cookie = cookieName + "=" + data.token + ";" + expirationDate + ";";

	},

	async login(props) {
		this.setField(props);
		this.encryptLoginUsername();
		if(props.username){
			const data = await this.loginUsername();
			this.createCookie(data);
			return data;
		} else if(props.email){
			const data = await this.loginEmail();
			this.createCookie(data);
			return data;
		}
		else {
			throw new Error;
		}
	},
	async registerUser() {
		try {
			const response = await fetch(LOCALHOST_URI + '/register',
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
			console.log(`Returned:`);
			console.log(data);
			return data;
		} catch (error) {
			console.error(`Error when registering: ${error}`);
			throw error;
		}
	},
	async listApplicants() {
		try {
			const response = await fetch(HEROKU_URI + '/applicants',
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
