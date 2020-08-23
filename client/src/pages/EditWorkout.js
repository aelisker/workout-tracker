import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CURRENT_WORKOUT } from '../utils/actions';
import { Link, useParams } from 'react-router-dom';

function EditWorkout () {
    const { id } = useParams();
    return (
    <p>{id}</p>
    )
}

export default EditWorkout;