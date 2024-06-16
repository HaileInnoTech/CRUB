const dashboard = {
  template: `
  <div class="container" id="dashboard">
    <div class="card mt-5">
      <div class="card-header">
        <h1 class="font-weight-bold display-3 text-center">Dashboard</h1>
        
      </div>
      <div class="card-body">
      <ul class="nav nav-tabs d-flex justify-content-around">
      <li class="nav-item" v-for="(item, index) in items" :key="index">
        <a href="#" class="nav-link" :class="{ active: tab === index }" @click.prevent="tab = index">{{ item }}</a>
      </li>
        </ul>
        <div class="tab-content mt-3">
          <div class="tab-pane fade show" :class="{ active: tab === 0 }">
                <app-view v-if="tab === 0"></app-view>
          </div>
          <div class="tab-pane fade show" :class="{ active: tab === 1 }">
                <app-insert v-if="tab === 1"></app-insert>
          </div>
          <div class="tab-pane fade show" :class="{ active: tab === 2 }">
          <app-update v-if="tab === 2"></app-update>
          </div>
          <div class="tab-pane fade show" :class="{ active: tab === 3 }">
          <app-delete v-if="tab === 3"></app-delete>
          </div>
          
        </div>
      </div>
    </div>
  </div>
    `,
  data: function () {
    return {
      tab: 0,
      items: ["View", "Insert", "Update", "Delete"],
    };
  },
};
