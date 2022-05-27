import Registration from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login";

export default function Welcome() {
    return (
        <section>
            <h1>Welcome to my social network</h1>
            {/* some kind of cool logo */}
            <BrowserRouter>
                <Route path="/" exact>
                    <Registration />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </BrowserRouter>
        </section>
    );
}
