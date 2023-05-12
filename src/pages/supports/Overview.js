import React from "react";
import Logo from "../../components/Logo";
import data from "../../data/supports/overview.json";
import { Anchor, Box, Image, Heading, Section, Text } from "../../components/elements";
import { Container, Row, Col } from "react-bootstrap";

export default function Overview() {
    return (
        <Box className="mc-overview">
            <Section className="mc-overview-banner">
                <Container>
                    <Logo href="/" src={ data?.banner.logo } alt="logo" name="Facilita" className="lg" />
                    <Heading as="h1">{ data?.banner.title }</Heading>
                    <Text>{ data?.banner.descrip }</Text>
                    
                    <Anchor 
                        href="/login" 
                        target="_blank" 
                        icon="launch" 
                        text="Entrar" 
                        rel="noopener noreferrer"
                        className="mc-btn primary"
                    />
                </Container>
            </Section>
          
            <Section className="mc-overview-footer">
            
                <Text>Facilita | © Copyrights by <Text as="span">Facilita</Text></Text>
            </Section>
        </Box>
    )
}