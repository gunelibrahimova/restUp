import {
  useEffect,
  useState
} from 'react';
import { ClipLoader } from 'react-spinners';
import './App.scss';
import Login from './components/Login/Login';
import SideBar from './components/SideBar/SideBar';
import {
  auth
} from './config/firebase';
import MyRouter from './router/MyRouter';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth == null) {
        setLoading(true)
      }
      else{
         if (userAuth != null) {
        console.log('userAuth', userAuth)
        const user = {
          uid: userAuth.uid,
          email: userAuth.email
        }
        setUser(user)
      } else {
        setUser(null)
      }
      }
     
    })
   
    return unsubscribe
     
  }, [])


  return ( 
    <div id = "App" >

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
    </div> : loading ? <ClipLoader
        className='sipnner'
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> :  <Login/>
    }
    </div>
  );
}

export default App;