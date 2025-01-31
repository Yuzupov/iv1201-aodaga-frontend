export default {
	firstName: "",
	lastName: "",
	email: "",
	personalNumber: "",
	userName: "",
	userPassword: "",
	confirmUserPassword: "",

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
}
