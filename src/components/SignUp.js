import React from "react";
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
const avatarStyle = { backgroundColor: 'rgb(26, 33, 46)', color: 'gold' }
const buttonStyle = { 'margin-top': '20px', backgroundColor: '#1a212e' }

const SignUp = () => {
    return (<div>
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </Avatar>
                    <h1 style={{ margin: 0 }}>Sign Up</h1>
                    <Typography variant='caption'> Please fill this form to create an account</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Full name'></TextField>
                    <TextField fullWidth label='Username'></TextField>
                    <TextField fullWidth label='Password'></TextField>
                    <TextField fullWidth label='Confirm Password'></TextField>
                    <Button type='submit' variant='contained' color='primary' style={buttonStyle}>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    </div>)
}
export default SignUp;