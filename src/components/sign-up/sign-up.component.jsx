import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


class SignUp extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }


    handleSubmit = async e => {
        e.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("password don't match ");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            //console.log(user);
            await createUserProfileDocument( user, { displayName } );

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            

        } catch(error) {
            console.log(error.message);
        }

    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign Up with your email and password</span>

                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        label="Display Name"
                        onChange={this.handleChange}
                        required
                    />


                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        label="Email"
                        onChange={this.handleChange}
                        required
                    />

                    
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        onChange={this.handleChange}
                        required
                    />
                    
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm Password "
                        onChange={this.handleChange}
                        required
                    />

                    <CustomButton type="submit">Sign Up</CustomButton>

                </form>
            </div>
        )
    }
    
}

export default SignUp;