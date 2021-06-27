import { useParams } from "react-router-dom";        //to use the parameter from url
import useFetch from './useFetch';
import { useHistory } from "react-router-dom";
import {  Link } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();                     //id same name as the arguement passed to link
    const {data: blogs, isPending, isError} = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () =>{
        fetch('http://localhost:8000/blogs/' + blogs.id,{
            method: 'DELETE'
        }).then(() =>{
            history.push('/');
        })
    }

    return ( 
        <div className="blog-details">
            { isError && <div>{isError} </div>}
            { isPending && <div>Loading...</div>}
            {blogs && (
                <article>
                    <h2>{ blogs.title }</h2>
                    <p>Written by { blogs.author }</p>
                    <div>{ blogs.body }</div>
                    <button onClick = { handleClick }>Delete</button>
                    <Link to ={`/update/${blogs.id}`}>
                        <button className = "edit">Edit</button>
                    </Link>
                    
                </article> 
            )}
        </div>
     );
}
 
export default BlogDetails;