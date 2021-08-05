import { configureStore } from "@reduxjs/toolkit";
import contacts from "./features/contacts";

export default configureStore({
    reducer:{
        contact:contacts
    
}});