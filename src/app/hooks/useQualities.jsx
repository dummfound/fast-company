import React, { useContext, useEffect, useState } from "react";
import qualitiesServices from "../services/qualities.service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const QualitiesContex = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContex);
};

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    useEffect(() => getQualities(), []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, []);
    const getQualities = async () => {
        try {
            const { content } = await qualitiesServices.fetchAll();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    return (
        <QualitiesContex.Provider value={{ isLoading, getQuality }}>
            {children}
        </QualitiesContex.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
