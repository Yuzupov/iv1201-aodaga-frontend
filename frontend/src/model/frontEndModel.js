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
		this[props.field] = props.field.value;
	},
	async registerUser() {
		try {
		  const response = await fetch("http://localhost:4567/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
			  firstName: this.firstName,
			  lastName: this.lastName,
			  email: this.email,
			  personalNumber: this.personalNumber,
			  userName: this.userName,
			  userPassword: this.userPassword,
			  confirmUserPassword: this.confirmUserPassword,
			}),
		  });
	
		  if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		  }
	
		  const data = await response.json();
		  console.log(`Returned: ${data}`);
		  return data;
		} catch (error) {
		  console.error(`Error when registering: ${error}`);
		  throw error;
		}
	  },
	};