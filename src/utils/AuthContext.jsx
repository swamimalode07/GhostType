import { useContext, useState , useEffect, createContext } from "react";
import {account } from "../appwriteConfig"
import { ID } from "appwrite"
import loadingGif from "../assets/loading.gif"; 


account.get().then().catch(console.error);

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const[loading,setLoading]=useState(true);
    const [user, setUser] = useState(null);


    useEffect(() => {
        checkUserStatus();
    }, []);

    useEffect(() => {
   
    }, [user]); 
    
    

    const loginUser = async (userInfo) => {
        setLoading(true)

       

        try{
            let response = await account.createEmailPasswordSession(userInfo.email, userInfo.password)
            let accountDetails = await account.get();
            
            setUser(accountDetails)
            await account.updateSession("current");
        }catch(error){
            console.error("Login failed:", error);
        }
        setLoading(false)
        
     }

    const logoutUser =async ()=>{
        await account.deleteSession("current")
        setUser(null)
    }

    const registerUser = async (userInfo)=>{
        setLoading(true)

        try {
              let response=await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password1,
                userInfo.name
              )   
        } catch (error) {
            console.error(error)
        }
        await account.createEmailPasswordSession(userInfo.email, userInfo.password1)
            let accountDetails = await account.get();
            setUser(accountDetails)

        setLoading(false)
    }

    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get();
          
    
            setUser((prevUser) => {
       
                return accountDetails; 
            });
    
        } catch (error) {
            console.error("User is not logged in or session expired:", error);
            setUser(null);
        } finally {
          
            setLoading(false);
        }
    };
    
    const contextData={
        user,
        setUser,
        loading, 
        setLoading, 
        loginUser,
        logoutUser,
        registerUser,
        


    }

    return(
    <AuthContext.Provider value={contextData}>
        
           {loading ? (
                <div style={{
                    display: "flex",
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",  
                    width: "100vw",   
                    textAlign: "center",
                }}>
        <img src={loadingGif} alt="Loading..." style={{ width: "300px", height: "300px" }} />
        
        <div className="flex items-center mt-5 text-white">
            <span className="font-[Pavanam] text-[30px]">Ghost</span>
            <b className="font-[Pattaya] text-[30px]">Type</b>
        </div>
    </div>
) : children}

    </AuthContext.Provider>
    )
}

export const useAuth =()=>{
    const context = useContext(AuthContext);
   
    if (!context) {
    
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext