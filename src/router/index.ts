import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Sandwiches from "@/components/Sandwiches.vue";
import CartView from "@/views/CartView.vue";
import AdminView from "@/views/AdminView.vue";
import testModal from "@/components/testModal.vue";
import CustomizeItem from "@/components/CustomizeItem.vue";
import OrderLayout from "@/layouts/OrderLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: OrderLayout, name: "OrderLayout", children: [
            { path: '/', name: 'Home', component: HomeView, children: [
                    { path: '/sandwiches', name: 'Sandwiches', component: Sandwiches, children: [
                            { path: "item/:id", name: 'Order Item', component: CustomizeItem },
                        ]
                    },
                ]},
        ] },
      {
          path: "/admin", component: AdminLayout, name: 'Admin Layout', children: [
              { path: '', name: 'Admin - Home', component: AdminView }
          ]
      },
    { path: '/cart', name: 'Cart', component: CartView, children: [
        { path: "item/:id", name: 'CartItem', component: CustomizeItem },
      ]},
    //{ path: '/admin', name: 'Admin', component: AdminView, },

  ],
})

export default router
