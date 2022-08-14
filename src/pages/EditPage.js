import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { InputFields } from '../components/InputFields';
import { BACK_URL } from '../config/default';
import { AuthContext } from '../context/AuthContext';


export function EditPage() {
	const { id } = useParams();
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const {token} = useContext(AuthContext);

    const navigate = useNavigate();

	useEffect(() => {
        window.M.updateTextFields();
    }, []);

	useEffect(() => {
		fetch(`${BACK_URL}/post/${id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
			}
		})
			.then((json) => json.json())
			.then((data) => {
				setName(data.name);
				setPhone(data.phone);
			})
			.catch((err) => console.error(err))
	}, [id, token]);

	const editContactHandler = async () => {
		try {
			const response = await fetch(`${BACK_URL}/post-update`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({ name, phone, contactId: id }),
			});

			const data = await response.json();

			if (response.status !== 200) {
				return console.error(data);
			}
            navigate('/');

		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<InputFields 
				name={name} 
				setName={setName} 
				phone={phone} 
				setPhone={setPhone} 
				handler={editContactHandler}
				title='Редактирование контакта'
				button='Изменить' />  
		</div>
	);
}