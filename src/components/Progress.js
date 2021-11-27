import React, {useEffect} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { useHistory } from 'react-router';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 13,
  borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 600 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === 'light' ? '#FFB500' : '#308fe8',
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop:'20px'}}>
      <Box sx={{ width: '200px', mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({link = '/home'}) {
  const [progress, setProgress] = React.useState(10);
  const history = useHistory();
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if(progress>=100)
      setTimeout(()=>{
        history.push(link)
      },700)
  }, [progress])
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
      <div className="making-progress">
          <span className="making-text">Making things pop...</span>
          <span className="making-percent">({progress}%)</span>
      </div>
    </Box>
  );
}
