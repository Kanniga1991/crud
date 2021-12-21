import { Users } from './Users';
import './App.css';
import {Link , Route , Switch } from "react-router-dom";
import {InitialUserList} from "./InitialUserList";
import AppBar from '@material-ui/core/AppBar';

function App() {
  return (
    <div>
      <AppBar position = "static">
        <nav>
          <Link to ="/">HOME</Link>
          <Link to ="/users">USERS</Link>
          </nav>
      </AppBar>
      <Switch>
      <Route exact path ="/">          
          <Home/>
        </Route>
        <Route path ="/users">
          <Users/>
        </Route>
      </Switch>
    </div>
  );
}

function Home()
{
  return(
    <div>
      <h2>This page is related to CRUD</h2>
      <p>
        Go to user page to create and delete the users in the user-list.
      </p>
      </div>
  );
}

export default App;
