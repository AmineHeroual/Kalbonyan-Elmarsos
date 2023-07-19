import React from 'react';
import { useState } from 'react';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import Button from '../UI/Button';

import ErrorModal from '../UI/ErrorModal';
const AddUser = (props) => {
    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredUserAge, setEnteredUserAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (e) => {
        e.preventDefault();
        if (
            enteredUserName.trim().length === 0 &&
            enteredUserAge.trim().length === 0
        ) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values)',
            });
            return;
        }

        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (age > 0)',
            });
            return;
        }

        props.onAddUser(enteredUserName, enteredUserAge);
        setEnteredUserName('');
        setEnteredUserAge('');
    };

    const userNameChangeHandler = (e) => {
        setEnteredUserName(e.target.value);
    };

    const userAgeChangeHandler = (e) => {
        setEnteredUserAge(e.target.value);
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            )}
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={enteredUserName}
                        onChange={userNameChangeHandler}
                    />

                    <label htmlFor="age">Age</label>
                    <input
                        id="age"
                        type="number"
                        value={enteredUserAge}
                        onChange={userAgeChangeHandler}
                    />

                    <Button type="submit">Add user</Button>
                </form>
            </Card>
        </>
    );
};

export default AddUser;
