import React, { useState } from "react";
import "./style/Login.css";
import { useTheme, useThemeUpdate } from "../../../ThemeContext";

function Login() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const playoff = useTheme();
  const setPlayoff = useThemeUpdate()[9];

  function changeHandler(event) {
    setUser(event.target.value);
  }

  function clickHandler(name) {
    if (name === "get" && user.length === 6) {
      get();
    } else if (name === "post" && user.length === 6) {
      post();
    } else if (name === "put" && user.length === 6) {
      put();
    } else if (name === "delete" && user.length === 6) {
      del();
    } else {
      setMessage("Please enter 6 digit ID");
    }
  }

  async function get() {
    let URL = "http://localhost:5000/api?userID=";
    URL = URL.concat(user);

    const response = await fetch(URL);
    const data = await response.json();

      if (data["success"]) {
        const map = getHelper(data);
        setPlayoff(map);
      }
      setMessage(data["msg"]);
  }

  async function post() {
    let response = await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...playoff, ID: user }),
    });
    const data = await response.json();
    setMessage(data["msg"]);
  }

  async function put() {
    let response = await fetch("http://localhost:5000/api", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...playoff, ID: user }),
    });
    const data = await response.json();
    setMessage(data["msg"]);
  }
  async function del() {
    let response = await fetch("http://localhost:5000/api", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: user }),
    });
    const data = await response.json();
    setMessage(data["msg"]);
  }

  function getHelper(data) {
    let map = {};
    for (const [key, value] of Object.entries(data["playoff"][0])) {
      let array = [
        "firstEast",
        "firstWest",
        "quarterEast",
        "quarterWest",
        "semiEast",
        "semiWest",
        "finalEast",
        "finalWest",
        "Champion",
      ];
      let flag = true;
      for (let i = 0; i < array.length; ++i) {
        if (key.startsWith(array[i])) {
          if (array[i] in map) {
            map[array[i]].push(value);
          } else {
            map[array[i]] = [value];
          }
          flag = false;
          break;
        }
      }

      if (flag) {
        map[key] = value;
      }
    }
    return map;
  }

  // // Functions for writing it in two functions above in .then() format
  // function get(post) {
  //   return fetch("https://mywebsite-da18e.firebaseio.com/playoff.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data) {
  //         for (const key in data) {
  //           if (data[key]["ID"] === user) {
  //             if (post) {
  //               setMessage("ID Taken");
  //               return "ID Taken";
  //             } else {
  //               setPlayoff(data[key]);
  //               setMessage("Success");
  //             }
  //             return;
  //           }
  //         }
  //       }
  //       if (!post) {
  //         setMessage("Not Valid ID");
  //       }
  //     });
  // }

  // function post() {

  //   get(true).then((element) => {
  //     if (element !== "ID Taken") {
  //       fetch("https://mywebsite-da18e.firebaseio.com/playoff.json", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ ...playoff, ID: user }),
  //       }).then(() => {
  //         setMessage("Post Successful");
  //       });
  //     }
  //   });
  // }
  return (
    <div>
      <form className="form">
        <label>Enter your User ID: </label>
        <div className="form-input">
          <input
            type="text"
            maxLength="6"
            placeholder="Search..."
            onChange={changeHandler}
            value={user}
          />
          <div className="fetch">
            <div className="fetch-row">
              <button
                onClick={() => {
                  clickHandler("get");
                }}
                type="button"
              >
                GET
              </button>
              <button
                onClick={() => {
                  clickHandler("post");
                }}
                type="button"
              >
                POST
              </button>
            </div>
            <div className="fetch-row">
              <button
                onClick={() => {
                  clickHandler("put");
                }}
                type="button"
              >
                PUT
              </button>
              <button
                onClick={() => {
                  clickHandler("delete");
                }}
                type="button"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
        <div className={"form-errorMessage"}>{message}</div>
      </form>
    </div>
  );
}

export default Login;
