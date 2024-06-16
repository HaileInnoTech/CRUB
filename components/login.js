const login = {
  emits: ["authenticated"],
  template: `
  
  <div class="row">
   <form @submit.prevent="validate" class="w-100">
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text" v-model="username" class="form-control" placeholder="Enter username">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" v-model="password" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>

</div>
  <div class="row">
  <div v-if="errors.length">
        <p class="ms-5">Please correct the following error(s)</p>
        <ul style="list-style-type: none" class="list-group" >
          <li
            v-for="(error, index) in errors"
            :key="index"
            class="alert alert-danger"
            role="alert"
          >
            {{ error }}
          </li>
        </ul>
      </div>
  </div>
    
 `,
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    validate: function (e) {
      var self = this;
      var result = true;
      this.errors = [];
      if (!this.username.trim()) {
        result = false;
        this.errors.push("Please enter the Username.");
      } else if (this.username.length < 3) {
        result = false;
        this.errors.push("Username must be at least 3 characters long");
      }

      if (!this.password) {
        result = false;
        this.errors.push("Please enter the Password.");
      } else if (this.password.length < 8) {
        result = false;
        this.errors.push("Password must be at least 8 characters long");
      }
      if (result) {
        fetch("backend/login_process_db.php", {
          method: "POST",
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              // Handle successful response from server
              response.json().then((data) => {
                if (data.success) {
                  // If the login was successful, navigate to the dashboard page
                  self.$router.push("/dashboard");
                  // Emit the authenticated event
                  self.$emit("authenticated", true); //$emit() function allows you to pass custom events up the component tree.
                } else {
                  // If the login was not successful, display an error message to the user
                  this.errors.push(data.message);
                }
              });
            } else {
              // Handle error response from server
              this.errors.push(
                "An error occurred while logging in. Please try again later."
              );
            }
          })
          .catch((error) => {
            // Handle network or other error
            this.errors.push(
              "An error occurred while logging in. Please try again later."
            );
          });
      }
    },
  },
};
