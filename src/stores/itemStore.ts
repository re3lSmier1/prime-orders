import {defineStore} from "pinia";
import data from "../database/items.json"
//import cart from "../database/cart.json"
import axios from 'axios';

import {ref} from "vue";
export const useItemStore = defineStore('items', {
    state: () => ({
        database: ref([]),
        dialogStatus: false,
        currentItem: ref({

        }),
        cart: ref([]),
        currentItemTotal: ref(0),
    }),
    getters: {
        //doubleCount: (state) => state.count * 2,
        totalItemCost: (state) => () =>{
            //let total = ref(0);
            for(var i = state.currentItem.customize.length - 1; i >= 0; i--){
                //console.log(state.currentItem.customize[i].ingredientType)
                if(state.currentItem.customize[i].ingredientType === 1){
                    state.currentItemTotal = parseInt(state.currentItem.customize[i].currentValue) *
                        parseInt(state.currentItem.customize[i].ingredientPrice)

                }
                if(state.currentItem.customize[i].ingredientType === 2){
                    state.currentItemTotal += state.currentItem.customize[i].currentValue.ingredientPrice
                }
                state.currentItemTotal += state.currentItem.basePrice
            }
            //console.log(total)
            //return total;
            //console.log(item)
        }
    },
    actions: {
        getItems(){
            axios.get('/items.json') // Replace with the actual path to your JSON file
                .then(response => {
                    // The JSON data is automatically parsed by Axios and available in response.data
                    console.log(response.data);
                    this.database = response.data;
                    // You can now use response.data to manipulate or display the fetched information
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        pushToCart(item: any, total: number) {
            item["totalCost"] = total
            this.cart.push(item)
            this.currentItem = {}
        },
        showSelectItem(item: any) {
            this.dialogStatus = true
            this.currentItem = item

        },
        deleteFromCart(item: any) {
            this.cart.splice(this.cart.indexOf(item), 1)
            for(var i = this.database.length - 1; i >= 0; i--) {
                if(this.database[i].id === item.id) {
                    this.database.splice(i, 1);
                }
            }
        },
        getTotalItemCost() {

            return this.currentItem.basePrice
        }
    },
})