const delete_course = {
  template: `
    <div class="card mx-auto" style="max-width: 90%;">
        <div class="card-header">
            <h3>Delete Course in Database</h3>
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
              <button @click="delData(unit.code)" class="btn btn-danger">Delete</button>
            </td>
                    </tr>
                </tbody>
            </table>
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

    delData: function (code) {
      var delSQLApiURL = "backend/api.php/code/" + code;

      var self = this;
      // DELETE request using fetch with error handling
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      };

      fetch(delSQLApiURL, requestOptions)
        .then((response) => {
          //turning the response into the usable data
          return response.json();
        })
        .then((data) => {
          //This is the data you wanted to get from url
          self.msg = "Data deleted Successfully";

          setTimeout(function () {
            location.reload(); // Reload the page after 2 seconds
          }, 2000);
        })
        .catch((error) => {
          self.msg = "There was an error!";
          self.statusText = error;
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
