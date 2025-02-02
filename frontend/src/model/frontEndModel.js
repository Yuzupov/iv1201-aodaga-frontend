export default {
	firstName: "",
	lastName: "",
	email: "",
	personalNumber: "",
	userName: "",
	userPassword: "",
	confirmUserPassword: "",
	confirmationMessage: "",

	setField(props){
		/*this method is intended to set the different fields such as firstName, lastName etc. through the use of a function instead of setting it raw. It will require that the presenter has a "field" and "field.value" naming convention. Otherwise the names of the variables below will need to be changed to match what is in the presenter
		i.e in the presenter the data saved from view is like:
		form={
			firstName: "",
			lastName: "",

			:
			
			confirmUserPassword: "",
		}
		*/
		console.log("in model" + props);
		for(var data in props){
			this.field[data] = props[data];
			console.log(props[data]);
		}
		console.log("after loop: " + props);	},
	/*
	async registerUser(props) {
		try{
			const response = await fetch(
				'http://localhost:4567/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'text/plain' },
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
*/
  async registerUser() {
	const mockResponse = { username: this.userName, message: "Mock account created!" };
	console.log("Mock response:", mockResponse);
	return mockResponse;
  }
  
};
