// Import the functions you need from the SDKs you need




import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase,ref,push,onValue,update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI0D2RmVJtFTe-5GWLJAgDYeqmEqQh38M",
  authDomain: "playground-b4b30.firebaseapp.com",
  databaseURL: "https://playground-b4b30-default-rtdb.firebaseio.com",
  projectId: "playground-b4b30",
  storageBucket: "playground-b4b30.appspot.com",
  messagingSenderId: "430875393266",
  appId: "1:430875393266:web:5ec90e359aa96fd095246b"
};


//Initialize Firebase
 const app = initializeApp(firebaseConfig);
console.log("app",app)
const database=getDatabase(app)

const commentDb=ref(database,"comments")
console.log("db",commentDb)
 const commentEl=document.getElementById('commentarea')
 const publishEl=document.getElementById('publishcmnts')
 const dsplyEl=document.getElementById('displaycmnts')
 const frm=document.getElementById('from-input')
 const toUser=document.getElementById('to-input')
 
 console.log(app)
 publishEl.addEventListener("click",function(){
    let inputVal=commentEl.value
    let frmVal=frm.value
    let toVal=toUser.value
     if(inputVal.length>0){
        console.log(inputVal)
        commentEl.value=""
        frm.value=""
        toUser.value=""
        dsplyEl.textContent=""
        pushComments(inputVal,frmVal,toVal)
     }
})

function pushComments(input,f1,t1){
    const commentDat={
        from:f1,
        to:t1,
        comment:input,
        likes:0
    }
  push(commentDb,commentDat)
}

onValue(commentDb,(snapshot)=>{
    let cntsV=Object.entries(snapshot.val()).map(([key,value])=>({key,...value}))
    console.log(cntsV)
    dsplyEl.innerHTML = ""; 
 for(let i=cntsV.length-1;i>=(cntsV.length-4);i--){
   dsplyEl.innerHTML+=` <div class="endorsement">
   <p><strong>To ~ ${cntsV[i].to}</strong></p>
   <p>${cntsV[i].comment}</p>
   <p>~ by ${cntsV[i].from}</p>
   <p class="heart" data-id="${cntsV[i].key}">❤️ ${cntsV[i].likes}</p>
 </div>`
 }

 const heartClick=document.querySelectorAll('.heart')
 heartClick.forEach(heartClicks=>{
 heartClicks.addEventListener("click",function(){
    const heartId=heartClicks.getAttribute("data-id")
    console.log("heart clicked"+heartId)
    const ref2=ref(database,`comments/${heartId}`)
    const currentLikes = parseInt(heartClicks.textContent.split(' ')[1], 10);
    update(ref2,{likes: currentLikes+1}).then(()=>{
        heartClicks.textContent=""
heartClicks.textContent=`❤️  ${currentLikes +1}`
    })
    

})
})

})