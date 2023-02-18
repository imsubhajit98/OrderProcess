let orderedItems = document.getElementById('orederedBurgerList');
orderedItems.innerHTML = '';

let orderStatus = document.getElementById('order_Recieved_Msg');
orderStatus.innerHTML = '';

let paymentStatus = document.getElementById('payment_Status_Msg');
paymentStatus.innerHTML = '';

let unOrderedList = document.getElementById('burgerList');
unOrderedList.innerHTML = '';

let thnksMsg = document.getElementById('thnks_Msg');
thnksMsg.innerHTML = '';

let imageList=document.getElementById('imageList');


// Get menu function
function getMenu(){
    return new Promise((resolve, reject) => {
        console.log(`Function-1. Menu will be displayed on webpage shortly....(time required for fetching data)`);
        fetch("https://free-food-menus-api-production.up.railway.app/burgers").then((response)=> response.json()).then((data)=>{
            let menu = [];
            for (const menuName of data) {
                menu.push(menuName.name);
                unOrderedList.innerHTML+=
                    `<div id="card" class="card border border-dark border-2 border-opacity-25" style="width: 20rem;height:28rem;">
                        <img src="${menuName.img}" class="card-img-top" alt="">
                        <div class="card-body" id="card-body">
                            <b style="color:red ">${menuName.name}</b> <br>
                            <p class="card-text">Country: ${menuName.country}</p>
                            <p class="card-text">Price: ${menuName.price}</p>
                        </div>
                    </div>`
            }
            console.log(data)
            resolve(menu);
        })
    });
}


//take order function
function takeOrder(data1){
    let burg1Index = Math.floor(Math.random()*57);
        let burg2Index = burg1Index + 1;
        let burg3Index = burg1Index + 2;
        let burg1 = data1[burg1Index];
        let burg2 = data1[burg2Index];
        let burg3 = data1[burg3Index];
        let obj = {item1: `${burg1}`, item2: `${burg2}`, item3: `${burg3}`};
    return new Promise((resolve,reject)=>{
        console.log("Function-2. User ordered following burgers(2500 ms delay)");
        setTimeout(()=>{
                console.log(`item 1: ${burg1} \nitem 2: ${burg2} \nitem 3: ${burg3}`);
                document.getElementById('menu').classList.add('hide');
                orderedItems.innerHTML += `
                <li>Burger1: ${burg1}</li>
                <li>Burger2: ${burg2}</li>
                <li>Burger3: ${burg3}</li>
                `
                resolve(obj)
            }, 2500)
        })
}


//order preparation function
function orderPrep(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            orderStatus.innerHTML += `Guys items are added in your cart...`
            paymentStatus.innerHTML += `<h4 style="color:red;">Please do payment to proceed further...</h4>`
            console.log(`Function-3. Order is recieved, payment is in processing...(1500 ms dealay)`);
            console.log({order_status:true, paid:false});
            resolve({order_status:true, paid:false})
        },1500)
    })
}



// pay order function
function payOrder(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            paymentStatus.innerHTML = `<h4 style="color:green;">Payment Recieved...</h4>`
            console.log(`Function-4. Payment recieved, Order is confirmed & will be delivered in short time...(1000 ms delay)`);
            console.log({order_status:true, paid:true});
            resolve({order_status:true, paid:true})
        },1000)
    })
}


//thank you function
function  thankyouFnc(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Function-5. Order delievered. Visit Again, Thanks!!!');
            resolve(alert('Order delievered. Visit Again, Thanks!!!'))
        },1500)
    })
}



//Promise chaining
getMenu()
    .then((data1) => takeOrder(data1))
    .then(() => orderPrep())
    .then(() => payOrder())
    .then(() => thankyouFnc())
    .catch((e) => {
        console.log("ERROR>>>", e);
      });
