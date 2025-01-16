// const obj={
//     name:'anurag',
//     age:22,
//     address:{
//         village:'sidsar',
//         city:'jamanagar',
//         pinCode:360530
//     },
//     hobbies:['cricket','reading','vollyball'],
//     getAddress:(address)=>{return address},
//     thisKeyword:function(){return this.address}
// }
// console.log(obj.getAddress(obj.address));
// console.log(obj.thisKeyword());

// const myobj=Object.create(obj);
// myobj.fav_color='green';
// console.log(myobj);
// console.log(myobj.getAddress(obj.address));

// console.log(Object.keys(obj))
// console.log(Object.values(obj))

// for (const key in obj) {
//     console.log(obj[key])
// }

// delete obj.thisKeyword;

// console.log(obj.hasOwnProperty('thisKeyword'))

// const {name:Myname}=obj;
// console.log(Myname);

// Object.freeze(obj)

// obj.address={
//     village:'Jamjodhpur'
// }

// console.log(obj)

// const inventory = [
//     { name: "asparagus", type: "vegetables", quantity: 5 },
//     { name: "bananas", type: "fruit", quantity: 0 },
//     { name: "goat", type: "meat", quantity: 23 },
//     { name: "cherries", type: "fruit", quantity: 5 },
//     { name: "fish", type: "meat", quantity: 22 },
//   ];

//   groupBy obj
//   console.log(Object.groupBy(inventory,({type})=>{
//     return type
//   }))

//   reassign thisKeyword
//   obj.thisKeyword=()=>console.log('hello from obj thisKeyword');
//   console.log(obj);

//assign
//   Object.assign(obj,{
//     location:'jamjodhpur'
//   })

//   console.log(obj);

// entries

// for (const element of Object.entries(obj)) {
//     console.log(element[1]);
// }

// thiskeyword
// const this_arrow=()=>{
//     console.log(this);
// }
// function this_function(){
//     console.log(this);
// }
// this_arrow();
// this_function();

// fill
// let number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// // number.fill('*',2,4)
// // console.log(number);
// console.log(
//   number
//     .filter((num) => num % 2 == 0)
//     .map((ele) => ele * ele)
//     .reduce((sum, cur) => (sum += cur), 0)
// );

// let user = [
//   {
//     userId: 1,
//     id: 1,
//     title: "delectus aut autem",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 2,
//     title: "quis ut nam facilis et officia qui",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 3,
//     title: "fugiat veniam minus",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 4,
//     title: "et porro tempora",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 5,
//     title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 6,
//     title: "qui ullam ratione quibusdam voluptatem quia omnis",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 7,
//     title: "illo expedita consequatur quia in",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 8,
//     title: "quo adipisci enim quam ut ab",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 9,
//     title: "molestiae perspiciatis ipsa",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 10,
//     title: "illo est ratione doloremque quia maiores aut",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 11,
//     title: "vero rerum temporibus dolor",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 12,
//     title: "ipsa repellendus fugit nisi",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 13,
//     title: "et doloremque nulla",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 14,
//     title: "repellendus sunt dolores architecto voluptatum",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 15,
//     title: "ab voluptatum amet voluptas",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 16,
//     title: "accusamus eos facilis sint et aut voluptatem",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 17,
//     title: "quo laboriosam deleniti aut qui",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 18,
//     title: "dolorum est consequatur ea mollitia in culpa",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 19,
//     title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 20,
//     title: "ullam nobis libero sapiente ad optio sint",
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 21,
//     title: "suscipit repellat esse quibusdam voluptatem incidunt",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 22,
//     title: "distinctio vitae autem nihil ut molestias quo",
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 23,
//     title: "et itaque necessitatibus maxime molestiae qui quas velit",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 24,
//     title: "adipisci non ad dicta qui amet quaerat doloribus ea",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 25,
//     title: "voluptas quo tenetur perspiciatis explicabo natus",
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 26,
//     title: "aliquam aut quasi",
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 27,
//     title: "veritatis pariatur delectus",
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 28,
//     title: "nesciunt totam sit blanditiis sit",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 29,
//     title: "laborum aut in quam",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 30,
//     title:
//       "nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis",
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 31,
//     title: "repudiandae totam in est sint facere fuga",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 32,
//     title: "earum doloribus ea doloremque quis",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 33,
//     title: "sint sit aut vero",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 34,
//     title: "porro aut necessitatibus eaque distinctio",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 35,
//     title: "repellendus veritatis molestias dicta incidunt",
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 36,
//     title: "excepturi deleniti adipisci voluptatem et neque optio illum ad",
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 37,
//     title: "sunt cum tempora",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 38,
//     title: "totam quia non",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 39,
//     title: "doloremque quibusdam asperiores libero corrupti illum qui omnis",
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 40,
//     title: "totam atque quo nesciunt",
//     completed: true,
//   },
//   {
//     userId: 3,
//     id: 41,
//     title:
//       "aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit",
//     completed: false,
//   },
//   {
//     userId: 3,
//     id: 42,
//     title: "rerum perferendis error quia ut eveniet",
//     completed: false,
//   },
//   {
//     userId: 3,
//     id: 43,
//     title: "tempore ut sint quis recusandae",
//     completed: true,
//   },
//   {
//     userId: 3,
//     id: 44,
//     title: "cum debitis quis accusamus doloremque ipsa natus sapiente omnis",
//     completed: true,
//   },
//   {
//     userId: 3,
//     id: 45,
//     title: "velit soluta adipisci molestias reiciendis harum",
//     completed: false,
//   },
//   {
//     userId: 3,
//     id: 46,
//     title: "vel voluptatem repellat nihil placeat corporis",
//     completed: false,
//   },
//   {
//     userId: 3,
//     id: 47,
//     title: "nam qui rerum fugiat accusamus",
//     completed: false,
//   },
//   {
//     userId: 3,
//     id: 48,
//     title: "sit reprehenderit omnis quia",
//     completed: false,
//   },
// ];

// length
// console.log(user.length);

// at
// console.log(user.at(3))
// console.log(user.at(-1))

// //for
// for (let i = 0; i < user.length; i++) {
//   const element = user[i];
//   console.log(element);
// }

//for each
// user.forEach((element) => {
//   if (element.id == 3) console.log(element);
// });

//for in
// for (const key in user) {
//   console.log(key+user[key]);
// }

// for of
// for (const element of user) {
//   console.log(element);
// }

// map
// console.log(
//   user.map((user_obj, index) => user_obj).filter((user_obj) => user_obj.id == 3)
// );

//push
// user.push(
//   { userId: 1, id: 49, title: 'fugiat veniam minus', completed: false }
// )
// console.log(user);

// pop
// user.pop();
// console.log(user);

// shift
// console.log(user.shift());

// user.unshift({
//   userId: 3,
//   id: 51,
//   title: "nam qui rerum fugiat accusamus",
//   completed: false,
// });
// console.log(user.length);

// console.log(user.splice(0,5,{userId:1}));
// console.log(user.length);

//some
// const number=[10,20,30,40];
// console.log(number.some((num)=>num>40));

// const ex_obj = {
//   userId: 3,
//   id: 44,
//   title: "cum debitis quis accusamus doloremque ipsa natus sapiente omnis",
//   completed: true,
// };

// find and findindex
// console.log(user.findIndex((obj)=>obj.title===ex_obj.title ));

// includes
// console.log(
//   user.includes({
//     userId: 3,
//     id: 44,
//     title: "cum debitis quis accusamus doloremque ipsa natus sapiente omnis",
//     completed: true,
//   })
// );

// sort
// const a = [2, 5, 1, 9, 0, 5];
// const months = ["March", "Jan", "Feb", "Dec"];
// console.log(a.sort());
// console.log(months.sort((a, b) => a - b));

// const items = [
//   { name: "Edward", value: 21 },
//   { name: "Sharpe", value: 37 },
//   { name: "And", value: 45 },
//   { name: "The", value: -12 },
//   { name: "Magnetic", value: 13 },
//   { name: "Zeros", value: 37 },
// ];

// console.log(
//   items.sort((a, b) => {
//     const aname = a.name.toUpperCase();
//     const bname = b.name.toUpperCase();

//     if (aname < bname) {
//         return -1;
//       }
//     if (aname > bname) {
//       return 1;
//     }
    
//     return 0;
//   })
// );

//find
// console.log(a.find((value)=>value==60));

// console.log(items.find((item)=>item.name=='Zeros'));

// console.log(items.find((item)=>item.value>40));

// console.log(
//   user
//     .map((obj) => {
//       return obj;
//     })
//     .filter((obj) => {
//       return obj.title == "sit reprehenderit omnis quia";
//     })
// );

// const user_temp=user.slice(-1);
// console.log(user_temp);

// const twoDarray=[[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// const oneDarray1=[10,11,12];
// const oneDarray2=[13,14,15];
// // console.log(twoDarray.map((ele)=> console.log(ele)));
// // oneDarray1.push(oneDarray2)
// twoDarray[1][0]=1;
// console.log(new Set(twoDarray.flat(Infinity)));

// oneDarray1.push(...oneDarray1,...oneDarray2)
// // console.log(oneDarray1);

// const obj1={
//   name:'anurag',
//   age:22
// }

// rest and spread operator
// function sum(...args) {
//   let sum1=0;
//   // console.log(args);

//   for (const key of args) {
//     sum1+=key
//   }
//   return sum1;
// }
// console.log(sum(1,2,3,4,5,6,7,8,9));
// console.log(a);
// const a=10;
// function customError(message) {
//   this.message=message,
//   this.name='customError',
//   this.stack=`${this.name} : ${this.message}`
// }

// try {
//   throw new customError("messge from customError")
//   // console.log('hello');
// } catch (error) {
//   console.table(error);
//   console.warn(error.message);
//   console.error(error.message);
// }
// finally{
// console.log('finnally all time execute');
// }

// promise
// const a = new Promise((resolve, reject) => {
//   setTimeout(()=>{
//     resolve('in setimeout')
//   },5000)
//   // reject('promise reject')
// });
// async function async1() {
//   console.log("function start");

//   await a.then((data)=>console.log(data)).catch((err)=>console.log(err));
//   console.log(" function end");
// }
// async1();

// const cart = ["cup", "pen", "book", "micropbohe", "phone"];

// const validateCart = (item) => {
//   return cart.some((element) => element === item);
//   // return false;
// };
// const getPromise = (item) => {
//   const promise = new Promise((res, rej) => {
//     // console.log(validateCart(item));
//     if (validateCart(item)) res("proceseed to payment");
//     else rej("please selecct valid item");
//   });
//   return promise;
// };
// getPromise("cup")
//   .then((data) => {
//     return data;
//   })
//   .then((data) => data? console.log('paymeny sucessfull'):console.log('please proceseed to payment'))
//   .catch((err) => console.log(err));

// eventhandilng

//closures
// function a1() {
//     let a=10;
//     function b1(name) {
//         // console.log('hello'+name);
//        var a=20;
//         function c1(sarname) {
//             console.log(name + sarname);
//             return a;
//         }
//         return c1;
//     }
//     return b1;
// }
// console.log(a);

// const c=a1()('anurag')('dalsaniya');
// console.log(c);

// localStorage.setItem('todo',JSON.stringify(items))

// console.log(JSON.parse(localStorage.getItem('todo')));

