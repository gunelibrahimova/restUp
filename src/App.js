import {
  useEffect,
  useState
} from 'react';
import './App.css';
import Login from './components/Login/Login';
import SideBar from './components/SideBar/SideBar';
import {
  auth
} from './config/firebase';
import MyRouter from './router/MyRouter';

function App() {

  const [user, setUser] = useState(null)
  const [bool, setBool] = useState(true)


  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        const user = {
          uid: userAuth.uid,
          email: userAuth.email
        }
        if (userAuth) {
          console.log('userAuth', userAuth)
          setUser(user)
        } else {
          setUser(null)
        }
      })
      return unsubscribe 
  }, [])




  return ( 
    <div className = "App" >

    {
      user ? <div className='container-fluid'>
      <div className="row">
        <div className="col-lg-3 p-0">
          <SideBar />
        </div>
        <div className="col-lg-9">
          <MyRouter /> 
        </div>
      </div>
    </div> : <Login/>
    }


    </div>
  );
}

export default App;