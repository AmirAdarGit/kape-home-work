import React, { useEffect } from "react";


interface Props {

}

export const UserComponent: React.FC<Props> = (() => {


  useEffect(() => {
    console.log("fetch user analitics...")
  },[])

  console.log("3333")

  return (
    <div></div>
  );
})

export default UserComponent;



