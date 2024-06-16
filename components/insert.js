const insert = {
  template: `<div class="card mx-auto" style="max-width: 90%;">
  <div class="card-header">
      <h3>Insert Course in Database</h3>
  </div>
  <div class="card-body">
        <form @submit.prevent="postData(code, description, credit_point, type)">
              <div class="form-group">
              <label for="code">Course Code</label>
              <input type="text" class="form-control" v-model="code" placeholder="Enter code" required>
          </div>

          <div class="form-group">
              <label for="description">Course Description</label>
              <input type="text" class="form-control" v-model="description" placeholder="Enter description" required>
          </div>

          <div class="form-group">
              <label for="credit-point">Credit Point</label>
              <input type="text" class="form-control" v-model="credit_point" placeholder="Enter code" required>
          </div>

          <div class="form-group">
              <div class="row">
                  <legend class="col-form-label col-sm-2 pt-0">Course Type</legend>
                  <div class="col-sm-10">
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
                              v-model="type" value="Core">
                          <label class="form-check-label" for="gridRadios1">
                              Core
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
                              v-model="type" value="Software Development">
                          <label class="form-check-label" for="gridRadios2">
                              Software Development
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3"
                              v-model="type" value="System Analysis">
                          <label class="form-check-label" for="gridRadios3">
                              System Analysis
                          </label>
                      </div>
                  </div>
              </div>
          </div>
          <button class="btn btn-primary">Add</button>
      </form>
      <div>
          <h3>Output</h3>
          <p class="alert alert-success" role="alert" v-if="msg">  {{ msg }}</p>
         
      </div>



  </div>
</div>`,
  data: function () {
    return {
      code: "",
      description: "",
      credit_point: "",
      type: "",
      msg: "",
    };
  },
  methods: {
    postData: function (code, des, cp, type) {
      //define url for api
      var postSQLApiURL = "backend/api.php/";

      var self = this;
      // POST request using fetch with error handling
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          description: des,
          credit_point: cp,
          type: type,
        }),
      };

      fetch(postSQLApiURL, requestOptions)
        .then((response) => {
          //turning the response into the usable data
          return response.json();
        })
        .then((data) => {
          //This is the data you wanted to get from url
          self.msg = "Data Inserted Successfully.";
        })
        .catch((error) => {
          self.msg = "There was an error!" + error;
        });
    },
  },
};
