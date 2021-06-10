import { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const SearchText: NextPage = (props: any) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    searchInDB();
  }, []);

  const searchInDB = async () => {
    const user = fetch("/api/search?searchValue=" + props.SearchText)
      .then((res) => res.json())
      .then((users) => {
        console.log(users);
        setUserList(users);
      });
  };

  return (
    <>
      <Layout />
      <div className="searchpage">
        <h4 className="text-center">
          Found Users List
          <br />
          <br />
        </h4>
        <br />
        <br />
        <ul style={{ marginLeft: 700 }}>
          {userList.map((value, index) => {
            return (
              <li key={index}>
                <a href={`/userprofil/${value._id}`}>
                  {value.userName}
                  <br />
                </a>
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SearchText;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("juste context", context.query);
  // const c = cookies(context).fewlines;
  // let currentUser;

  // console.log("🟢", currentUser);
  // console.log("cookie", c);
  // const urlToSignIn = await initClient().getAuthorizationURL();

  return {
    props: {
      // cookie: c,
      SearchText: context.query.searchText,
    },
  };
};
