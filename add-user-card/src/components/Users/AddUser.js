import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

import styles from "./AddUser.module.css";

const AddUser = props => {
  const addUserHandler = e => {
    e.preventDefault();
  };

  return (
    <Card className={styles.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">UserName</label>
        <input type="text" id="username" />
        <label htmlFor="age">Age (Years)</label>
        <input type="number" id="age" />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
