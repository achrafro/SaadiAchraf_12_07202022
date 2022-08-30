import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Siderbar from "./Siderbar";
import Welcome from "./Welcome";
import Barchart from "./Barchart";
import Userinfo from "./Userinfo";
import RadarIntenstite from "./RadarIntenstite";
import SessionEvolution from "./SessionEvolution";
import Objectifs from "./Objectifs";
import Objectifss from "./Objectifss";

import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import Notfound from "./Notfound";
import { UserInfos,UserPerformance ,UserActivity,UserAverageSessions}
 from '../Services/Api'

function Home() {
// 

useEffect(() => {

  // geting user info

  const getUserInfos = async () => {
    const request = await UserInfos(id);
    setUserName(request.data.userInfos.firstName)
    SetUserMainData(request.data.keyData)
    SetUserScore(request.data.todayScore)
 

     
    
  };
  getUserInfos();

// Getting user perfromance
  const getUserPerformance = async () => {
    const request = await UserPerformance(id);
     SetUserPerform(request.data)

     
    
  };
  getUserPerformance();
// .............

// Getting user activityy
const getUserActivity = async () => {
  const request = await UserActivity(id);
  SetActivitySession(request.data.sessions)

   
  
};
getUserActivity();
// .............
// get user avg sessions
const getUserAverageSessions = async () => {
  const request = await UserAverageSessions(id);
  SetUserAverageSession(request.data.sessions)

   
  
};
getUserAverageSessions();
 



}, []);

// 
    const [userName, setUserName] = useState("");
  const [ActivitySession, SetActivitySession] = useState("");
  const [UserMainData, SetUserMainData] = useState("");
  const [UserAverageSession, SetUserAverageSession] = useState("");
  const [UserPerform, SetUserPerform] = useState("");
  const [UserScore, SetUserScore] = useState("");

  const [isIdCorrect, SetisIdCorrect] = useState(true);

  const id = useParams().id;
  const url = "http://localhost:4000/user/" + id + "/";
 

  useEffect(() => {
   

//  Check if id is correct : 
axios
.get(url)
.then((res) => {
    SetisIdCorrect(true);
})
.catch((err) => {
  SetisIdCorrect(false);
});




 
  }, []);

  return (
    <>
      {!isIdCorrect ? (
        <>
          <Notfound> </Notfound>
        </>
      ) : (
        <>
          <Header> </Header>

          <div className="page__container">
          <Siderbar> </Siderbar>

            <Welcome name={userName} />

            <Userinfo UserInfoProps={UserMainData}> </Userinfo>

            <Barchart info={ActivitySession}> </Barchart>
            <RadarIntenstite UserPerformInfo={UserPerform}> </RadarIntenstite>
            <SessionEvolution evolutionInfo={UserAverageSession} />
            <Objectifss score={UserScore}></Objectifss>
          </div>
        </>
      )}
    </>
  );
}

export default Home;


Home.propTypes = {
  name : PropTypes.string,
  UserInfoProps :   PropTypes.object,
  UserPerformInfo : PropTypes.object ,
  evolutionInfo : PropTypes.object ,
  score : PropTypes.number 
};