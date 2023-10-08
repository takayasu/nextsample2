import React from "react";

export type UserProps = {
    avatar_url: string,
    name: string,
    user:  string,
    public_repos: number,
    repoOnclick: () => void,
    error: string,
    isLoading: boolean,
}

const UserView = (props: UserProps) => {


    if (props.isLoading) {
        return (
            <div>
                <p className="text-center">Loading...</p>
            </div>
        )
    }

    if (props.error) {
        console.log(props.error)
        return (
            <div className="m-4 flex flex-col items-center">
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{props.error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="m-4 flex flex-col items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={props.avatar_url} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{props.name}</h2>
                    <div className="flex flex-row m-4">
                        <p><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={props.html_url}>Github</a></p>
                        <p>Public Repo: {props.public_repos}</p>
                    </div>

                    <div className="card-actions justify-end">
                        <button className="btn" onClick={props.repoOnclick}>Get Repo Info</button>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default UserView;

