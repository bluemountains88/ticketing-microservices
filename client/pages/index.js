import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
    return currentUser ? (
        <h1>You are signed in</h1>
    ) : (
        <h1>You are <b>not</b> signed in</h1>
    );
};

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser').catch((err) => {
        console.log(err);
    });
    return data;
};

export default LandingPage;