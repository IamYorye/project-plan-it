import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
function Profile() {
    const { id } = useParams();
    const { token } = useAuthContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [picture, setPicture] = useState('');
    const [years, setYears] = useState('');
    const [education, setEducation] = useState('');
    const [isMentor, setIsMentor] = useState(false);
    const [userStacks, setUserStacks] = useState([]);


    const fetchData = async () => {
        const url = `http://localhost:8000/api/accounts/${id}`;
        const response = await fetch(url, { headers: {'Authorization': `Bearer ${token}`}});
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setPicture(data.picture);
            setYears(data.years_of_experience);
            setEducation(data.education);
            setIsMentor(data.is_mentor);

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        {firstName} {lastName}
        <img src={picture} />
        <p>years of experience: {years}</p>
        <p>education: {education}</p>
        <p>{isMentor && ('mentor')}</p>
        </>
    )
}
export default Profile
