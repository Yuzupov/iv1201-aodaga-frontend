import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import secureRandom from 'secure-random';

var URI = 'https://recruitment-application-backe-bc537da7a4bd.herokuapp.com';
if (window.location.hostname === "localhost"){
	URI = 'http://localhost:4567';
}

export default {
	/**
	 * Some fields for the model to hold data
	 */
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
	/**
	 * @function
	 * @name unSetCredentials
	 * Clears the model from any credentials.
	 *
	 */
	unSetUserCredentials(){
		for(let credential in this.fields.userCredentials){
			credential = "";
		}
	},
	/**
	 * @function
	 * @name createRandomString
	 * @param {integer} length
	 * Takes a length and generates a hex string of that length that is random.
	 * @returns {string] 
	 */

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
	 * @param {JSON}
	 * Encrypts the argument passed to it, returns a json and a key used for decrypting the response
	 * @returns {JSON}
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

	/**
	 * @function
	 * @name decryptResponse
	 * @param {JSON}
	 * Takes a JSON, decrypts and checks if the signature is valid, returns the decrypted object if true
	 * @returns {JSON}
	 */

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
	
	/**
	 * @function
	 * @name createCookie
	 * @param {string, string}
	 * Takes a token value and a timestampt from the back-end and creates a cookie with the data as a URI encoded JSON string
	 * @returns none
	 *
	 *
	 */

	createCookie(token, role, expirationTimestamp){
		const expirationDate = new Date(expirationTimestamp*1000);
		const storedValues = { authToken: token, userRole: role };
		const cookieValue = encodeURIComponent(JSON.stringify(storedValues));
		document.cookie = `loginCookie=${cookieValue}; expires=${expirationDate};`;
	},

	/**
	 * @function
	 * @name getCookie
	 * @param {string}
	 * Takes a cookie name as an argument and checks if the cookie is stored in the browser.
	 * @returns empty string if not found, otherwise the cookie value
	 *
	 *
	 */

	getCookie(cname) { 
		const cookies = document.cookie.split("; ");
		for (let cookie of cookies) {
			let [key, value] = cookie.split("=");
			if (key === cname) {
				const returnedCookieValue = JSON.parse(decodeURIComponent(value));
				return returnedCookieValue;
			}
		}
		return "";
	},
	/**
	 * Following section includes methods that are used by the presenter layer for making API requests.
	 */

	/**
	 * @function
	 * @name createAccount
	 * @param {props}
	 * Creates an account 
	 * @returns nothing
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
			throw error;
		}
	},

	/**
	 * @function
	 * @name login
	 * @param {props}
	 * Logs in a user
	 * @returns nothing
	 */

	async login(props) {
		const epoch = Date.now().toString();
		this.setField(props);
		const crypt = this.encryptJSONObject(props);
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.timestamp = epoch;
		try {
			const response = await this.loginUser(epoch);
			const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
			this.createCookie(decryptedResponse.token, decryptedResponse.role, decryptedResponse.expirationDate);
			this.fields.role = decryptedResponse.role;
		} catch (error) {
			throw error;
		}
	},

	/**
	 * @function
	 * @name listApplicants
	 * Lists applicants available from back-end
	 * @returns list of JSON objects 
	 */

	async listApplicants(){
		const epoch = Date.now().toString();
		const cookieValues = this.getCookie("loginCookie");
		const authToken = {token: cookieValues.authToken};
		const crypt = this.encryptJSONObject(authToken);
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.timestamp = epoch;
		try{
			const response = await this.fetchApplicantList();
			const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
			var list = decryptedResponse.applicants;
			let i = 0;
			list.map((app) => app.id = i++);
			return list;
		} catch {
			throw new Error;
		}
	},

	/**
	 * @function
	 * @name resetPasswordLink
	 * @params {props}
	 * Requests the back-end to create a temporary reset-password link
	 * @returns nothing
	 */

	async resetPasswordLink(props){
		const epoch = Date.now().toString();
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

	/**
	 * @function
	 * @name validateLink
	 * @params {props}
	 * Checks if the link provided by the back-end is valid.
	 * @returns {JSON} 
	 */

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

	/**
	 * @function
	 * @name setNewPassword
	 * @params {props}
	 * Sets the new password in the back-end
	 * @returns {JSON} 
	 */

	async setNewPassword(props){
		const epoch = Date.now().toString();
		const crypt = this.encryptJSONObject({
			link: props.token.token,
			password: props.userPassword
		});
		this.fields.JSONCipherObject = crypt.json;
		this.fields.JSONCipherObject.timestamp = epoch;
		try{
			const response = await this.sendAndSetNewPassword();
			const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
			return decryptedResponse;
		} catch (error) {
			throw new Error("Failed resetting password, try again");
		}
	},

	/**
	 * @function
	 * @name updateApplicant
	 * @params {props}
	 * talks to the dummy endpoint
	 * @returns {JSON}
	 */
	async updateApplicant(props){
        const epoch = Date.now().toString();
        this.setField(props);
        const crypt = this.encryptJSONObject({
		password: props.password, 
		token: props.token
	});
        this.fields.JSONCipherObject = crypt.json;
        this.fields.JSONCipherObject.timestamp = epoch;
        try {
            const response = await this.updateApplicantPost(epoch);
            const decryptedResponse = this.decryptResponse(response, crypt.aeskey, epoch);
            return decryptedResponse;
        } catch (error){
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
				if(response.status === 400){
					throw new Error("User already exists");
				}
				if(response.status === 500){
					throw new Error("We are currently experiencing problems on our end, please try again later");
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			throw error;
		}
	},

	/**
	 * @function
	 * @name loginUser
	 * sends a POST request to back-end to login a user
	 * @retursn {object} confirmation or error 
	 */
	async loginUser(){
		try {
			const response = await fetch(URI + '/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(this.fields.JSONCipherObject),

				}
			);
			if (!response.ok) {
				if(response.status === 400){
					throw new Error("No user found");
				}
				if(response.status === 403){
					throw new Error("Incorrect credentials");
				}
				if(response.status === 500){
					throw new Error("We are currently experiencing problems on our end, please try again later");
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			throw error;
		}
	},

	/**
	 * @function
	 * @name fetchApplicantList
	 * fetch function that returns a JSON object with all of the applicants found in backend
	 * @returns {JSON}
	 */
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
				if(response.status === 500){
					throw new Error("We are currently experiencing problems on our end, please try again later");
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			throw new Error(`Error when requesting applicants: ${error}`);	
		}
	},

	/**
	 * @function
	 * @name createPasswordResetLink
	 * asks backend to create a temporary password reset link
	 * @returns {JSON}
	 */

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
				if(response.status === 500){
					throw new Error("We are currently experiencing problems on our end, please try again later");
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		} catch (error) {
			throw new Error(`Error when requesting password link ${error}`);
		}

	},

	/**
	 * @function
	 * @name validateResetLink
	 * checks with back-end that the temporary link sent to it is valid
	 * @returns {JSON}
	 */

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

	/**
	 * @function
	 * @name sendAndSetNewPassword
	 * sends and asks to set the new password in the database
	 * @returns {JSON}
	 */

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

	/**
	 * @function
	 * @name
	 * sends a request to the dummy endpoint to update the status of an applicant
	 */

	async updateApplicantPost(){
        try{
            const response = await fetch(URI + '/applicant/update',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.fields.JSONCipherObject),
                }
                
            );
            if (!response.ok) {
		if(response.status === 403){
			throw new Error("Incorrect password");
		}
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error(`Error when updating applicant: ${error}`);    
            throw error;
        }
    },

	
	
};

