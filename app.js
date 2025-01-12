const mongoose = require("mongoose")
require("dotenv").config()


const prompt = require('prompt-sync')();
// const username = prompt('What is your name?');
// console.log(`Your name is ${username}`);
// console.log(`welcome ${username}`);

const Customer = require("./model/customer")

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to DATABASE")})
.catch(()=>{console.log("ERROR CONNECTING TO DB")})



const menu = async ()=>{
    displayMenu();
    const option = prompt("choose from 1 to 5")

    switch (option) {
        case '1':
            await createCustomer();
            break;
        
        case '2':
            await viewCustomer();
            break;

        case '3':
            await updateCustomer();
            break;

        case '4':
            await deleteCustomer();
            break;

        case '5':
            console.log("exiting menu")
            process.exit();

        default: 
            console.log("error try again")
    }
}

const displayMenu = () =>{
    console.log("what do you want to do")
    console.log("1. create a customer")
    console.log("2. view customer")
    console.log("3. update customer")
    console.log("4. delete customer")
    console.log("5. quit")
}

const createCustomer = async ()=> {
    const name = prompt("Enter the customer name:")
    const age = prompt("enter their age:")

    const newCustomer = new Customer({name, age})

    try{
        await newCustomer.save();
        console.log("created")
    } catch {
        console.log("error")
    }
}

const viewCustomer = async ()=>{
    const name = prompt("enter the customer name")
    const customer = await Customer.find({name:name})
    console.log(customer)
}


const updateCustomer = async ()=>{
    const id = prompt("enter cutsomer id")
    const newName = prompt("enter customer new name")
    const newAge = prompt("enter the customers new age")
    
    const newCustomer = await Customer.findByIdAndUpdate(id, {name:newName, age:newAge}, {new:true})
    console.log(newCustomer)
}

const deleteCustomer = async ()=>{
    const id = prompt("enter customer id")
    
    const deleteCustomer = await Customer.findByIdAndDelete(id)
}

menu()


