import useForm from '../hooks/use-form';

const BasicForm = (props) => {
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: FirstnameInputHasError,
        valueChangeHandler: FirstnameChangeHandler,
        inputBlurHandler: FirstnameBlurHandler,
        reset: resetFirstNameInput,
    } = useForm((value) => value.trim() !== '');

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: LastnameInputHasError,
        valueChangeHandler: LastnameChangeHandler,
        inputBlurHandler: LastnameBlurHandler,
        reset: resetLastNameInput,
    } = useForm((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: EmailInputHasError,
        valueChangeHandler: EmailChangeHandler,
        inputBlurHandler: EmailBlurHandler,
        reset: resetEmailInput,
    } = useForm((value) => value.trim() !== '' && value.includes('@'));

    let formIsValid = false;

    if (
        enteredFirstNameIsValid &&
        enteredLastNameIsValid &&
        enteredEmailIsValid
    ) {
        formIsValid = true;
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();

        console.log('with State: ', [
            enteredFirstName,
            enteredLastName,
            enteredEmail,
        ]);
    };

    const FirstnameInputClasses = FirstnameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const LastnameInputClasses = LastnameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const EmailInputClasses = EmailInputHasError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className="control-group">
                <div className={FirstnameInputClasses}>
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        onChange={FirstnameChangeHandler}
                        onBlur={FirstnameBlurHandler}
                        value={enteredFirstName}
                    />
                    {FirstnameInputHasError && (
                        <p className="error-text">
                            First Name must not be empty.
                        </p>
                    )}
                </div>
                <div className={LastnameInputClasses}>
                    <label htmlFor="Lastname">Last Name</label>
                    <input
                        type="text"
                        id="Lastname"
                        onChange={LastnameChangeHandler}
                        onBlur={LastnameBlurHandler}
                        value={enteredLastName}
                    />
                    {LastnameInputHasError && (
                        <p className="error-text">
                            Last Name must not be empty.
                        </p>
                    )}
                </div>
            </div>
            <div className={EmailInputClasses}>
                <label htmlFor="email">E-Mail Address</label>
                <input
                    type="email"
                    id="email"
                    onChange={EmailChangeHandler}
                    onBlur={EmailBlurHandler}
                    value={enteredEmail}
                />
                {EmailInputHasError && (
                    <p className="error-text">Email must be Valid.</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
