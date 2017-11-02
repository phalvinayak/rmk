import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Image, Loader } from '../../common';
import { login, signup, validateToken } from '../../../actions';

let email, password;

class _Home extends React.PureComponent {
   constructor(props) {
       super(props);
       this.props.validateToken();
   }

    emailRef =  input => {
        email = input;
    };

    passwordRef = (input) => {
        password = input;
    };

    login = async () => {
        if (email.value && password.value) {
            await this.props.login(email.value, password.value);
            this.props.history.push('/dashboard')
        }
    };

    signup = async () => {
        if (email.value && password.value) {
            await this.props.signup(email.value, password.value);
            this.props.history.push('/dashboard')
        }
    };

    render() {
        if (!this.props.user.isInit) {
            return (
                <div className="home loader">
                    <Loader size="XS" />
                </div>
            )
        }
        if (this.props.user.isInit && this.props.user.email && this.props.user.token) {
            setTimeout(() => this.props.history.push('/dashboard'), 10);
            return null;
        }
        return (
            <div className="home">
                <div>
                    <Image size="L" src="assets/img/logo.png" />
                </div>
                <div>
                    <p>Blockchain for everyday life</p>
                </div>
                <div>
                    <Image size="S" src="assets/img/user.png" />
                </div>
                <div>
                    <Input type="email"  placeholder="Email" icon="assets/img/mail-icon.png" refe={this.emailRef}  />
                    <Input type="password" placeholder="Password" icon="assets/img/lock-icon.jpg" refe={this.passwordRef} />
                </div>
                <div>
                    <Button title="Sign Up" onClick={this.signup} />
                    <Button title="or log in" onClick={this.login} />
                </div>
                <div>
                    <p>Sign up to start adding stuff to the blockchain</p>
                </div>
                <div>
                    <p>Note: Must install Metamask plug-in for your web browser.<strong>(Currently can only be used on rinkeby)</strong></p>
                    <hr/>
                </div>
                <div className="videoContainer">
                    <h3>Don't know how to use? Watch this</h3>
                    <iframe width="480" height="315"
                        src="https://www.youtube.com/embed/Ym8pVPJhlmw?controls=1">
                    </iframe>
                </div>
            </div>
        );
    }
   
}



const mapDispacthToProps = ({
    login,
    signup,
    validateToken
});

const mapStateToProps = ({ user }) => ({
    user
});

const Home = connect(mapStateToProps, mapDispacthToProps)(_Home);

export { Home };