import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createUser } from '../at_actions/users';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import CountrySelector from '../../components/countrySelector';
import './createUser.css'

export class CreateUser extends Component {
    state = {
        fullName: '',
        id: '',
        DOB: '',
        birthDate: '',
        Email: '',
        Country: '',
        CreateAt: moment.now()
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.value)
    };
    onSubmit = e => {
        e.preventDefault();
        this.props.createUser(this.state.fullName, this.state.Country, this.state.DOB, this.state.Email, this.state.CreateAt);
    };
    render() {
        const { fullName, birthDate, Email, Country } = this.state;
        return (
            <div id="createUserWrapper">
                <button id='createUserClose' onClick={this.props.click}>Close</button>
                <form onSubmit={this.onSubmit}>
                        <div id='overlay'>
                            <div id='createUserInputs'>
                                <p>Full Name</p>
                                <input value={fullName} name='fullName' onChange={this.onChange} className='user-input' placeholder='Full Name...' />
                                <p>Country</p>
                                <CountrySelector style={{width: '40vw'}} val={Country} func={v => this.setState({Country: v})} />
                                <p>Date Of Birth</p>
                                {/* <input value={DOB} name='DOB' onChange={this.onChange} id='login-email' placeholder='input your email address' /> */}
                                <DatePicker 
                                    onChange={date => this.setState({DOB: new Date(date).toISOString(),
                                        birthDate: date
                                    })}
                                    value={birthDate}
                                    name='DOB'
                                />
                                {/* <p>Country</p>
                                <input value={Email} name='Email' onChange={this.onChange} id='login-email' placeholder='input your email address' /> */}
                                <p>Email address</p>
                                <input value={Email} name='Email' onChange={this.onChange} className='user-input' placeholder='Email...' />
                            </div>
                            <div id='btn-wrapper'>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps,{createUser})(CreateUser)
