import axios from "axios";
import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
//import { data } from "react-router-dom";
import { toast } from "react-toastify";



// create context
const AuthContext = createContext();

// provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ loading, setLoading] = useState(true);
 

  useEffect(() => {
const verifyUser = async () => { 
  
   try{
    const token = localStorage.getItem("token");
    if(token){
       const response =  await axios.get("http://localhost:5000/api/auth/verify", {
       headers:{
        "Authorization" :`Bearer ${token}`}
       })
       console.log(response);
       if(response.data.success){
        setUser(response.data.user);
}
   }
   else{
    setUser(null);
    setLoading(false);
   }
       }
    catch(error){
      console.log(error);
        toast.error(data.message) 
        setUser(null);
    } finally{
        setLoading(false);
    }
}
verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
   
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading   }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);

