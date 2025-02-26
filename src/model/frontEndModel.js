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
			epoch: "",
		},
		confirmationMessage: "",
		publicKey: "",
		role: "",
	},
	/**
	 * Following section includes state modifying methods for the model
	 */

	/**
	 * @function 
	 * @name setField
	 * @param {object} props 
	 * Data user information from the registration form 
	 * @returns nothing
	 */
	setField(props) {
		for (let data in props) {
			this.fields.userCredentials[data] = props[data];
		}
	},

	unSetUserCredentials(){
		for(let credential in this.fields.userCredentials){
			credential = "";
		}
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
	 * @name encryptJSONObject
	 * Encrypts the user data in the model
	 * @returns nothing
	 */

	encryptJSONObject(jsonObject) {
		let cryptRSA = new JSEncrypt();

		cryptRSA.setPublicKey(import.meta.env.VITE_PUBLIC_KEY);
		const AESKeyHex = this.createRandomString(64);
		const iv = CryptoJS.enc.Hex.parse(this.createRandomString(32));

		const cipherJSON = CryptoJS.AES.encrypt(JSON.stringify(jsonObject), CryptoJS.enc.Hex.parse(AESKeyHex), { iv: iv });

		const AESKeyB64 = CryptoJS.enc.Hex.parse(AESKeyHex).toString(CryptoJS.enc.Base64);
		const cryptedKey = cryptRSA.encrypt(AESKeyB64);

		let encryptedJson = {}
		encryptedJson.cipher = cipherJSON.ciphertext.toString(CryptoJS.enc.Base64);
		encryptedJson.iv = cipherJSON.iv.toString(CryptoJS.enc.Base64);
		encryptedJson.key = cryptedKey;

		return {aeskey: AESKeyHex, json: encryptedJson};
	},

	decryptResponse(response, symmetricKey, epoch){

		const signatureAES = CryptoJS.enc.Base64.parse(response.signature)
		const signatureRSA = CryptoJS.AES.decrypt({ciphertext: signatureAES}, CryptoJS.enc.Hex.parse(symmetricKey), {iv: CryptoJS.enc.Base64.parse(response.signatureIv)})

		const signatureRSAB64 = signatureRSA.toString(CryptoJS.enc.Utf8);

		let cryptRSA = new JSEncrypt();
		cryptRSA.setPublicKey
		cryptRSA.setPublicKey(import.meta.env.VITE_PUBLIC_KEY);
		const signatureVerified = cryptRSA.verify(epoch,signatureRSAB64,CryptoJS.SHA256);

		console.log("signVerified")
		console.log(signatureVerified)


		if(!signatureVerified){
			console.error('Incorrect signature');
			throw new Error;
		}

		if(response.cipher){

			const responseAES = CryptoJS.enc.Base64.parse(response.cipher)
			const decryptedResponseBytes = CryptoJS.AES.decrypt({ciphertext: responseAES}, CryptoJS.enc.Hex.parse(symmetricKey), {iv: CryptoJS.enc.Base64.parse(response.iv)})
			const decryptedResponse = decryptedResponseBytes.toString(CryptoJS.enc.Utf8);

			//const hexIv = Buffer.from(response.iv, 'base64');
			//const iv = hexIv.toString('hex');
			const responseJson = JSON.parse(decryptedResponse)
			return responseJson;
		}
		//return {signature: decryptedSignature};
	},

	createCookie(token, expirationTimestamp){
		const expirationDate = "expires="+ new Date(expirationTimestamp*1000);
		const cookieName = "loginCookie";
		document.cookie = cookieName + "=" + token + ";" + expirationDate + ";";
	},

	getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	/**
	 * Following section includes methods that are used by the presenter layer for making API requests.
	 */

	async createAccount(props){
		const epoch = Date.now().toString();
		this.setField(props);
		const crypt = this.encryptJSONObject(props);
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.timestamp = epoch;

		try {
			const response = await this.registerUser();
			const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
			return {};
		} catch (error) {
			console.log(error);
			throw error;
		}
	},

	async login(props) {
		const epoch = Date.now().toString();
		this.setField(props);
		const crypt = this.encryptJSONObject(props);
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.timestamp = epoch;
		try {
			const response = await this.loginUser(epoch);
			const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
			console.log(decryptedResponse);
			this.createCookie(decryptedResponse.token, decryptedResponse.expirationDate);
			const token = this.getCookie("loginCookie");
			this.fields.role = decryptedResponse.role;
		} catch {
			throw new Error;
		}
	},

	async listApplicants(){
			const epoch = Date.now().toString();
			const authToken = {token: this.getCookie("loginCookie")};
			const crypt = this.encryptJSONObject(authToken);
			this.fields.JSONCipherObject = crypt.json;
			this.fields.JSONCipherObject.timestamp = epoch;
		try{
			console.log("call in listapplicants");
			const response = await this.fetchApplicantList();
			const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
			console.log(decryptedResponse);
			var list = decryptedResponse.applicants;
			return list;
		} catch {
			throw new Error;
		}
	},

	async resetPasswordLink(props){
		const epoch = Date.now().toString();
		console.log(props);
		const crypt = this.encryptJSONObject(props);
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.timestamp = epoch;
		try{
			const response = await this.createPasswordResetLink();
			const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
		} catch (error){
			console.error(error);
		}

	},

	async validateLink(props){
		const epoch = Date.now().toString();
		const crypt = this.encryptJSONObject({ link: props.token });
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.timestamp = epoch;
		try{
			const validated = await this.validateResetLink();
			const decryptedResponse = this.decryptResponse(validated, crypt.aeskey, epoch);
			return ({ message: decryptedResponse });
		} catch (error) {
			console.error("Error when validating link");
		}
	},

	async sendAndSetNewPassword(props){
		const epoch = Date.now().toString();
		const crypt = this.encryptJSONObject({ password: props.password});
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.timestamp = epoch;
		try{
			console.log("We are in the function that calls for teh request");
			const response = await sendAndSetNewPassword();
			return response.json();
		} catch (error) {
			console.error("Failed resetting password");
			throw error;
		}
	},

	/**
	 * Following section contains methods that does the actual requests to the back-end APIs
	 */


	/**
	 * @function
	 * @name registerUser 
	 * Sends a POST request to the back-end to register a user.
	 * @returns {object} Confirmation or Error object from backend. 
	 */

	async registerUser(epoch) {
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
			return response.json();
		} catch (error) {
			console.error(`Error when registering: ${error}`);
			throw error;
		}
	},

	async loginUser(epoch){
		try {
			const response = await fetch(URI + '/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject),

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

	async fetchApplicantList() {
		try {
			const response = await fetch(URI + '/applicants',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			console.error(`Error when requesting applicants: ${error}`);	
			throw error;
		}
	},

	async createPasswordResetLink(){
		try {
			const response = await fetch(URI + '/password-reset/create-link',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			console.error(`Error when requesting password link ${error}`);
		}

	},

	async validateResetLink(){
		try {
			const response = await fetch(URI + '/password-reset/validate-link',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			console.error(`Error when requesting password link ${error}`);
		}
	},

	async sendAndSetNewPassword(){
		try {
			const response = await fetch(URI + '/password-reset',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			console.error(`Error when requesting password link ${error}`);
		}
	},
};

