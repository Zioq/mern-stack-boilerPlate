import React, { useEffect } from "react";
import axios from "axios";

function LandingPage(props) {

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      LandingPag
      <button onClick={onClickHandler}>log out</button>
    </div>
  );
}

export default LandingPage;
