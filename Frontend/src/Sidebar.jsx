import "./Sidebar.css";

export default function Sidebar(){
    return(
        <section className="sidebar">
            <button>
                <img src="src/assets/blacklogo.png" alt="gptLogo" className="logo"/>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            <ul className="history">
                <li>history1</li>
                <li>history2</li>
                <li>history3</li>
            </ul>

            <div className="sign">
                <p>By Maestro &hearts;</p>
            </div>

        </section>
    );
};