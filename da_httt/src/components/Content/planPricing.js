import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const PlanPricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("personal");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      description: "Capture ideas and find them quickly",
      features: [
        "Sync unlimited devices",
        "10 GB monthly uploads",
        "200 MB max.",
        "Use 5+ counting model",
        "Connect primary Google account",
        "Can check result and try again less than 3 times",
      ],
      buttonText: "Get Started",
    },
    {
      id: "personal",
      name: "Personal",
      price: "$11.99",
      description: "Keep home and family on track",
      features: [
        "Sync unlimited devices",
        "10 GB monthly uploads",
        "200 MB max.",
        "Use 10+ AI model",
        "Connect primary Google account",
        "Can check results",
      ],
      buttonText: "Get Started",
    },
    {
      id: "organization",
      name: "Organization",
      price: "$49.99",
      description: "Capture ideas and find them quickly",
      features: [
        "Sync unlimited devices",
        "10 GB monthly uploads",
        "200 MB max. note size",
        "Customize Home dashboard and access extra widgets",
        "Connect primary Google Calendar account",
        "Add due dates, reminders, and notifications to your tasks",
      ],
      buttonText: "Get Started",
    },
  ];

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          fontFamily="Inter"
        >
          Choose Your Plan
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          Whether you want to get organized, keep your personal life on track,
          or boost workplace productivity, Evernote has the right plan for you.
        </Typography>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" }, mb: 2 }}>
        <RadioGroup
          value={selectedPlan}
          onChange={handlePlanChange}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {plans.map((plan) => (
            <FormControlLabel
              key={plan.id}
              value={plan.id}
              control={<Radio />}
              label={plan.name}
            />
          ))}
        </RadioGroup>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Paper
              elevation={selectedPlan === plan.id ? 3 : 1}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                borderColor:
                  selectedPlan === plan.id ? "#2196F3" : "transparent",
                borderWidth: 2,
                borderStyle: "solid",
                transition: "all 0.3s",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 3,
                },
                position: "relative",
              }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="p"
                    fontWeight="bold"
                    sx={{ my: 1 }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {plan.description}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ flexGrow: 1 }}>
                  {plan.features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{
                          mr: 1,
                          color: plan.id === "personal" ? "#2196F3" : "inherit",
                        }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant={selectedPlan === plan.id ? "contained" : "outlined"}
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, borderRadius: 2 }}
                >
                  {plan.buttonText}
                </Button>
              </Box>

              {/* Mobile view - only show selected plan */}
              <Box
                sx={{
                  display: {
                    xs: selectedPlan === plan.id ? "block" : "none",
                    md: "none",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="p"
                    fontWeight="bold"
                    sx={{ my: 1 }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {plan.description}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box>
                  {plan.features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{
                          mr: 1,
                          color: plan.id === "personal" ? "#2196F3" : "inherit",
                        }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, borderRadius: 2 }}
                >
                  {plan.buttonText}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlanPricing;
