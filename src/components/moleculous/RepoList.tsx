'use client'
import React, { useEffect, useState } from "react";

const metadata = [{ header: "Name", key: "name" }, { header: "Description", key: "description" }, { header: "Language", key: "language" }, { header: "URL", key: "html_url" }]

const RepoList = (props: { user: string }) => {

    const [data, setData] = useState([]);

    const SearchQuery = async (user: string) => {
        const res = await fetch(`https://api.github.com/users/${user}/repos`)
        const json = await res.json()
        return json
    };

    useEffect(() => {
        SearchQuery(props.user).then(data => setData(data));
    }, [props.user]);


    return (
        <div className="mt-4">
            <h2 className="text-center mb-2">Repository List</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            {metadata.map((item, index) => (
                                <th key={index}>{item.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} >
                                {metadata.map((meta, index) => (
                                    <td key={index} >{item[meta.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default RepoList;