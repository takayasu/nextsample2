import { UserState } from "@/utils/atoms";
import React from "react";
import { useSetRecoilState } from "recoil";


const SearchUserBox = () => {
    const [user, setUser] = React.useState('')
    const setAppUser = useSetRecoilState(UserState);

    const handleSearch = () => {
        setAppUser(user);
    };

    return (
        <div className="m-4 flex flex-row items-center">
            <input type="text" className="border-2 h-10" placeholder="Search User" onChange={e => setUser(e.target.value)} />
            <button className="btn btn-primary mx-4" onClick={(handleSearch)}>Search</button>
        </div>
    )
};

export default SearchUserBox;