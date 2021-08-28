import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchingUsers, createUser, deleteUser, deleteOldUser } from '../at_actions/users';
import PropTypes from 'prop-types';
import './home.css';
import moment from 'moment';
import CreateUser from '../at_createUser/createUser';
import DeleteIcon from '@material-ui/icons/Delete';

class Home extends Component {
    state ={
        userList: [],
        name: '',
        filter: '',
        userCreateModal: false,
        pageNum: 1
    }
    static propTypes = {
        userList: PropTypes.array
    }
    componentDidMount() {
        this.props.fetchingUsers(this.state.pageNum)
        setTimeout(() => this.setState({
            userList: this.props.userList
        }),500)
    }
    onTextChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        setTimeout(() => console.log(this.state.name),1)
    }
    onFilter = (val) => {
        this.setState({filter: val.target.value})
        switch(val.target.value) {
            case []:
                return this.setState({userList: this.props.userList})
            case "Date Of Birth":
                return this.setState({
                    filter: val.target.value
                })
            case "Country":
                return this.setState({
                    filter: val.target.value
                })
            default: 
                return console.log("done")
            }
        };
    onUserCreate = () => {
        this.setState({
            userCreateModal: !this.state.userCreateModal
        })
    }
    onDelete = (id) => {
        this.props.deleteUser(id);
        this.props.fetchingUsers(this.state.pageNum);
        setTimeout(() => this.setState({
            userList: this.props.userList
        }),500)
    }
    onOldDelete = (id) => {
        this.props.deleteOldUser(id);
        this.props.fetchingUsers(this.state.pageNum);
        setTimeout(() => this.setState({
            userList: this.props.userList
        }),500)
    }
    onNextPage = () => {
        this.props.fetchingUsers(this.state.pageNum + 1)
        setTimeout(() => this.setState({
            userList: this.props.userList,
            pageNum: this.state.pageNum + 1
        }),100)
    }
    prevPageHandler = () => {
        if(this.state.pageNum === 1 ) {
            return null
        } else {
            return this.props.fetchingUsers(this.state.pageNum - 1)
        }
    }
    onPrevPage = () => {
        this.prevPageHandler()
        if(this.state.pageNum === 1){
            return null
        } else {
            return setTimeout(() => this.setState({
                userList: this.props.userList,
                pageNum: this.state.pageNum - 1
            }),100)
        }
    }
    render() {
        return (
            <>
                <div>
                    {this.state.userCreateModal ? <CreateUser click={this.onUserCreate} /> : null}
                </div>
                <div id='homeHeader'>
                    <select id="profession" value={this.state.filter} onChange={this.onFilter}>
                        <option value={[]}>Show All</option>
                        <option value={["Date of birth"]}>Date Of Birth</option>
                        <option value={'Country'}>Country</option>
                    </select> 
                    <input id='searchHome' placeholder="Search..." type="text" name="name" onChange={this.onTextChange}/>
                    <button id='createUserBtn' onClick={() => this.onUserCreate()}>Create User</button>
                </div>
                <div id='homeWrapper'>
                    {this.state.userList.sort((a, b) => a[this.state.filter] > b[this.state.filter]).filter(val => {
                        if (this.state.name == "") {
                            return val
                        } else if (val["Full Name"].toLowerCase().includes(this.state.name.toLowerCase())) {
                            return val
                        }
                    }).map(user => (
                        <div className="cardWrapper" key={user.Id}>
                            {user.Id ? 
                                <DeleteIcon id='userDelete' onClick={() => this.onOldDelete(user.Id)}/>
                                :
                                <DeleteIcon id='userDelete' onClick={() => this.onDelete(user.id)}/>
                            }
                            <img src="https://picsum.photos/70/70" alt="profilePicture" />
                            <div className="cardContent">
                                <p><span>Name:</span> {user["Full Name"]}</p>
                                <p><span>Email:</span> {user.Email}</p>
                                <p><span>Date Of Birth:</span> {moment(user["Date of birth"]).format('DD-MMM-YYYY')}</p>
                                <p><span>Country:</span> {user.Country}</p>
                            </div>                                
                        </div>
                    ))}
                </div>
                <div id='pagination'>
                        <button onClick={this.onPrevPage}>Prev</button>
                        <button onClick={this.onNextPage}>Next</button>
                    </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
    userList: state.users.userList,
})
export default connect(mapStateToProps, {fetchingUsers, createUser, deleteUser, deleteOldUser})(Home)
