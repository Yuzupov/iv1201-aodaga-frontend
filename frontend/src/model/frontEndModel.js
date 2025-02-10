import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import secureRandom from 'secure-random';
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
		crypt.setPrivateKey(`-----BEGIN PRIVATE KEY-----
MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBALVtRzmA5aSxe1QR
Ico3IVpolewxmYehk0uFfET/YD4YZZz/XoQIO+twbJqOC6RzSIHbahcWKwqFhl3z
owp6+vgX0QeRyA4yVef0LhzsZoNsXTJ1p6mVMR432YboA3Ln5vw6TgdlpUl2uRhH
nKtAxlpfIh4ZN0vUeaJZUS3eRdwfAgMBAAECgYEAl99TiSqCkjxUPgpdW9aMoA7+
uYrHt8ck80pZvbR9j12C6krHhwURi8Q/1Z1k15P9tV7ET3EqNJOT6GAEMsjB/rWv
OmzRi2qBfcZF3qv9GWpDVONk8SFqoqLAspgxKJvl9dIj4gVH2yBjI2YtKUDFQ9m9
fDWPahuwc6cpkGaEBEkCQQDamIChPvXrT/kw3HXRuRj9zBOxkVtA6cVxInH3SQXY
zU0F6K4SceB34q24UccfoR7b/MTrReqAzSU4buhFd+IDAkEA1HicAzcLpmwXbTGq
TlSGWCCsugI11Eqc6+/emMAPKHH6PSpS21BW6+2mpFz1CmUF6Pfvj7RWMUaND6Zr
NQuwtQJBAKvK6GRQ59HsAwoMaKfO0T48kUme09mbHyl/iZNvFyJAjoTTTWJ/joqJ
Yj+WPWi1Jlx7NYM1akuZbeQA/ZgC1GMCQQCxpG18WqeI61Li3uVvPEheomMH2hU7
e26b7R+FQv7pZ/I69Yn1B8TE2Ru8zGOr3y8Dy1gmJDb0V/JUpWV5Il8JAkEAl2jy
doxaf4lymJq7N6e9wOWJCeafa/rppq7vtoddz+RvfFPyiH36Vpi5k5PBJdAYBsJe
e2+cS/dHkYPwTgZbKw==
-----END PRIVATE KEY-----`);
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
		const decryptedKey = crypt.decrypt(cryptedKey);
	
		console.log("our own key: " + encString);
		console.log("cipher object key: " + cipherJSON.key.toString());
		console.log("our own key again: " + decryptedKey);
	
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
