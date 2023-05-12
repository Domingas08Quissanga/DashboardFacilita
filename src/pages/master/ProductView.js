import React from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Box, Item, Text, Icon, List, Image, Heading, Button } from "../../components/elements";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/productView.json";

export default function ProductView() {

    fetch("http://localhost:3333", {
        method: "GET",
    })

    return (
        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title={ data?.pageTitle }>
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))}
                </Breadcrumb>
            </CardLayout>
            <CardLayout className="p-lg-5">
                <Row>
                    <Col xl={5}>
                        <DivideTitle title="product gallery" className="mb-4" />
                        <Box className="mc-product-view-gallery">
                            {data?.gallery.map((item, index) => (
                                <Image key={ index } src={ item.src } alt={ item.alt } />
                            ))} 
                        </Box>
                    </Col>
                    <Col xl={7}>
                        <DivideTitle title="product details" className="mb-4" />
                        <Box className="mc-product-view-info-group">
                            <Heading as="h2" className="mc-product-view-info-title">{ data?.title }</Heading>
                            {data?.specify.map((item, index) => (
                                <Box key={ index } className="mc-product-view-meta">
                                    <Icon type={ item.icon } />
                                    <Heading as="h5">{ item.title }</Heading>
                                    <Text as="span">:</Text>
                                    { item.text && <Text as="p">{ item.text }</Text> }
                                    { item.price && <Text as="p">{ item.price.now } <del>{ item.price.old }</del></Text> }
                                    { item.list &&
                                        <List>
                                            {item.list.map((item, index) => (
                                                <Item key={ index }>{ item }</Item>
                                            ))}
                                        </List>
                                    }
                                </Box>
                            ))}
                        </Box>
                    </Col>
                    <Col xl={12}>
                        <DivideTitle title="descrição do produto" className="mt-5 mb-4" />
                        <Box className="mc-product-view-descrip">
                            <Text>{ data?.descrip }</Text>
                        </Box>
                    </Col>
                </Row>
            </CardLayout>
        </PageLayout>
    )
}