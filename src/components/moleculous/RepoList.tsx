'use client'
import React, { useEffect, useState } from "react";

const metadata = [{ header: "Name", key: "name" }, { header: "Description", key: "description" }, { header: "Language", key: "language" }, { header: "URL", key: "html_url" }]

const RepoList = (props: { repos: any[] }) => {




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
                        {props.repos.map((item, index) => (
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