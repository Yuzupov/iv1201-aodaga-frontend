export default {
	firstName: "",
	lastName: "",
	email: "",
	personalNumber: "",
	userName: "",
	userPassword: "",
	confirmUserPassword: "",
  
	setField(props) {
	  this[props.field] = props.value;
	  console.log(`Set ${props.field} to ${props.value}`); // For debugging
	},
  
	createUser(onSuccess, onError) {
	  // Simulate success if all required fields are filled
	  if (this.firstName && this.userName && this.email) {
		onSuccess({ username: this.userName });
	  } else {
		onError("Missing required fields: firstName, userName, or email.");
	  }
	},
  };
  