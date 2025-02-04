export default {
	field: {
	firstName: "",
	lastName: "",
	email: "",
	personalNumber: "",
	userName: "",
	userPassword: "",
	confirmUserPassword: "",
	confirmationMessage: "",
	},
	/**
	 * @function 
	 * @name setField
	 * @param {object} props 
	 * Data user information from the registration form 
	 * @returns nothing
	 */
	setField(props){
		for(var data in props){
			this.field[data] = props[data];
			console.log(props[data]);
		}
		console.log("after loop: " + props);
	},
	/**
	 * @function
	 * @name registerUser 
	 * @returns {object} Confirmation or Error message from backend. 
	 */
	async registerUser() {
		try{
			const response = await fetch(
				'http://localhost:4567/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						firstName: this.field.firstName, 
						lastName: this.field.lastName, 
						email: this.field.email, 
						personalNumber: this.field.personalNumber,
						userName: this.field.userName, 
						userPassword: this.field.userPassword, 
						confirmUserPassword: this.field.confirmUserPassword, 

					}),
				}
			);
			if(!response.ok){
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response;
			console.log(`Returned: ${data}`);
			return data;
		} catch (error) {
			console.error(`Error when registering: ${error}`);
			throw error;
		}
	},
};
