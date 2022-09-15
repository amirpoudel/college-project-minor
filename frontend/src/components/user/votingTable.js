



import React, { useState } from 'react'

import DataTable from 'react-data-table-component';

export default function VotingTable({ candidate ,getVoteID}) {





  function voteSubmit(id){
    
    getVoteID(id);

    
  }

  const columns = [
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
      name:"Vote",
      cell:(row)=><button onClick={()=>{
        
        voteSubmit(row.candidateID);
        
      }}>Vote</button>
    }
  ]


  return (
    <>

      <div>voting Table</div>
      {candidate && candidate.map((data) => {
        return <div><h3>{data.candidateID} {data.firstName} {data.lastName} {data.post}   <button type='submit'>Vote</button></h3> </div>





      })}
      <DataTable columns={columns} data={candidate} highlightOnHover/>

      


    </>



  )
}
