import { NextPage, GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Checkbox from "../../components/checkBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabase } from "../../util/mongodb";
import {
  getEmailByCookie,
} from "../../utils/initDatabase";
import cookies from "next-cookies";
import { count } from "console";


const Inscription: NextPage<{ data; user, currentUsersEmail }> = ({ data, user, currentUsersEmail }) => {
  
  const [userName, setUserName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [atLeastThreeCategSelected, setAtLeastThreeCategSelected] = useState(false);
  const [active, setActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
 



useEffect(() => {
      console.log(birthdate);

}, [userName, birthdate, active])
 

  return (
    <div className="page-inscription">
      <br />
      <h1 className="titre-page-inscription text-center">Register</h1>
      <p className="sous-titre-page-inscription text-center">
        Welcome {userName}, please fill in this informations.
      </p>
      <div className="container">
        <div>
          <div className="row">
            <div className="colIncription col-6">
              <label htmlFor="exampleInputUserName" className="form-label">
                UserName :
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail"
                placeholder="UserName"
                value={userName}
                onChange={(event) => {
                  console.log(event.target.value);
                  setUserName(event.target.value);
                }}
              />
              <label htmlFor="exampleInputUserName" className="form-label">
                Email :
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail"
                placeholder="Email"
                defaultValue={currentUsersEmail}
              />
              <label htmlFor="exampleInputBirthDate" className="form-label">
                Birthdate
              </label>
              <input
                type="Date"
                className="form-control"
                id="exampleInputBirthDate"
                aria-describedby="emailHelp"
                placeholder="BirthDate"
                value={birthdate}
                onChange={(event) => {
                  setBirthdate(event.target.value);
                }}
                
              />
            </div>
            <div className="col-6">
              <h3 className="titre-interests text-center">
                Interests (minimum 3)
              </h3>
              <div className="container">
                <div className="row row-cols-3">
                  {data.map((value, index) => {
                    return (
                      <div
                        className="imageInterest col text-center"
                        key={index}
                      >
                        <img
                          className="imageCircle"
                          src={value.Cover}
                          width="70"
                          height="70"
                          alt=""
                        />
                        <Checkbox
                          id={index}
                          active={active}
                          setActive={setActive}
                          atLeastThreeCategoriesSelected={atLeastThreeCategSelected}
                          setAtLeastThreeCategoriesSelected={setAtLeastThreeCategSelected}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div>
                {active.map((value, index) => {
                  return (<div key={"tata" + index}>{value}</div>);
                })}
              </div>
              <button type="submit" className="Boutton btn" 
             disabled={atLeastThreeCategSelected}
              //disabled={true}
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .form-check-input {
            background-color: #fbe23b;
            color: black;
          }
        `}</style>
      </div>
    </div>
  );
};
export default Inscription;
export const getServerSideProps: GetServerSideProps = async (context) => {


const c = cookies(context).fewlines;

  const currentUsersEmail=await getEmailByCookie(c);

  const mongodb = await getDatabase();
  const categoSport = await mongodb.db().collection("group").find().toArray();
  const UserData = await mongodb.db().collection("user").find().toArray();
  const result = await categoSport.map((value) => {
    return {
      id: value.id,
      userName: value.UserName,
      Cover: value.Cover,
    };
  });
  const result2 = await UserData.map((value) => value);
  const fin = await JSON.parse(JSON.stringify(result));
  const fin2 = await JSON.parse(JSON.stringify(result2));
  return {
    props: {
      data: fin,
      user: fin2,
      currentUsersEmail: currentUsersEmail
    },
  };
};
