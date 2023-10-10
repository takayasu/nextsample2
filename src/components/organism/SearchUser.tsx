
'use client'
import React, { use, useEffect, useState } from 'react'
import RepoList from '../moleculous/RepoList';
import UserView from '../moleculous/UserView';
import { useRecoilValue } from 'recoil';
import { UserState } from '@/utils/atoms';



const SearchUser = () => {
    const [data, setData] = useState({});
    const [hidden, setHidden] = useState(true);
    const [repo, setRepo] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const appUser = useRecoilValue(UserState);

    const SearchQueryUser = async (user:string) => {
        const res = await fetch(`https://api.github.com/users/${user}`)

        if (res.ok) {
            return res.json()
        }
        throw Error(res.status);


    };

    const SearchQueryRepo = async (user:string) => {
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

        SearchQueryUser(appUser).then(result => setData(result))
            .catch(err => {
                if (err.message == "404") {
                    setError("User Not Found")
                } else {
                    setError("Something Wrong")
                }
            })

        SearchQueryRepo(appUser).then(result => setRepo(result))
            .catch(err => {
                if (err.message == "404") {
                    setError("Repository Not Found")
                } else {
                    setError("Repository Something Wrong")
                }
            })

        setIsLoading(false)

    }, [appUser]);

    return (
        <div>
            <UserView {...data} isLoading={isLoading} error={error} repoOnclick={showRepo} />
            {!hidden && <RepoList repos={repo} />}
        </div>
    );
}

export default SearchUser;
