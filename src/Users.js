import { useEffect , useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import Card from '@material-ui/core/Card';

export function Users() {

  const [userlist, setuserlist] = useState([]);
  const [addusername, setaddusername] = useState('');
  const [adduserpic, setadduserpic] = useState('');

  function getUsers(){  
    fetch(`https://6100f45a1d56e10017394c85.mockapi.io/users`,{
      method:"GET",
    })
    .then(data =>data.json())
    .then(users =>setuserlist(users))
 }
  
  function createUser(){
    fetch(`https://6100f45a1d56e10017394c85.mockapi.io/users/`,{
    method:"POST",
    headers:{
      "content-Type":"application/json",
    },
    body:JSON.stringify({name : addusername, pic : adduserpic})
  })
  .then(data =>data.json())   
  .then(()=>getUsers()); 
}
function deleteUser(id){
  fetch(`https://6100f45a1d56e10017394c85.mockapi.io/users/${id}`,{
    method:"DELETE",
  })
  .then(data =>data.json())
  .then((user)=>console.log(user))
  .then(() => getUsers());
}

useEffect(()=>{
  getUsers()
}, []); 

  

  return (
    <div>
      <div className = "textfield">
        <TextField
        value = {addusername}
        onChange = {(event) => setaddusername(event.target.value)}
        type = "text"
        placeholder = "Enter your name .."
        variant = "outlined"
        />
        <br/>
        <TextField
        value = {adduserpic}
        onChange = {(event) => setadduserpic(event.target.value)}
        type = "text"
        placeholder = "Upload your picture .."
        varianr = "outlined"
        />
        <br/>
        <Button
        variant = "outlined"
        color = "primary"
        onClick = {() => createUser()
        }>ADD USER</Button>
        </div>
        <div>
          {userlist.map((user)=>(
            <Userdetails
            name = {user.name}
            pic = {user.pic}
            id = {user.id}
            deleteUser = {deleteUser}/>
          ))}
        </div>

    </div>
  );
}

function Userdetails( { name, pic, id, deleteUser }){
  const history = useHistory();
  return(
    <Card className="user-card">
      <img
      style ={{
        borderRadius:"50%",
        height : "75px",
        width : "75px",
        objectFit: "cover"
      }}
      src ={pic} alt ="profile pic"/>
      <h2>{name}</h2>
      <Button
      onClick = {()=> deleteUser(id)}
      variant = "outlined"
      color = "primary"
      style = {{
        background : "crimson",
        color: "white",
        marginRight : "1rem",
        marginLeft : "1rem"
      }}>DELETE USER
      </Button>
    </Card>
  );
}