
import React from "react";

import DataTable from "react-data-table-component";


export default function UserTable({user}){
    
    const columns=[
        {
            name:'Voter Id',
            selector:(row)=>row.voterID
        },
        {
            name:"Name",
            selector:(row)=>row.firstName+" "+row.middleName+" "+row.lastName
        },
        {
            name:"Contact",
            selector:(row)=>row.email
        },
        {
            name:"IsVoted",
            selector:(row)=> row.isVoted
            
        }
        
    ]
    

    return (
        <>
        <DataTable columns={columns} data={user} />
        </>
    )
}