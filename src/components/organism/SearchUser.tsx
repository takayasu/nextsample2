
'use client'
import React, { use, useEffect, useState } from 'react'
import { deleteAppClientCache } from "next/dist/server/lib/render-server"
import RepoList from '../moleculous/RepoList';
import UserView from '../moleculous/UserView';



const SearchUser = (props: { user: string }) => {
    const [data, setData] = useState({});
    const [hidden, setHidden] = useState(true);
    const [repo, setRepo] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const SearchQueryUser = async (user: string) => {
        const res = await fetch(`https://api.github.com/users/${user}`)

        if (res.ok) {
            return res.json()
        }
        throw Error(res.status);


    };

    const SearchQueryRepo = async (user: string) => {
        const res = await fetch(`https://api.github.com/users/${user}/repos`)
        const json = await res.json()
        return json
    };

    const showRepo = () => {
        setHidden(!hidden);
    }

    useEffect(() => {
        setIsLoading(true);
        setError("");
        setHidden(true);

        SearchQueryUser(props.user).then(result => setData(result))
            .catch(err => {
                if (err.message == "404") {
                    setError("User Not Found")
                } else {
                    setError("Something Wrong")
                }
            })

        SearchQueryRepo(props.user).then(result => setRepo(result))
            .catch(err => {
                if (err.message == "404") {
                    setError("Repository Not Found")
                } else {
                    setError("Repository Something Wrong")
                }
            })

        setIsLoading(false)

    }, [props.user]);

    return (
        <div>
            <UserView {...data} isLoading={isLoading} error={error} repoOnclick={showRepo} />
            {!hidden && <RepoList repos={repo} />}
        </div>
    );
}

export default SearchUser;
