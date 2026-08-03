import Navbar from "./components/Navbar"

function App({children}) {

    return (
        <>
            <Navbar />
            <main> {children} </main>
        </>
    );

}

export default App;