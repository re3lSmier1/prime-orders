import './assets/main.css'
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button"
import Select from 'primevue/select';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Image from 'primevue/image';
import Dialog from 'primevue/dialog';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import Toolbar from 'primevue/toolbar';
import DynamicDialog from 'primevue/dynamicdialog';
import DialogService from 'primevue/dialogservice';



import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(DialogService);
app.component('Button', Button);
app.component('Select', Select);
app.component('Textarea', Textarea);
app.component('Card', Card);
app.component('Menu', Menu);
app.component('Avatar', Avatar);
app.component('Image', Image);
app.component('Dialog', Dialog);
app.component('Tabs', Tabs);
app.component('Tab', Tab);
app.component('TabList', TabList);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('InputNumber', InputNumber);
app.component('SelectButton', SelectButton);
app.component('Toolbar', Toolbar);
app.component('DynamicDialog', DynamicDialog);

app.mount('#app')
