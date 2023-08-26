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
      get(false);
    } else if (name === "post" && user.length === 6) {
      post();
    } else {
      setMessage("Please enter 6 digit ID");
    }
  }

  async function get(post) {
    const response = await fetch(
      "https://mywebsite-da18e.firebaseio.com/playoff.json"
    );
    const data = await response.json();
    if (data) {
      for (const key in data) {
        if (data[key]["ID"] === user) {
          if (post) {
            setMessage("ID Taken");
            return "ID Taken";
          } else {
            setPlayoff(data[key]);
            setMessage("Success");
          }
          return;
        }
      }
    }
    if (!post) {
      setMessage("Not Valid ID");
    }
  }

  async function post() {
    const element = await get(true);
    if (element !== "ID Taken") {
      await fetch(
        "https://mywebsite-da18e.firebaseio.com/playoff.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...playoff, ID: user }),
        }
      );
      setMessage("Post Successful");
    }
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
        </div>
        <div className={"form-errorMessage"}>{message}</div>
      </form>
    </div>
  );
}

export default Login;
