import React from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text } from "../../components/elements"; 
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";

export default function ProductUpload() {

    const [uploadFile, setUploadFile] = React.useState('image upload');
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ data?.pageTitle }>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <Row>
                            <Col xl={12}><LabelField type="text" label="Nome do produto" fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelTextarea label="descrição do produto" fieldSize="w-100 h-text-md" /></Col>
                            <Col xl={6}><LabelField label="categoria" option={['Verduras', 'Frutas','Legumes','Tubercules','Bebidas','Diverssos']} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="Preço" fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="Quantidade" fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="categoria" option={['Kg', 'G','L','Ml','Cl']} fieldSize="w-100 h-md" /></Col>
                        </Row>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <Box className="mc-product-upload-media">
                            <Box className="mc-product-upload-image"><Image src="images/product/13.jpg" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/12.jpg" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/11.jpg" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/09.jpg" alt="product" /></Box>
                            <Box className="mc-product-upload-file">
                                <Input type="file" id="product" onChange={(e)=> setUploadFile(e.target.files[0].name)} />
                                <Label htmlFor="product"><Icon type="collections" /><Text>{ uploadFile }</Text></Label>
                            </Box>
                        </Box>
                        <Anchor 
                            className="mc-btn w-100 primary mt-5" 
                            text="publicar &amp; visualizar" 
                            icon="cloud_upload" 
                            href="#"
                        />
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}