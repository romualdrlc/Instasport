import { NextPage, GetServerSideProps } from "next";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Inscription: NextPage<void> = () => {
    return (
        <div>
            Inscription
        </div>
    )
}

export default Inscription;

export const getServerSideProps: GetServerSideProps = async () => {
    return {

    }
}