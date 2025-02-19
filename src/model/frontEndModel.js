import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import secureRandom from 'secure-random';

var URI = 'https://recruitment-application-backe-bc537da7a4bd.herokuapp.com';
if (window.location.hostname === "localhost"){
	URI = 'http://localhost:4567';
}


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
	 * @name encryptJSONObject
	 * Encrypts the user data in the model
	 * @returns nothing
	 */
	encryptLoginUsername(){
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

	encryptJSONObject() {
		var cryptSHA = new JSEncrypt();
		cryptSHA.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1bUc5gOWksXtUESHKNyFaaJXs
MZmHoZNLhXxE/2A+GGWc/16ECDvrcGyajgukc0iB22oXFisKhYZd86MKevr4F9EH
kcgOMlXn9C4c7GaDbF0ydaeplTEeN9mG6ANy5+b8Ok4HZaVJdrkYR5yrQMZaXyIe
GTdL1HmiWVEt3kXcHwIDAQAB
-----END PUBLIC KEY-----`);
		const AESKeyHex = this.createRandomString(64);
		const iv = CryptoJS.enc.Hex.parse(this.createRandomString(32));
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
		const cipherJSON = CryptoJS.AES.encrypt(plainJSON, CryptoJS.enc.Hex.parse(AESKeyHex), { iv: iv });

		console.log(AESKeyHex);
		console.log(CryptoJS.enc.Hex.parse(AESKeyHex));
		const AESKeyB64 = CryptoJS.enc.Hex.parse(AESKeyHex).toString(CryptoJS.enc.Base64);
		const cryptedKey = cryptSHA.encrypt(AESKeyB64);

		this.fields.JSONCipherObject.cipher = cipherJSON.ciphertext.toString(CryptoJS.enc.Base64);
 		this.fields.JSONCipherObject.iv = cipherJSON.iv.toString(CryptoJS.enc.Base64);
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
			const response = await fetch(URI + '/login',
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
			const response = await fetch(URI + '/login',
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
			const response = await fetch(URI + '/register',
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
			const response = await fetch(URI + '/applicants',
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
