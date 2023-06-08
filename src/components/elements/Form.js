import React from "react";

export default function Form({ children, className, onSubmit, ...rest }) {
    return <form {...rest} onSubmit={onSubmit} className={className}>{children}</form>
}