"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  Container,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Support,
  Business,
  AccessTime,
  Language,
  Description,
  Security,
} from "@mui/icons-material";

export default function ContactPage() {
  const theme = useTheme();

  const handleEmailClick = () => {
    window.location.href = "mailto:support@houseoftalentt.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+91-9004952852";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919004952852", "_blank");
  };

  return (
    <Box minHeight="100vh" bgcolor={theme.palette.background.default} py={4}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          fontWeight={700}
          textAlign="center"
          mb={4}
          color="primary"
        >
          Contact Us
        </Typography>

        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          mb={6}
          maxWidth={800}
          mx="auto"
        >
          We&apos;re here to help! Get in touch with our support team for any
          questions, feedback, or assistance with your experience.
        </Typography>

        <Grid container spacing={4} mb={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={3} sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Business color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" fontWeight={600}>
                    Company Information
                  </Typography>
                </Box>
                <Typography variant="body1" mb={2}>
                  <strong>House of Talentt</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  A leading digital platform committed to providing exceptional
                  services and support to our users worldwide.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We specialize in innovative solutions and user-centric
                  experiences for modern businesses and consumers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={3} sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <AccessTime color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h5" fontWeight={600}>
                    Support Hours
                  </Typography>
                </Box>
                <Typography variant="body1" mb={2}>
                  <strong>Customer Support</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Monday - Friday: 9:00 AM - 6:00 PM IST
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Saturday: 10:00 AM - 4:00 PM IST
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Sunday: Closed
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Emergency Support:</strong> Available 24/7 for
                  critical issues
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          mb={4}
          color="primary"
        >
          Get in Touch
        </Typography>

        <Grid container spacing={3} mb={6}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Email color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Email Support
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  For general inquiries and support
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleEmailClick}
                  sx={{ borderRadius: 2 }}
                >
                  support@houseoftalentt.com
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Phone color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Phone Support
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Call us for immediate assistance
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePhoneClick}
                  sx={{ borderRadius: 2 }}
                >
                  +91-9004952852
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Support color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  WhatsApp Support
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Quick chat support via WhatsApp
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleWhatsAppClick}
                  sx={{ borderRadius: 2 }}
                >
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card elevation={3} sx={{ borderRadius: 3, mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <LocationOn color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight={600}>
                Office Address
              </Typography>
            </Box>
            <Typography variant="body1" mb={2}>
              <strong>House of Talentt</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              123 Business Park, Tech Hub
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Bangalore, Karnataka 560001
            </Typography>
            <Typography variant="body2" color="text.secondary">
              India
            </Typography>
          </CardContent>
        </Card>

        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          mb={4}
          color="primary"
        >
          Legal Information
        </Typography>

        <Grid container spacing={3} mb={6}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Description color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Terms of Service
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Read our terms and conditions
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  View Terms
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Security color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Privacy Policy
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Learn about data protection
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  View Privacy Policy
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Language color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Website
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Visit our main website
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card elevation={3} sx={{ borderRadius: 3, mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={600} mb={3} color="primary">
              Frequently Asked Questions
            </Typography>
            <Box>
              <Typography variant="h6" fontWeight={600} mb={2}>
                How do I reset my password?
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                You can reset your password by clicking on the &quot;Forgot
                Password&quot; link on the login page, or contact our support
                team for assistance.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" fontWeight={600} mb={2}>
                How can I get a refund?
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                For refund requests, please contact our support team with your
                order details. We process refunds within 3-5 business days.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box textAlign="center" color="text.secondary">
          <Typography variant="body2" mb={1}>
            © 2024 House of Talentt. All rights reserved.
          </Typography>
          <Typography variant="body2">
            For immediate assistance, please use one of the contact methods
            above.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
