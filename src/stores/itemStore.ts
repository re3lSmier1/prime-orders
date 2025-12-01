import {defineStore} from "pinia";
import data from "../database/items.json"
//import cart from "../database/cart.json"
import axios from 'axios';

import {ref} from "vue";
export const useItemStore = defineStore('items', {
    state: () => ({
        database: ref([]),
        dialogStatus: false,
        currentItem: ref({}),
        businessCategories: ref([]),
        itemsList: ref([]),
        currentIngredients: ref([]),
        cart: ref([]),
        currentItemTotal: ref(0),
        ingredientTypes: ref([]),
        ingredientChoices: ref([])
    }),
    getters: {

        totalItemCost: (state) => () => {
            state.currentItemTotal = 0
            for(let i = state.currentItem.ingredients.length - 1; i >= 0; i--){
                if(state.currentItem.ingredients[i].typeId === 1){
                    state.currentItemTotal = parseInt(state.currentItem.ingredients[i].choices.currentValue) *
                        parseInt(state.currentItem.ingredients[i].ingredientPrice)
                }
                if(state.currentItem.ingredients[i].typeId === 2){
                    console.log(state.currentItem.ingredients[i].increment.price * state.currentItem.ingredients[i].increment.currentValue)
                    state.currentItemTotal += state.currentItem.ingredients[i].increment.price
                }
                state.currentItemTotal += state.currentItem.basePrice
            }

        },
        getCurrentIngredientType: (state) => (id: any) => {
            console.log(state.ingredientTypes)
            return state.ingredientTypes.find(item => item.Id === id);
        }
    },
    actions: {
        getItems(id: any){
            axios.get(`https://localhost:7151/Item/GetItemByBusiness?id=1`) // Replace with the actual path to your JSON file
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
        getItem( Id: any){
            axios.get(`https://localhost:7151/Item/GetItemDetail?itemId=${Id}`)
                .then(response => {
                    this.currentItem = response.data;
                    console.log(response.data);
                })
        },
        getBusinessCategories(){
            axios.get(`https://localhost:7151/Business/GetBusinessCategories`)
                .then(response => {
                    this.businessCategories = response.data;
                    console.log(response.data);
                })
        },
        getItemsByCategories(categoryId: any, businessId: any){
            axios.get(`https://localhost:7151/Item/GetItemsByCategory?categoryId=${categoryId}&businessId=${businessId}`)
                .then(response => {
                    this.database = response.data;
                    console.log(response.data);
                })
        },
        getCurrentIngredients(id: any){
            axios.get(`http://localhost:5175/Ingredient/GetIngredientsByItem?id=${id}`)
                .then(response => {
                    this.currentIngredients = response.data;
                })
        },
        getIngredientTypes(){
            axios.get(`http://localhost:5175/Ingredient/GetAllIngredientTypes`).
                then(response => {
                    this.ingredientTypes = response.data;
            })
        },
        getIngredientChoicesByIngredientId(id: any){
            axios.get(`http://localhost:5175/IngredientChoice/GetIngredientChoicesForIngredient?id=${id}`)
                .then(response => {
                    this.ingredientChoices = response.data;
                })
        },
        pushToCart(item: any, total: number) {
            item["totalCost"] = total
            this.cart.push(item)
            this.currentItem = {}
        },
        showSelectItem(item: any) {
            this.currentItem = {}
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