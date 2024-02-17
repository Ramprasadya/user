import React, { useEffect, useState } from "react";
import notFound from "./assets/not-found.png";
import load from "./assets/load.gif";
const User = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(null)
  const [error, setError] = useState("")
  let url = "https://602e7c2c4410730017c50b9d.mockapi.io/users";

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUserData(data);
          setIsLoading(false);
          setError("")
        })
        .catch((err) => {
          setError("No data to show")
          console.log("Fetch error:", err);
          setIsLoading(false);
        });
    } catch (err) {
      console.log("Server Error", err);
      setIsLoading(false);
    }
  }, []);

  const handleShowDetail=(userId)=>{
    setShowDetail(userId)
  }

  console.log(userData);


  return (
    <>
      <div className="  ">
        <h1 className="text-3xl font-bold mt-4 mb-6 text-center ">User Data</h1>
        <div>
          <div className="w-full flex justify-center my-4 " >
            {" "}
            {isLoading ? (
              <img className="w-10 h-10" src={load} alt="" />
            ) : (
              ""
            )}{" "}
          </div>
          <hr />
          <span className="error text-center flex justify-center font-bold text-2xl  " >{error}</span>
          {userData.map((item, index) => {
            return (
              <div key={index} className="flex w-full ">
                {/* left */}
                <div className="flex flex-col sm:flex-row gap-4 my-4  w-[45%] xsm:w-1/2  sm:px-10 ">
                  <div className="flex">
                    <img
                     onClick={()=>handleShowDetail(item.id)}
                      className="rounded-full cursor-pointer  "
                      src={item.avatar ? item.avatar : notFound}
                      alt="avatar"
                    />
                  </div>
                  <div className="mt-3">
                    <h5>{item.profile.firstName}</h5>
                    <h5>{item.profile.lastName}</h5>
                    <p>{item.jobTitle}</p>
                  </div>
                 
                </div>
                {/* Right */}
                {
                    showDetail === item.id  && (
                        <div className=" w-[49%] xsm:w-1/2  flex flex-col items-center  "  >
                  <div className="mt-3 gap-y-3 flex sm:flex-row flex-col ">
                  <div>
                  <h2>UserName - {item.profile.username}</h2>
                  <h5>First Name - {item.profile.firstName}</h5>
                    <h5>Last Name - {item.profile.lastName}</h5>
                    <p>Job Title - {item.jobTitle}</p>
                    <h5>Bio - {item.Bio}</h5>
                    <p>CreatedAt - {item.createdAt}</p>
                  </div>
                    <button className="py-2 px-3 h-[40px] rounded-lg bg-violet-300 mt-3 " onClick={()=>setShowDetail(null) } >Close</button>
                  </div>
                </div>
                    )
                }
                
              </div>
            );
          })}
         
        </div>
      </div>
    </>
  );
};

export default User;
