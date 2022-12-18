import {
  useEffect,
  useState
} from 'react';
import { ClipLoader } from 'react-spinners';
import './App.css';
import Login from './components/Login/Login';
import SideBar from './components/SideBar/SideBar';
import {
  auth
} from './config/firebase';
import MyRouter from './router/MyRouter';

const override: CSSProperties = {
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
      })
      setLoading(false)
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
    </div> : loading ? <ClipLoader
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