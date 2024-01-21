import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import "./face.css"
import { Button } from '@mui/material';
import axios from 'axios';
import { apiImageView } from '../../apiList';
import update from './logic.js';
export default function Facebook(props) {
  
  const {topic,img,desc,views,_id,delay} =props;
  const [lengthy,setLengthy] = React.useState(false);
  const [readMore,setReadMore] = React.useState(false)

  React.useEffect(()=>{
    if(desc&& desc.length>200)
    {
      setLengthy(true);
    }
    update({_id,views,delay});
  },[])
  function getAdjustment()
  {
    if(lengthy&&readMore)
    {
      return ` adjust`;
    }
    else{
      return `overflow-hidden max-h-20`;
    }
  }
  return (
    <Card sx={{ maxWidth: 600, m: 2 ,minWidth:345}}>
      <CardHeader
        title={
          !topic? (
            <Skeleton
              animation="wave"
              height="10"
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : 
            (
              <span>{topic}</span>
            )
        }
      />
      {!img? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt={img}
        />
      )}

      <CardContent>
        {!desc? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="text.secondary" component="p">
            <>
              {<span>Views: {views}</span>}
              <br/>
            <span className={`text-orange-800 ${getAdjustment()}`}>
             {desc}
             </span>
             {!readMore&&lengthy &&<Button onClick={()=>setReadMore(true)}>Readmore</Button>}
              {readMore&&<Button onClick={()=>setReadMore(false)}>Show less</Button>}
             </>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}


