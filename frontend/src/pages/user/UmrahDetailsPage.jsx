import React from 'react';
import { useParams } from 'react-router-dom'

const UmrahDetailsPage = () => {
    const { slug } = useParams();
    return (
        <div>{ slug }</div>
    )
}

export default UmrahDetailsPage;