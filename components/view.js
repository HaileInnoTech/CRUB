const view = {
  template: `
    <div class="card mx-auto" style="max-width: 90%;">
        <div class="card-header">
            <h3>List of Courses in Database</h3>
        </div>
        <div class="card-body">
            <table class="table table-striped  table-bordered">
                <thead>
                    <tr class="table-primary">
                        <th>Code</th>
                        <th>Description</th>
                        <th>Credit Points</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in paginatedUnits" :key="unit.code">
                        <th>{{ unit.code }}</th>
                        <td>{{ unit.description }}</td>
                        <td>{{ unit.credit_point }}</td>
                        <td>{{ unit.type }}</td>
                    </tr>
                </tbody>
            </table>
           
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
