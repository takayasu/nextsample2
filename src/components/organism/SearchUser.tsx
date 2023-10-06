
'use client'
import React, { use, useEffect, useState } from 'react'
import { deleteAppClientCache } from "next/dist/server/lib/render-server"
import RepoList from '../moleculous/RepoList';



const SearchUser = (props: { user: string }) => {
    const [data, setData] = useState({});
    const [hidden, setHidden] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const SearchQuery = async (user: string) => {
        const res = await fetch(`https://api.github.com/users/${user}`)

        const json = await res.json();

        return json;



    };


    const showRepo = () => {
        setHidden(!hidden);
    }

    useEffect(() => {
        setIsLoading(true);
        setHidden(true);

        const result = SearchQuery(props.user).then(result => setData(result))
        setIsLoading(false);

    }, [props.user]);

    if (isLoading) {
        return (
            <div>
                <p className="text-center">Loading...</p>
            </div>
        )
    }

    return (
        data.login &&
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
