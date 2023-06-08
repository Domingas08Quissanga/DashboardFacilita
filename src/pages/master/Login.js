import React from "react";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import { useFormik } from "formik";
import * as yup from "yup"
import { api } from "../../services";
import { setCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserInfo } from "../../services/config";

export default function Login() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().trim().email("digite um email valido").required("Este Campo é obrigatório"),
            password: yup.string().trim().min(8, "A senha deve ter no minimo 8 caracteres")
        }),
        onSubmit: async (data) => {
            try {
                const response = await (await api.post("/auth/login", data)).data
                if (response) {
                    setCookie(null, "token", response?.data?.token, { path: "/" })
                    console.log(response);
                    toast.success("Login feito com sucesso! bem-vindo")
                    window.location.href = "/ecommerce"
                    getUserInfo()
                }
            } catch (err) {
                toast.error(err?.response?.data?.message)
            }
        }
    })

    console.log(formik.errors);
    return (
        <Box className="mc-auth">
            <Image
                src={data?.pattern.src}
                alt={data?.pattern.alt}
                className="mc-auth-pattern"
            />
            <Box className="mc-auth-group">
                <Logo
                    src={data?.logo.src}
                    alt={data?.logo.alt}
                    href={data?.logo.path}
                    className="mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{data?.title}</Heading>
                <Form className="mc-auth-form" onSubmit={formik.handleSubmit}>
                    {data?.input.map((item, index) => (
                        <>
                            <IconField
                                key={index}
                                icon={item.icon}
                                type={item.type}
                                option={item.option}
                                id={item?.id}
                                name={item?.name}
                                onChange={formik.handleChange}
                                value={formik.values?.[item?.name]}
                                onBlur={formik.handleBlur}
                                classes={item.fieldSize}
                                placeholder={item.placeholder}
                                passwordVisible={item.passwordVisible}
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
                    <Button className={`mc-auth-btn ${data?.button.fieldSize}`} type={data?.button.type}>{data?.button.text}</Button>
                    <Anchor className="mc-auth-forgot" href={data?.forgot.path}>{data?.forgot.text}</Anchor>
                    <Box className="mc-auth-divide"><Text as="span">{data?.divide.text}</Text></Box>
                    <Box className="mc-auth-connect">
                        {/* {data?.connect.map((item, index) => (
                            <Anchor key={ index } href={ item.path } className={ item.classes }>
                                <i className={ item.icon }></i>
                                <span>{ item.text }</span>
                            </Anchor>
                        ))} */}
                    </Box>
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{data?.navigate.title}</Text>
                    <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
                </Box>
            </Box >
        </Box >
    );
}