
 import { initializeApp } from 'firebase/app';
 import { getAuth,signOut,sendEmailVerification  } from "firebase/auth";
 import firebaseConfig from './firebase.config';
 import {signInWithPopup,updateProfile ,GoogleAuthProvider,createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
 import { useContext, useState } from 'react';
 import { useNavigate } from "react-router-dom";

 import { FacebookAuthProvider } from "firebase/auth";

import { userContext } from '../../App';
import { useLocation } from 'react-router';
 
 
 
 function LogIn() {

  const [loggedIn,setloggedIn]= useContext(userContext);

   const app = initializeApp(firebaseConfig);
   const provider = new GoogleAuthProvider();
   const fbprovider = new FacebookAuthProvider();
   const auth = getAuth(app);
    const [newUser, setnewUser] = useState(false);
   const [user, setUser] = useState({
     isSignedIn: false,
     name:'',
     email: '',
     password: '',
     photo: ''
 
   });


   const location= useLocation();
   const navigate = useNavigate ();
   const {from} = location.state || {from:{pathname:'/'}};
  

   const handleClick =()=>{
     signInWithPopup(auth, provider)
     .then((res) => {
       const {displayName,photoURL, email}= res.user;
       const isSignedInUser ={
         isSignedIn:true,
         name:displayName,
         email:email,
         photo:photoURL
       }
 
       setUser(isSignedInUser);
       console.log(displayName,photoURL, email);
 
     // const credential = GoogleAuthProvider.credentialFromResult(res);
     // const token = credential.accessToken;
     // // The signed-in user info.
     // const user = result.user;
 
     })
     .catch(err =>{
       console.log(err);
       console.log(err.message);
     })
   }
 
   const handleSignOut =()=>{
    
    signOut(auth).then((res) => {
     const signOut = {
       isSignedIn : false,
       newUser:'',
       name : '',
       photo : '',
       email : '',
       error: '',
       success: ''
     }
 
     setUser(signOut);
     
   }).catch((error) => {
     
   });
   }
 
   const handleSIgnIn=()=>{
     signInWithPopup(auth, fbprovider)
   .then((result) => {
     // The signed-in user info.
     const user = result.user;
 
     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
     const credential = FacebookAuthProvider.credentialFromResult(result);
     const accessToken = credential.accessToken;
     console.log("after sign in",user);
     // ...
   })
   .catch((error) => {
     // Handle Errors here.
     const errorCode = error.code;
     const errorMessage = error.message;
     // The email of the user's account used.
     const email = error.customData.email;
     // The AuthCredential type that was used.
     const credential = FacebookAuthProvider.credentialFromError(error);
 
     // ...
   });
   }
 
   const handleChange =(event)=> {
    let IsformValid = true;
     if( event.target.name === 'email' ) {
       IsformValid = /\S+@\S+\.\S+/.test(event.target.value);
       console.log(IsformValid);
       
 
     }
     if( event.target.name === 'password' ) {
 
       const isPasswordValid = event.target.value.length > 6;
 
       const re = /\d{1}/.test(event.target.value);
 
       IsformValid=(isPasswordValid && re);
 
       
 
     }
     if(IsformValid){
 
       const newUserInfo = {...user};
 
       newUserInfo[event.target.name] = event.target.value;
       setUser(newUserInfo);
 
     }
 
     
   }
 
   const handleSubmit=(e)=>{
      if( newUser && user.email && user.password){
     createUserWithEmailAndPassword(auth, user.email, user.password)
     .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
       const newUserInfo = {...user};
       newUserInfo.error = '';
       newUserInfo.success= true;
       setUser(newUserInfo);
       updateUserName(user.name);
       varifyEmail();
       
   })
   .catch((error) => {
     const newUserInfo = {...user};
     newUserInfo.error = error.message;
     newUserInfo.success=false;
     setUser(newUserInfo);
 
   
   
   });
 
 
      }
 
      if( !newUser && user.email && user.password){
       signInWithEmailAndPassword(auth, user.email, user.password)
   .then((userCredential) => {
     // Signed in 
     const user = userCredential.user;
     const newUserInfo = {...user};
       newUserInfo.error = '';
       newUserInfo.success= true;
       setUser(newUserInfo);
       setloggedIn(newUserInfo);
       navigate(from);
      //  navigation(from);
       console.log("sign in user info", userCredential.user);
 
     // ...
   })
   .catch((error) => {
     const newUserInfo = {...user};
     newUserInfo.error = error.message;
     newUserInfo.success=false;
     setUser(newUserInfo);
   });
 
      }
 
      e.preventDefault();
   }
 
   const updateUserName =(name)=>{
 
     updateProfile(auth.currentUser, {
       displayName: name
     }).then(() => {
       // Profile updated!
       
       console.log("name updated");
     }).catch((error) => {
       // An error occurred
       // ...
       console.log(error);
     });
 
   }

 
const varifyEmail=() => {
  
  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });

}
   

 
   
   return (
     <div  style={{textAlign:'center'}}>
        {
         user.isSignedIn ?  <button onClick={handleSignOut}>Sign out</button>:
         <button onClick={handleClick}>Sign in</button>
       }
       <br></br>
 
       <button onClick={handleSIgnIn}>Log In Using facebook</button>
       <h1>Our Own Authentication</h1>
       <form onSubmit={handleSubmit}>
 
         <input type="checkbox" onChange={()=> setnewUser(!newUser)} name="newUser" id=""/>
         <label htmlFor="newUser"> New user Sign Up</label>
         <br></br>
 
         {
           newUser && <input type="text" name="name" onBlur={handleChange}  placeholder='Your name'/>
         }
         
         <br></br>
       <input onBlur={handleChange} type="text" name='email' required/>
       <br></br>
       <input  onBlur={handleChange} type="password" name='password'  required/>
       <br></br>
       <input type="submit" value={ newUser ? 'sign up' : 'sign in'}/>
 
       </form>
       <p style={{color:'red'}}>{user.error}</p>
       {
         user.success && <p style={{color:'green'}}>User {newUser ? 'created': 'Logged In'} Successfully</p>
       }
       
       {
         user.isSignedIn && <div>
            <p>welcome {user.name}</p>
            <p>Your Email: {user.email}</p>
            <img src={user.photo} alt=""></img> 
         </div>
       }
     </div>
   );
 }
 
 export default LogIn;
 