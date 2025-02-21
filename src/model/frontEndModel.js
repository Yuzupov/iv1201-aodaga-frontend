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

	parseList(jsonObject){
		let list = [];
		let i = 0;
		for(let applicant in jsonObject.applicants){
			list[i] = applicant;
			i++;
		}
		return list;
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

	createCookie(data){
		const expirationDate = "expires="+ new Date(data.expirationDate*1000);
		const cookieName = "loginCookie";
		document.cookie = cookieName + "=" + data.token + ";" + expirationDate + ";";
	},

	decryptResponse(response, symmetricKey, epoch){
		let cryptRSA = new JSEncrypt();
		
		const signatureAES = CryptoJS.enc.Base64.parse(response.signature);
		const signatureRSA = CryptoJS.AES.decrypt(signatureAES, CryptoJS.enc.Hex.parse(symmetricKey), {iv: CryptoJS.enc.Base64.parse(response.iv)})
		const signatureRSAB64 = signatureRSA.toString(CryptoJS.enc.Base64);
		
		cryptRSA.setPublicKey(import.meta.env.VITE_PUBLIC_KEY);
		const decryptedSignature = cryptRSA.decrypt(signatureRSAB64);


		console.log(typeof(epoch));
		console.log(epoch);
		console.log(typeof(decryptedSignature));
		console.log(decryptedSignature);

		if(!decryptedSignature === epoch){
			throw new Error;
		}
		if(response.cipherText){
			//const hexIv = Buffer.from(response.iv, 'base64');
			//const iv = hexIv.toString('hex');
		  const plainText= CryptoJS.AES.decrypt(response.signature, CryptoJS.enc.Hex.parse(symmetricKey), { iv: CryptoJS.enc.Base64.parse(response.iv) })
			return {signature: decryptedSignature, plainText: plainText};
		}
		return {signature: decryptedSignature};
	},

	/**
	 * Following section includes methods that are used by the presenter layer for making API requests.
	 */
	
	async createAccount(props){
		try {
		const epoch = Date.now();
		console.log(typeof(epoch));
		console.log(epoch);
		this.setField(props);
		const crypt = this.encryptJSONObject(props);
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.epoch = epoch;
		const response = await this.registerUser();
		const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
		console.log(decryptedResponse.plainText);
		return decryptedResponse.plainText;
		} catch (error) {
			console.error('Incorrect signature');
			throw error;
		}
	},

	async login(props) {
		const epoch = Date.now();
		this.setField(props);
		const crypt = this.encryptJSONObject(props);
		this.fields.JSONCipherObject = crypt.json;

		try {
			const data = await this.loginUser(epoch);
			this.createCookie(data);
			return data;
		} catch {
			throw new Error;
		}
	},
	
	async listApplicants(){
		try{
			const epoch = Date.now();
			const response = await this.fetchApplicantList()
			list = parseList(response);
			return list;
		} catch {
			throw new Error;
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
			return response;
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

	async fetchApplicantList(epoch) {
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
};
