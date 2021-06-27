import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";        //to use the parameter from url
// import useFetch from './useFetch';

const Update = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [blogs, setBlogs] = useState([]);
    const { id } = useParams();                     //id same name as the arguement passed to link
    const history = useHistory();

    useEffect(() =>{
        fetch('http://localhost:8000/blogs/' + id)
        .then(res =>{
            return res.json();
        })
        .then(data =>{
            setBlogs(data);
            setTitle(data.title);
            setBody(data.body);
            setAuthor(data.author);
        });
    }, [id])

    const handleClick = () => {
        const blog = { title, body, author };

        fetch('http://localhost:8000/blogs/' + id,{
            method : 'PUT',
            headers : { "Content-type" : "application/json" },
            body : JSON.stringify(blog)
        })
        .then(() =>{
            history.push("/");                  //history.go(-1); it will redirect to previous visited page ,like in browser
        });
    }

    return ( 
        <div className="create">
            
            {blogs &&
            <form>
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
                <button onClick = { handleClick }>Update</button>
            </form>
            }
        </div>
     );
}
 
export default Update;