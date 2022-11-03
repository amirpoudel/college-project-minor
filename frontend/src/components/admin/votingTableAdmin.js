import React, { useState } from 'react';

import DataTable from 'react-data-table-component';


export default function VotingTableAdmin({candidate}){


    const columns=[
        {
            name:"Id",
            selector:(row)=>row.candidateID
        },
        {
            name:"Name",
            selector:(row)=>row.firstName+" "+row.middleName+" "+row.lastName
        },
        {
            name:"Post",
            selector:(row)=>row.post
        },
        {
            name:"Total Votes",
            selector:(row)=>row.totalVote,
            sortable:true,
        }
    ]
    

    return(
        <>

            <DataTable columns={columns} data={candidate}/>

        </>
    )

}