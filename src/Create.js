import { useState } from "react";
import { useHistory } from "react-router-dom";


const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [ispending, setPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();                     //to prevent refreshing page when submit
        const blog = { title, body, author };
        setPending(true);

        fetch('http://localhost:8000/blogs',{
            method : 'POST',
            headers : { "Content-type" : "application/json" },
            body : JSON.stringify(blog)
        })
        .then(() =>{
            setPending(false);
            history.push('/');                  //history.go(-1); it will redirect to previous visited page ,like in browser
        });
    }

    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit = {handleSubmit}>
                <label>Blog title:</label>
                <input 
                type = "text" 
                required
                value = { title }
                onChange = {(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                required
                value = { body }
                onChange = {(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                value = { author }
                onChange = {(e) => setAuthor(e.target.value)}
                >
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                </select>
                { !ispending && <button>Add Blog</button>}
                { ispending && <button disabled>Adding Blog ...</button>}

            </form>
        </div>
     );
}
 
export default Create;