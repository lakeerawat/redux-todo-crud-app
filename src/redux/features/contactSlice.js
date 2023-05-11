import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [
      {
        id: "4c4c1134-bd6b-47ae-8cd3-4c375bded731",
        name: "Lakee rawat",
        email: "lakee.rawat@gmail.com",
        phone: "+91767656526",
        status: "Active",
      },
      {
        id: "4c4c1134-bd6b-47ae-8cd3-4c375bded732",
        name: "Shiva Kumar",
        email: "shiva.vns@gmail.com",
        phone: "+918878446746",
        status: "Inactive",
      },
      {
        id: "4c4c1134-bd6b-47ae-8cd3-4c375bded733",
        name: "Ajay Upadhaya",
        email: "ajay07@gmail.com",
        phone: "+919768446746",
        status: "Active",
      },
      {
        id: "4c4c1134-bd6b-47ae-8cd3-4c375bded734",
        name: "diksha verma",
        email: "diksha11@gmail.com",
        phone: "+919668448710",
        status: "Inactive",
      },
      {
        id: "4c4c1134-bd6b-47ae-8cd3-5d375bded823",
        name: "sakshi verma",
        email: "sakshi72@gmail.com",
        phone: "+917205782521",
        status: "Inactive",
      },      {
        id: "4c4c1134-bd6b-47ae-8cd3-4c375bded904",
        name: "akshay mehra",
        email: "akshay009@gmail.com",
        phone: "+919532540833",
        status: "active",
      },      {
        id: "4c4c1134-bd6b-47ae-8cd3-4c375bded103",
        name: "shreya k",
        email: "k.shreya@gmail.com",
        phone: "+918299559933",
        status: "active",
      },      {
        id: "4c4c1134-bd6b-47ae-8cd3-4c375bded302",
        name: "arpit bose",
        email: "arpit@gmail.com",
        phone: "+919648338887",
        status: "Inactive",
      },      {
        id: "4c4c1134-bd6b-47ae-8cd3-4c375bdee411",
        name: "abhishek singh",
        email: "singhabhi@gmail.com",
        phone: "+917769556746",
        status: "active",
      },
      
    ],
    filter: "All",
    contact: {
      name: "",
      email: "",
      phone: "",
      status: "",
    },
  },
  reducers: {
    getContact: (state, action) => {
      state.contact = state.contacts.find((item) => item.id === action.payload);
    },
    addContact: (state, action) => {
      const newData = { ...action.payload, id: uuidv4() };
      state.contacts = [newData, ...state.contacts];
      console.log(state, "add");
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (item) => item.id !== action.payload
      );
    },
    
    updateContact: (state, action) => {
      state.contacts = state.contacts.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    setFilter: (state, action) => {
      state.filterData = action.payload;
    },
  },
});
export const {
  addContact,
  deleteContact,
  getContact,
  updateContact,
  setFilter,
} = contactSlice.actions;
export default contactSlice.reducer;
