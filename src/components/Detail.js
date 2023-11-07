import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Card,Grid } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function Detail() {

    const students = useParams();

    const[APIData, setAPIData] = useState([]);
    const getStudentsUrl = `https://65459188fe036a2fa9546e5b.mockapi.io/api/v1/students/${students.id}`;

    useEffect(() => {
        fetch(getStudentsUrl,{method:'GET'}).then(
            response => {
                if(!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then(data=>{setAPIData(data)})
            .catch(error=>console.log(error.message));
        
    },[getStudentsUrl])



    return(
      <div>
         <h1>Detail</h1>
         <Grid container rowSpacing={2} >
          <Grid className='parent' item xs={12}>
          <Card className='child' sx={{ maxWidth: 545 }}>
      <CardMedia
        sx={{ height: 440 }}
        image={APIData.image}
        title="green iguana"
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
          ID: {APIData.id}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Name: {APIData.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          DOB: {APIData.dateofbirth}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        Gender: {students.gender ? "Male" : "Female"}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Feedback: {APIData.feedback}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Class: {APIData.class}
        </Typography>
        <Link to={`/`} className="back">Back</Link>
       
      </CardContent>
    </Card>


          </Grid>


          </Grid>
        
  
   
        

      </div>

     
    

         


  
       
            
      
    )
}