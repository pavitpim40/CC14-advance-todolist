import React, { Component } from 'react';
import { MenuAppBar as AppBar } from '../components/Common/AppBar';
// import Box from '@mui/material/Box'
import { Box, Grid, Typography, Button } from '@mui/material';
import { UserAvatar } from '../components/Common/UserAvatar';
import { Input } from '../components/Common/Input';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }

    state = {
        firstName :"",
        lastName : "",
        email: "",
        birthDate : "",
    }

    componentDidMount() {
        (async ()=> {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
            // console.log(response.data)
            const {name,email} = response.data

            this.setState({firstName: name.split(" ")[0], lastName: name.split(" ")[1], email, birthDate: "1990-05-09"})
        })().catch(error => {
            console.log(error)
        })
    }
    
    componentDidUpdate(prevProps,prevState,snapShot) {
        console.log(prevState)
    }

    componentWillUnmount() {
        console.log("I'm Dead")
    }

    handleChangeInput (event) {
        this.setState({[event.target.name] : event.target.value})
    }

   


    render() {
        return (
            <>
                <AppBar />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={8} sx={{ padding: 20 }}>
                        <Grid item xs={10} alignSelf='flex-end'>
                            <Typography variant='h1' component='h6'>
                                Edit Profile
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <UserAvatar
                                sx={{ width: 120, height: 120 }}
                                alt='Amir Khan'
                                src='https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                label={<h1>First Name</h1>}
                                placeholder='your first name'
                                name='firstName'
                                error={false}
                                value={this.state.firstName}
                                onChange={this.handleChangeInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                label={<h1>Last Name</h1>}
                                placeholder='your last name'
                                name='lastName'
                                error={false}
                                value={this.state.lastName}
                                onChange={this.handleChangeInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label={<h1>Email</h1>}
                                placeholder='example@mail.com'
                                name='email'
                                type='email'
                                value={this.state.email}
                                onChange={this.handleChangeInput}
                                error={false}
                               
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input 
                            name='birthDate' 
                            type='date' 
                            error={false} 
                            value={this.state.birthDate} 
                            onChange={(e)=> {
                                this.setState({birthDate : e.target.value})
                            }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Link to='/todo'>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    size='large'
                                    sx={{ background: '#db4c3f', padding: 2 }}
                                >
                                    <Typography variant='h5' component='span'>
                                        Edit Profile
                                    </Typography>
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to='/todo'>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    size='large'
                                    sx={{ backgroundColor: '#aaa', padding: 2 }}
                                >
                                    <Typography variant='h5' component='span'>
                                        Cancel
                                    </Typography>
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant='outlined'
                                size='large'
                                color='warning'
                                sx={{ padding: 2 }}
                            >
                                <Typography variant='h5' component='span'>
                                    Logout
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    }
}

export default ProfilePage;

// <ProfilePage/> ==> เรียก method render ==> <div>ProfilePage</div>
