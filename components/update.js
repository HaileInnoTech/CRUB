const update = {
  template: `
  <div class="card mx-auto" style="max-width: 90%;">
      <div class="card-header">
          <h3>Update Course in Database</h3>
      </div>
      <div class="card-body">
          <table class="table table-striped  table-bordered">
              <thead>
                  <tr class="table-primary">
                      <th>Code</th>
                      <th>Description</th>
                      <th>Credit Points</th>
                      <th>Type</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="unit in paginatedUnits" :key="unit.code">
                      <th>{{ unit.code }}</th>
                      <td>{{ unit.description }}</td>
                      <td>{{ unit.credit_point }}</td>
                      <td>{{ unit.type }}</td>
                      <td>
            <button class="btn btn-warning" @click="editUnit(unit)">Update</button>
          </td>
                  </tr>
              </tbody>
          </table>

          <div v-if="editMode">

    <form @submit.prevent="putData(editedUnit.code, editedUnit.description, editedUnit.credit_point, editedUnit.type )">
    <h3>Edit  {{editedUnit.code}}</h3>
    
    <div class="form-group">
            <label for="description">Description:</label>
            <input type="text" class="form-control" id="description" v-model="editedUnit.description" required>
        </div>
        <div class="form-group">
            <label for="credit_point">Credit Points:</label>
            <input type="text" class="form-control" id="credit_point" v-model="editedUnit.credit_point"
                required>
        </div>
        <div class="form-group">
              <div class="row">
                  <legend class="col-form-label col-sm-2 pt-0">Course Type</legend>
                  <div class="col-sm-10">
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
                              v-model="editedUnit.type" value="Core">
                          <label class="form-check-label" for="gridRadios1">
                              Core
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
                              v-model="editedUnit.type" value="Software Development">
                          <label class="form-check-label" for="gridRadios2">
                              Software Development
                          </label>
                      </div>
                      <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3"
                              v-model="editedUnit.type" value="System Analysis">
                          <label class="form-check-label" for="gridRadios3">
                              System Analysis
                          </label>
                      </div>
                  </div>
              </div>
          </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
    </form>
</div>





          <div>
          <h3>Output</h3>
          <p class="alert alert-success" role="alert"  v-if="msg">  {{ msg }}</p>
          </div>
          <div class="d-flex justify-content-between">
    <div class="position-relative top-50 start-50 translate-middle my-5">
        <paginate :page-count="pageCount" :page-range="5" :margin-pages="1" :click-handler="clickCallback"
            :prev-text=" 'Prev Page'" :next-text="'Next Page'">
        </paginate>
    </div>
    <div class="position-relative top-50 start-50  my-5">Total: {{ units.length }}</div>
</div>
      </div>

  </div>
  `,
  data: function () {
    return {
      perPage: 5,
      currentPage: 1,
      units: [],
      msg: "",
      editedUnit: {},
      editMode: false,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.units.length / this.perPage);
    },
    paginatedUnits() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.units.slice(start, end);
    },
  },
  methods: {
    clickCallback(pageNum) {
      this.currentPage = pageNum;
    },

    editUnit(unit) {
      this.editedUnit = Object.assign({}, unit);
      this.editMode = true;
    },

    cancelEdit() {
      this.editMode = false;
    },
    putData: function (code, des, cp, type) {
      var putSQLApiURL = "backend/api.php/code/" + code;

      var self = this;
      // POST request using fetch with error handling
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: des,
          credit_point: cp,
          type: type,
        }),
      };

      fetch(putSQLApiURL, requestOptions)
        .then((response) => {
          //turning the response into the usable data
          return response.json();
        })
        .then((data) => {
          //This is the data you wanted to get from url
          self.msg = "Course updated successfully";
          self.editMode = false;
          self.editedUnit = {};
          setTimeout(function () {
            location.reload(); // Reload the page after 2 seconds
          }, 2000);
        })
        .catch((error) => {
          self.err = error;
        });
    },
  },

  created() {
    var self = this;
    var readSQLApiURL = "backend/api.php/"; // define URL for API with filter parameter

    // GET request using fetch with error handling
    fetch(readSQLApiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // turning the response into usable data
        return response.json();
      })
      .then((data) => {
        // This is the data you wanted to get from the URL
        self.units = data;
      })
      .catch((error) => {
        self.errorMessage = error.message;
      });
  },
};
