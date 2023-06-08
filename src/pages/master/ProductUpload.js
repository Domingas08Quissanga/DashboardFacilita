import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Box, Anchor, Image, Input, Label, Icon, Text } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import { useFormik } from "formik";
import * as yup from "yup"
import { api } from "../../services";
// import { useFetch } from "../../components/hooks/useFetch";

export default function ProductUpload() {
    const [uploadFile, setUploadFile] = React.useState('image upload');
    // const { } = useFetch("/unidade")
    const formik = useFormik({
        initialValues: {
            id_unidade: "",
            foto: "null",
            quantidade: 0,
            nome_produto: "",
            id_categoria: "",
            preco: 0
        },
        validationSchema: yup.object({
            id_unidade: yup.string().required("Este campo é obrigatório"),
            // foto: yup.string().required("Este campo é obrigatório"),
            quantidade: yup.string().required("Este campo é obrigatório"),
            nome_produto: yup.string().required("Este campo é obrigatório"),
            id_categoria: yup.string().required("Este campo é obrigatório"),
            preco: yup.string().required("Este campo é obrigatório"),
        }),
        onSubmit: async (data) => {

            try {
                const response = await api.post("/produto", data)
                if (response) alert("Produto actualizado com sucesso")
            } catch (err) {

            }
            console.log(data, "cheguei");
        }
    })

    console.log(formik.values);
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <Col xl={12}>
                        <CardLayout>
                            <Row>
                                <Col xl={12}><LabelField type="text" label="Nome do produto" fieldSize="w-100 h-md" name="nome_produto" id="nome_produto" onChange={formik.handleChange} /></Col>
                                <Col xl={12}><LabelTextarea label="descrição do produto" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelField label="categoria" option={['Verduras', 'Frutas', 'Legumes', 'Tubercules', 'Bebidas', 'Diverssos']} fieldSize="w-100 h-md" name="id_categoria" id="id_categoria" onChange={formik.handleChange} /></Col>
                                <Col xl={6}><LabelField type="number" label="Preço" fieldSize="w-100 h-md" name="preco" id="preco" onChange={formik.handleChange} /></Col>
                                <Col xl={6}><LabelField type="number" label="Quantidade" fieldSize="w-100 h-md" name="quantidade" id="quantidade" onChange={formik.handleChange} /></Col>
                                <Col xl={6}><LabelField label="Unidade" option={['Kg', 'G', 'L', 'Ml', 'Cl']} fieldSize="w-100 h-md" name="id_unidade" id="id_unidade" onChange={formik.handleChange} /></Col>
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
                                    <Input type="file" id="product" onChange={(e) => setUploadFile(e.target.files[0].name)} />
                                    <Label htmlFor="product"><Icon type="collections" /><Text>{uploadFile}</Text></Label>
                                </Box>
                            </Box>
                            <Button type="submit" style={{ width: "20%", marginTop: "0.5rem ", display: "flex", justifyContent: "center" }}>Salvar</Button>
                        </CardLayout>
                    </Col>
                </form>

            </Row>
        </PageLayout >
    )
}