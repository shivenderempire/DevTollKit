export default function HomePage(props:any) {

    const LoginMe=()=>
    {
        props.history.push("Login");

    }

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={LoginMe}> login</button>
        </div>
    )
}
