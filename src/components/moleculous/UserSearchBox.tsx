import React from "react";

export type SearchUserBoxProps = {
    setSearchUser: (user: string) => void
}

const SearchUserBox = (props: SearchUserBoxProps) => {
    const [user, setUser] = React.useState('')

    const handleSearch = () => {
        console.log(user);
        props.setSearchUser(user)
    };

    return (
        <div className="m-4 flex flex-row items-center">
            <input type="text" className="border-2 h-10" placeholder="Search User" onChange={e => setUser(e.target.value)} />
            <button className="btn btn-primary mx-4" onClick={(handleSearch)}>Search</button>
        </div>
    )
};

export default SearchUserBox;