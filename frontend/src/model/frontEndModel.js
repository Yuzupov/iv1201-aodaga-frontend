export default {
  firstName: "",
  lastName: "",
  email: "",
  personalNumber: "",
  username: "",
  userPassword: "",
  confirmUserPassword: "",
  confirmationMessage: "",
  token: "",
  application: [],

  setField(props) {
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
  /*async registerUser() {
    try {
      const response = await fetch("http://localhost:4567/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          personalNumber: this.personalNumber,
          userName: this.username,
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
  */
  /*
  async loginUser() {
    try {
      const response = await fetch("http://localhost:4567/login", {
        method: "POST", // Sends data to the server and authenticate the user based on the data
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          userPassword: this.userPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }

      const data = await response.json();
      this.token = data.token; // Assume the server returns a token
      console.log("Login successful:", data);
      return data;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  },
  

  /*
  async fetchApplications() {
    try {
      const response = await fetch("http://localhost:4567/applications", {
        method: "GET", // GET is retrieve data from the server. 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch applications: ${response.statusText}`);
      }

      const data = await response.json();
      this.applications = data; 
      return data;
    } catch (error) {
      console.error("Error fetching applications:", error.message);
      throw error;
    }
  },

  */
  async registerUser() {
    const mockResponse = {
      username: this.username,
      message: "Mock account created!",
    };
    console.log("Mock response:", mockResponse);
    return mockResponse;
  },

  async loginUser() {
    // Mock response simulating a login action
	console.log("Attempting login with:", this.username, this.userPassword);
    if (this.username === "testuser" && this.userPassword === "password123") {
      const mockResponse = {
        token: "mock-jwt-token-12345",
        username: this.username,
        message: "Mock login successful!",
      };

      console.log("Mock login response:", mockResponse);
      this.token = mockResponse.token; // Save the token in the model
      return mockResponse;
    } else {
      const errorResponse = {
        error: "Invalid username or password.",
      };

      console.error("Mock login error:", errorResponse.error);
      throw new Error(errorResponse.error);
    }
  },

  async fetchApplications() {
    // Mock response simulating a list of applications
    const mockResponse = [
      { fullName: "John Doe", status: "Accepted" },
      { fullName: "Jane Smith", status: "Rejected" },
      { fullName: "Lappobajan pjöz", status: "Unhandled" },
    ];

    console.log("Mock response for applications:", mockResponse);
    return mockResponse;
  },

};
