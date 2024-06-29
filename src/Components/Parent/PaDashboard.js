import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

// Import all images
import assignmentIcon from "../../Images/assignment-icon.jpg";
import routineIcon from "../../Images/routine-icon.jpg";
import transportIcon from "../../Images/transport-icon.jpg";
import feesIcon from "../../Images/fees-icon.jpg";
import feedbackIcon from "../../Images/feedback-icon.jpg";
import { useNavigate } from 'react-router-dom';

const cardContent = [
  {
    image: assignmentIcon,
    title: "Assignments",
    description: "View and track your child's assignments.",
    route: "/parentDashboard/assignments",
  },
  {
    image: routineIcon,
    title: "Routine",
    description: "Check your child's daily schedule and class routines.",
    route: "/parentDashboard/routine",
  },
  {
    image: transportIcon,
    title: "Transport",
    description: "View transport schedules and routes for your child's commute.",
    route: "/parentDashboard/transport",
  },
  {
    image: feesIcon,
    title: "Fees",
    description: "Manage and pay your child's school fees.",
    route: "/parentDashboard/fees",
  },
  {
    image: feedbackIcon,
    title: "Feedback",
    description: "Provide feedback on your child's school experience.",
    route: "/parentDashboard/feedback",
  },
];

const ResponsiveCard = ({ image, title, description, route }) => {
  const navigate = useNavigate();
  return (
    <Card style={{ height: '100%' }}>
      <CardMedia className="object-fit-cover"
        component="img"
        alt={title}
        height="140"
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={() => navigate(route)}>More</Button>
      </CardActions>
    </Card>
  );
};


const PaDashboard = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        {cardContent.map((content, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ResponsiveCard
              image={content.image}
              title={content.title}
              description={content.description}
              route={content.route}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PaDashboard;
