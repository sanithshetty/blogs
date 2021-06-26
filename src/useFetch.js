import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);

    const [isPending, setPending] = useState(true);

    const [isError, setError] = useState(null);

    useEffect(() =>{
        const abortCont = new AbortController();                //used to stop fetch 

        fetch(url, { signal: abortCont.signal})
        .then(res =>{
            if(!res.ok){                         //res.ok will have true if fetch url is correct
                throw Error('Could not fetch the data from the url');
            }
            return res.json();
        })
        .then(resData =>{                       //resData is above json formatted data
            setData(resData);
            setPending(false);
        })
        .catch(err =>{
            if (err.name !== 'AbortError'){
                setPending(false);
                setError(err.message);
            }
        });

        return () => abortCont.abort();
    }, [url]);

    return {data, isPending, isError};
}
 
export default useFetch;
