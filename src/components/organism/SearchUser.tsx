'use client'
import React, { use, useEffect, useState } from 'react'
import { deleteAppClientCache } from "next/dist/server/lib/render-server"

const SearchQuery = async (user: string) => {
    const res = await fetch(`https://api.github.com/users/${user}`)
    const json = await res.json()
    return json
};

const SearchUser = (props: { user: string }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        console.log(props.user)
        SearchQuery(props.user).then(data => setData(data));
    }, [props.user]);

    if (!data.name) {
        console.log("loading...");
        return <div>loading...</div>
    } else {
        return (
            <div className="m-4">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={data.avatar_url} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{data.name}</h2>
                        <div className="flex flex-row m-4">
                            <p><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={data.html_url}>Github</a></p>
                            <p>Public Repo: {data.public_repos}</p>
                        </div>

                        <div className="card-actions justify-end">
                            <button className="btn">Get Repo Info</button>
                        </div>
                        <div>Repo: {data.repos_url}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchUser;