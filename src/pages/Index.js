import React from 'react';
import { Link } from 'react-router-dom';
import "./../styles/RegisterStyles.css"
import Footer from './Footer';

const Index = () => {
    return (
        <div >
            <div style={styles.container} >
                <h3 style={styles.heading}>Welcome to Hospital</h3>

                <div style={styles.links}>
                    <Link to="/register" style={styles.link}>
                        Not a user? | Register here
                    </Link>

                    <Link to="/login" style={styles.link}>
                        Already a user? | Login here
                    </Link>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

const styles = {

    container: {
        backgroundImage: `url('./Img1.jpg')`,
        // backgroundColor: '#f0f0f0', // Light gray background
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '500px',
        height: '500px', // Added height to center vertically
        margin: 'auto', // Center horizontally
        display: 'flex', // Use flexbox for centering vertically
        flexDirection: 'column', // Arrange items vertically
        justifyContent: 'center', // Center items vertically
    },
    heading: {
        marginTop: '250px',
        color: '#000000', // Blue heading color
    },
    links: {
        marginTop: '60px',
    },
    link: {
        display: 'block',
        backgroundColor: '#004080', // Green button background
        color: 'white', // White text color
        textDecoration: 'none',
        padding: '10px',
        borderRadius: '20px',
        marginTop: '40px',
        marginBottom: '20px',
    },
};


export default Index;