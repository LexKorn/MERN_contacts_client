import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { InputFields } from '../components/InputFields';
import { BACK_URL } from '../config/default';
// import { Loader } from '../components/Loader';

export function EditPage() {
	const { id } = useParams();
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

    const navigate = useNavigate();

	useEffect(() => {
        window.M.updateTextFields();
    }, []);

	useEffect(() => {
		fetch(`${BACK_URL}/post/${id}`)
			.then((json) => json.json())
			.then((data) => {
				console.log(data);
				setName(data.name);
				setPhone(data.phone);
			})
			.catch((err) => console.error(err))
	}, [id]);

	const editContactHandler = async () => {
		try {
			const response = await fetch(`${BACK_URL}/post-update`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ name, phone, contactId: id }),
			});

			const data = await response.json();

			if (response.status !== 200) {
				return console.error(data);
			}

			console.log(data);
            navigate('/');

		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			{/* <Loader open={loading} /> */}
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