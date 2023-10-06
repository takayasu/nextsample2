
'use client'
import React, { use, useEffect, useState } from 'react'
import { deleteAppClientCache } from "next/dist/server/lib/render-server"
import RepoList from '../moleculous/RepoList';



const SearchUser = (props: { user: string }) => {
    const [data, setData] = useState({});
    const [hidden, setHidden] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const SearchQuery = async (user: string) => {
        const res = await fetch(`https://api.github.com/users/${user}`)

        if (res.ok) {
            return res.json()
        }
        throw Error(res.status);


    };


    const showRepo = () => {
        setHidden(!hidden);
    }

    useEffect(() => {
        setIsLoading(true);
        setError("");
        setHidden(true);

        SearchQuery(props.user).then(result => setData(result))
            .catch(err => {
                if (err.message == "404") {
                    setError("User Not Found")
                } else {
                    setError("Something Wrong")
                }
            })
            .finally(() => { setIsLoading(false) });

    }, [props.user]);

    if (isLoading) {
        return (
            <div>
                <p className="text-center">Loading...</p>
            </div>
        )
    }

    console.log("before", error);
    if (error) {
        console.log(error)
        return (
            <div className="m-4 flex flex-col items-center">
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="m-4 flex flex-col items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={data.avatar_url} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{data.name}</h2>
                    <div className="flex flex-row m-4">
                        <p><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={data.html_url}>Github</a></p>
                        <p>Public Repo: {data.public_repos}</p>
                    </div>

                    <div className="card-actions justify-end">
                        <button className="btn" onClick={showRepo}>Get Repo Info</button>
                    </div>
                </div>
            </div>
            {!hidden &&
                <div>
                    <RepoList user={props.user} />
                </div>
            }
        </div>
    );
}

export default SearchUser;
