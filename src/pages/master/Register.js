import React from "react";
import { Box, Text, Form, Image, Button, Anchor, Heading, Input, Label, Icon } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/register.json";
import { useFormik } from "formik";
import * as yup from "yup"
import { api } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            nome: "",
            sobrenome: "",
            email: "",
            password: "",
            passwordConfirm: "",
            contacto: ""
        },
        validationSchema: yup.object({
            nome: yup.string().trim().required("Este Campo é obrigatório"),
            sobrenome: yup.string().trim().required("Este Campo é obrigatório"),
            email: yup.string().trim().email("digite um email valido").required("Este Campo é obrigatório"),
            contacto: yup.string()
                .required('Campo obrigatório')
                .matches(
                    /^9\d{8}$/,
                    'Número de telefone inválido. O formato correto é 9xxxxxxxx'
                )
                .test('operadora', 'Operadora não suportada', function (value) {
                    const operadoras = ['91', '92', '93', '94', '95'];
                    const prefixo = value.substring(0, 2);
                    return operadoras.includes(prefixo);
                }),
            password: yup.string().trim().min(8, "A senha deve ter no minimo 8 caracteres"),
            passwordConfirm: yup.string()
                .required('Campo obrigatório')
                .test('senhas-iguais', 'As senhas não coincidem', function (value) {
                    return value === this.resolve(yup.ref('password')); // Verifica se a confirmação de senha é igual à senha
                }),
        }),
        onSubmit: async (data) => {
            try {
                data = {
                    ...data, contacto: Number(data.contacto)
                }
                const response = (await api.post("/cliente", data)).data
                if (response) {
                    toast.success("Cadastro feito com sucesso")
                    formik.resetForm()
                    navigate("/login")
                }
            } catch (err) {
                toast.error(err?.response?.data?.message, "ups")
            }
            console.log(data, "cheguei");
        }

    })

    console.log(formik.values);
    return (
        <Box className="mc-register">
            <Box className="mc-register-banner">
                <Image
                    className="mc-register-banner-pattern"
                    src={data?.pattern.src}
                    alt={data?.pattern.alt}
                />
                <Box className="mc-register-banner-content">
                    <Heading as="h2" className="mc-register-banner-title">{data?.title.banner}</Heading>
                    <Text as="p" className="mc-register-banner-descrip">{data?.descrip}</Text>
                    <Anchor
                        icon={data?.anchor.icon}
                        text={data?.anchor.text}
                        href={data?.anchor.path}
                        className="mc-btn primary"
                    />
                </Box>
            </Box>
            <Form className="mc-register-form" onSubmit={formik.handleSubmit}>
                <Logo
                    src={data?.logo.src}
                    alt={data?.logo.alt}
                    href={data?.logo.path}
                    className="mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{data?.title.from}</Heading>
                {data?.input.map((item, index) => (
                    <>
                        <IconField
                            key={index}
                            icon={item.icon}
                            type={item.type}
                            classes={item.fieldSize}
                            placeholder={item.placeholder}
                            passwordVisible={item.passwordVisible}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id={item?.id}
                            name={item?.name}
                            value={formik.values?.[item?.name]}
                        />
                        {
                            formik.touched?.[item?.name] && formik.errors?.[item?.name] ? (
                                <div style={{ display: "flex", paddingTop: "0.2rem" }}>
                                    <span style={{ fontSize: "0.7rem", position: "relative", top: "-1.3rem", textAlign: "left", color: "red" }}>{formik.errors?.[item?.name]}</span>
                                </div>
                            ) : null
                        }
                    </>
                ))}

                <Box className="mc-auth-checkbox">
                    <Input type="checkbox" id="checkbox" />
                    <Label text={data?.checkLabel} htmlFor="checkbox" />
                </Box>
                <Button className={`mc-auth-btn ${data?.button.fieldSize}`} type={data?.button.type}>{data?.button.text}</Button>
                <Box className="mc-auth-divide"><Text as="span">{data?.divide.text}</Text></Box>
                <Box className="mc-auth-connect">
                    {data?.connect.map((item, index) => (
                        <Anchor key={index} href={item.path} className={item.classes}>
                            <Icon className={item.icon}></Icon>
                            <Text as="span">{item.text}</Text>
                        </Anchor>
                    ))}
                </Box>
                <Box className="mc-register-navigate">
                    <Text as="span">{data?.navigate.title}</Text>
                    <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
                </Box>
            </Form>
        </Box>
    )
}