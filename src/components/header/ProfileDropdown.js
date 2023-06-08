import React from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText, RoundAvatar } from "..";
import { Anchor } from "../elements";
import { getUserInfo, logout } from "../../services/config";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProfileDropdown({ name, username, image, dropdown }) {
    function Out() {
        logout()
        window.location.reload()
    }
    return (
        <Dropdown className="mc-header-user">
            <Dropdown.Toggle className="mc-dropdown-toggle">
                <RoundAvatar src={image} alt="avatar" size="xs" />
                <DuelText title={name} descrip={username} size="xs" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                {dropdown.map((item, index) => (
                    <Anchor
                        key={index}
                        href={item.path}
                        icon={item.icon}
                        text={item.text}
                        onClick={() => { item?.text === "sair" && Out() }}
                        className="mc-dropdown-menu"
                    />
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}