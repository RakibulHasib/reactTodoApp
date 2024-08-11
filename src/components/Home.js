import React from "react"
const Home = () => {
    return (
        <div style={container}>
            <div className="animate-pulse">Todo App</div>
        </div>
    )
}

const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "60px",
    height: "90vh",
    color: "#102b38"
}

export default Home;